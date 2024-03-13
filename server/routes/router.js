const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Signup = require("../models/SignupSchema");
const Admin = require("../models/AdminSchema");
const Order = require("../models/OrderSchema");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const authenticate = require("../middleware/authenticate");
const Stock = require("../models/StockSchema");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEYSECRET,
});

function generateRandomCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

const updateStock = async (pizzaName) => {
  try {
    for (const pizza of pizzaName) {
      const stock = await Stock.findOne({});
      const foundItem = stock.base.find((item) => item.name === pizza.size);

      if (foundItem) {
        foundItem.quantity -= pizza.quantity;
        await stock.save();
      }

      for (const ingredient of pizza.ingredients) {
        let category = "nothing";
        let foundItem;

        if (stock.cheese.find((item) => item.name === ingredient)) {
          category = stock.cheese;
          foundItem = category.find((item) => item.name === ingredient);
        } else if (stock.toppings.find((item) => item.name === ingredient)) {
          category = stock.toppings;
          foundItem = category.find((item) => item.name === ingredient);
        } else if (stock.sauces.find((item) => item.name === ingredient)) {
          category = stock.sauces;
          foundItem = category.find((item) => item.name === ingredient);
        } else if (stock.mayo[0].name === ingredient) {
          category = stock.mayo[0];
          foundItem = category;
        } else if (stock.extraCheese[0].name === ingredient) {
          category = stock.extraCheese[0];
          foundItem = category;
        }

        console.log("we got category as : ", category);
        if (foundItem && category !== "nothing") {
          foundItem.quantity -= 1;
          await stock.save();

          console.log(`Stock updated for ${ingredient}`);
        } else {
          console.log(`Stock not found or insufficient for ${ingredient}`);
          // Handle the case where the ingredient is not found in stock or quantity is insufficient
        }
      }
    }
  } catch (error) {
    console.error("Error updating stock:", error);
  }
};

const checkCategory = async (category, itemsBelowThreshold, cat) => {
  for (const item of category) {
    if (item.quantity < 20) {
      itemsBelowThreshold.push({
        category: cat,
        name: item.name,
        quantity: item.quantity,
      });
    }
  }
};

const checkStock = async () => {
  try {
    const stock = await Stock.findOne({});
    const itemsBelowThreshold = [];
    await checkCategory(stock.base, itemsBelowThreshold, "base");
    await checkCategory(stock.cheese, itemsBelowThreshold, "cheese");
    await checkCategory(stock.toppings, itemsBelowThreshold, "toppings");
    await checkCategory(stock.sauces, itemsBelowThreshold, "sauces");
    await checkCategory(stock.mayo, itemsBelowThreshold, "mayo");
    await checkCategory(stock.extraCheese, itemsBelowThreshold, "extraCheese");

    if (itemsBelowThreshold.length > 0) {
      const emailBody = `<div><p>The following items are below the stock threshold:</p>
      <pre>${JSON.stringify(itemsBelowThreshold, null, 2)}</pre>
      <p>The link to buy more stock is: <a href="http://localhost:3000/addStock">Click here</a></p></div>`;

      const mailOptions = {
        from: "noreply@gmail.com",
        to: "goelvasu17@gmail.com",
        subject: "Stock Alert",
        html: emailBody,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent");
        }
      });
    }
  } catch (error) {
    console.error("Error checking stock:", error);
  }
};

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

router.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  // console.log("req: ", name, email, password);
  if (!name || !email || !password) {
    res.status(404).json({ msg: "please fill the data" });
    console.log("Please Fill the data ");
  }
  try {
    const preuserEmail = await Signup.findOne({ email: email });
    const preAdminEmail = await Admin.findOne({ email: email });

    if (preuserEmail || preAdminEmail) {
      res.status(404).json({ msg: "this user is already present" });
      console.log("Email already used ");
    } else {
      const randomCode = generateRandomCode();

      const mailOptions = {
        from: "noreply@gmail.com", // Sender email address
        to: email, // Recipient email address
        subject: "Account verification",
        html: `<p>The OTP for successful signup to your account is <h2>${randomCode}</h2> </p>`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(404).json({ err: err, msg: "mail not sent" });
          console.error("Error:", error.message);
        } else {
          res.status(201).json({ status: 201, otp: randomCode });
        }
      });
    }
  } catch (err) {
    res.status(404).json({ err: err, msg: "catched an error during register" });
    console.log("catched an error during register: ", err);
  }
});

router.post("/api/matchotp", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(404).json({ msg: "please fill the data" });
    console.log("Please Fill the data ");
  }
  try {
    const newSignUp = new Signup({
      name: name,
      email: email,
      password: password,
    });
    //password hashing
    const storeSignup = await newSignUp.save();
    res.status(201).json({ status: 201, storeSignup });
  } catch (err) {
    res.status(404).json({ err: err, msg: "catched an error during register" });
    console.log("catched an error during register: ", err);
  }
});

router.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  if (!email || !password) {
    res.status(404).json({ msg: "please fill the data" });
  }
  try {
    const userValid = await Signup.findOne({ email: email });
    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);
      if (!isMatch) {
        console.log("something like password not matching");
        res.status(404).json({ msg: "Password is incorrect" });
      } else {
        const token = await userValid.generateAuthtoken();
        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 3600000),
          httpOnly: true,
        });
        const result = {
          userValid,
          token,
          user: "user",
        };
        res.status(201).json({ status: 201, result });
      }
    } else {
      const adminValid = await Admin.findOne({ email: email });
      if (adminValid) {
        if (password !== adminValid.password) {
          console.log("something like password not matching");
          res.status(404).json({ msg: "Password is incorrect" });
        } else {
          const token = await adminValid.generateAuthtoken();
          // console.log(token);
          res.cookie("usercookie", token, {
            expires: new Date(Date.now() + 3600000),
            httpOnly: true,
          });
          const result = {
            userValid: adminValid,
            token,
            user: "admin",
          };
          res.status(201).json({ status: 201, result });
        }
      } else {
        console.log("username not matching");
        res.status(404).json({ msg: "username is not valid" });
      }
    }
  } catch (error) {
    console.log("error in login: ", error);
  }
});

router.get("/api/resetpass", async (req, res) => {
  const email = req.query.email;
  if (!email) {
    res.status(404).json({ msg: "please fill the data" });
  }
  try {
    const userEmail = await Signup.findOne({ email: email });
    if (userEmail) {
      const mailOptions = {
        from: "noreply@gmail.com", // Sender email address
        to: email, // Recipient email address
        subject: "Change Password",
        text: `THIS LINK IS VALID FOR 2 MINUTES http://localhost:3000/changePassword`,
        html: `<p>Click <a href="http://localhost:3000/changePassword">here</a> to reset your password. This link is valid for 2 minutes.</p>`,
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(404).json({ err: err, msg: "mail not sent" });
          console.error("Error:", error.message);
        } else {
          res.status(201).json({ status: 201 });
        }
      });
    } else {
      const adminEmail = await Admin.findOne({ email: email });
      if (adminEmail) {
        const mailOptions = {
          from: "noreply@gmail.com", // Sender email address
          to: email, // Recipient email address
          subject: "Change Password",
          text: `THIS LINK IS VALID FOR 2 MINUTES http://localhost:3000/changePassword`,
          html: `<p>Click <a href="http://localhost:3000/changePassword">here</a> to reset your password. This link is valid for 2 minutes.</p>`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            res.status(404).json({ err: err, msg: "mail not sent" });
            console.error("Error:", error.message);
          } else {
            res.status(201).json({ status: 201 });
          }
        });
      } else {
        res.status(404).json({ msg: "Email Not found" });
      }
    }
  } catch (error) {
    console.log("catched an error during register: ", error);
    res
      .status(404)
      .json({ err: error, msg: "catched an error during register" });
  }
});

router.put("/api/Password", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404).json({ msg: "please fill the data" });
  }
  try {
    const userEmail = await Signup.findOne({ email: email });
    if (userEmail) {
      const newPassword = await bcrypt.hash(password, 12);
      const setnewpassword = await Signup.findOneAndUpdate(
        { email: email },
        { password: newPassword }
      );
      setnewpassword.save();
      res.status(201).json({ status: 201 });
    } else {
      const adminEmail = await Admin.findOne({ email: email });
      if (adminEmail) {
        const setnewpassword = await Admin.findOneAndUpdate(
          { email: email },
          { password: password }
        );
        // console.log(setnewpassword);
        setnewpassword.save();
        res.status(201).json({ status: 201 });
      } else {
        res.status(404).json({ msg: "Email Not found" });
      }
    }
  } catch (err) {
    console.log("catched an error during register: ", err);
    res.status(404).json({ err: err, msg: "catched an error during register" });
  }
});

router.get("/api/validuser", authenticate, async (req, res) => {
  try {
    // console.log("testing for data: ", req.rootuser[0]);
    const validuserone = await Signup.findOne({ _id: req.userid });
    if (!validuserone) {
      const validadminone = await Admin.findOne({ _id: req.userid });
      if (!validadminone) {
        res.status(401).json({ status: 401 });
      }
      res.status(200).json({ status: 200, validadminone });
    } else {
      res.status(200).json({ status: 200, validuserone });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

router.get("/api/logout", authenticate, async (req, res) => {
  try {
    if (req.rootuser) {
      req.rootuser.tokens = req.rootuser[0].tokens.filter((curelem) => {
        return curelem.token !== req.token;
      });
      res.clearCookie("usercookie", { path: "/" });
      req.rootuser[0].save();
      res.status(200).json({ status: 200, message: "good going" });
    } else {
      req.rootadmin.tokens = req.rootadmin[0].tokens.filter((curelem) => {
        return curelem.token !== req.token;
      });
      res.clearCookie("usercookie", { path: "/" });
      req.rootadmin[0].save();
      res.status(200).json({ status: 200, message: "good going" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, message: "not good going" });
  }
});

router.post("/api/checkout", async (req, res) => {
  const { amount, cart, name } = req.body;

  const options = {
    amount: Number(amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  const processedCart = cart.map((item) => {
    if (item.name === "customized Pizza") {
      // If it's a customized pizza, split the description string and filter empty strings
      const descriptionArray = item.description.split(",").filter(Boolean);
      return { ...item, ingredients: descriptionArray };
    } else {
      // For other pizzas, keep the existing ingredients array (if any)
      return item;
    }
  });

  const finalArray = processedCart.map((cartItem) => {
    const aa = {
      name: cartItem.name,
      size: cartItem.baseSize,
      description: cartItem.description,
      quantity: cartItem.count,
      ingredients: cartItem.ingredients,
    };
    return aa;
  });

  console.log("final aray: ", finalArray);
  const newOrder = new Order({
    orderId: order.id,
    pizzaName: finalArray,
    name: name,
  });

  newOrder
    .save()
    .then((result) => {
      console.log("Order saved successfully:");
    })
    .catch((error) => {
      console.error("Error saving order:", error);
    });

  res
    .status(200)
    .json({ success: true, order, key: process.env.RAZORPAY_KEY_ID });
});

router.post("/api/paymentVerification", async (req, res) => {
  console.log("checkfor success: ", req.body);
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEYSECRET)
    .update(body.toString())
    .digest("hex");

  if (razorpay_signature === expectedSignature) {
    try {
      await Order.updateOne(
        { orderId: razorpay_order_id },
        { $set: { payment: true } }
      );

      console.log("Payment marked as done");

      // Use res.status and res.json separately
      // res.status(200).json({ success: true });

      // Wait for a short duration before redirecting
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const io = req.io;
      io.emit("orderPlaced", razorpay_order_id);

      // Redirect after 1 second
      res.redirect(`http://localhost:3000/orderTrack/${razorpay_order_id}`);
    } catch (error) {
      console.error("Error updating paymentDone:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  } else {
    res.status(404).json({ success: false, error: "Invalid Signature" });
  }
});

router.get("/api/currentOrder", async (req, res) => {
  try {
    let orders = await Order.find({}); // Use await to get the result
    res.status(200).json({ status: 200, orders: orders });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

router.put("/api/orderStatus", async (req, res) => {
  try {
    const { status, orderId } = req.body;
    console.log("s: ", status, orderId);
    const updateField = {};
    const order = await Order.findOne({ orderId });

    if (
      (status === "sentToDelivery" && !order.inKitchen) ||
      (status === "inKitchen" && !order.payment)
    ) {
      console.log("Status conditions not met. No update performed.");
      return res.status(200).json({ status: 200 });
    }

    updateField[status] = true;

    await Order.updateOne({ orderId: orderId }, { $set: updateField });

    console.log(`${status} status updated successfully`);
    const io = req.io;

    io.emit("orderUpdated", orderId);
    res.status(200).json({ status: 200 });
    if (status === "sentToDelivery") {
      await updateStock(order.pizzaName);

      io.emit("stockUpdated");
      await checkStock();
      setTimeout(async () => {
        await Order.deleteOne({ orderId: orderId });
        console.log(`Order with orderId ${orderId} deleted after 1 minute.`);

        // Refresh orders and send an event to the client to update the UI
        io.emit("orderDeleted", orderId);
      }, 20000); // 1 minute delay (in milliseconds)
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

router.get("/api/pizzas", async (req, res) => {
  try {
    const orderId = req.query.orderId;
    let order = await Order.findOne({ orderId }); // Use await to get the result
    res.status(200).json({ status: 200, order: order });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

router.get("/api/stock", async (req, res) => {
  try {
    let stocks = await Stock.find({}); // Use await to get the result
    res.status(200).json({ status: 200, stock: stocks });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

router.put("/api/stock", async (req, res) => {
  try {
    const { email } = req.body;
    const validAdmin = await Admin.findOne({ email: email });
    if (validAdmin) {
      try {
        await Stock.updateMany(
          {
            $or: [
              { base: { $elemMatch: { quantity: { $lt: 20 } } } },
              { cheese: { $elemMatch: { quantity: { $lt: 20 } } } },
              { toppings: { $elemMatch: { quantity: { $lt: 20 } } } },
              { sauces: { $elemMatch: { quantity: { $lt: 20 } } } },
              { mayo: { $elemMatch: { quantity: { $lt: 20 } } } },
              { extraCheese: { $elemMatch: { quantity: { $lt: 20 } } } },
            ],
          },
          {
            $set: {
              "base.$[elem].quantity": 30,
              "cheese.$[elem].quantity": 30,
              "toppings.$[elem].quantity": 30,
              "sauces.$[elem].quantity": 30,
              "mayo.$[elem].quantity": 30,
              "extraCheese.$[elem].quantity": 30,
            },
          },
          {
            arrayFilters: [{ "elem.quantity": { $lt: 20 } }],
          }
        );

        const io = req.io;
        io.emit("stockUpdated");

        return res.status(200).json({ status: 200 });
      } catch (error) {
        console.error("Error updating stock:", error);
        return res
          .status(500)
          .json({ status: 500, message: "Internal Server Error" });
      }
    }
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Internal Server Error" });
  }
});

module.exports = router;
