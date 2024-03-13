import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import AppContext from "../context/AppContext";
import DeleteIcon from "@mui/icons-material/Delete";
import image from "../images/image2.png";

const YourOrder = () => {
  const navigate = useNavigate();
  const { cart, setCart } = useContext(AppContext);
  const [emptyOrder, setEmptyOrder] = useState(false);
  const location = useLocation();
  const { email, name } = location.state || {};

  const handleIncrement = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].count += 1;
    setCart(updatedCart);
  };

  const handleDecrement = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].count = Math.max(updatedCart[index].count - 1, 0);
    setCart(updatedCart);
  };

  const handleDelete = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const totalMoney = cart.reduce(
    (total, cartt) => total + cartt.price * cartt.count,
    0
  );

  const handlePlaceOrder = async () => {
    // navigate(`./yourOrder`);
    // console.log("handle place order");
    if (totalMoney > 0) {
      const res = await fetch(`/api/checkout`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: totalMoney,
          cart: cart,
          name: name,
        }),
      });

      const data = await res.json();
      if (res.status === 404 || !data) {
        // alert(data.msg);
        console.log("invalid login");
      } else {
        console.log("success: ", data);

        const options = {
          key: data.key,
          amount: data.order.amount,
          currency: "INR",
          name: "Vasu",
          description: "Transaction for successfull payment",
          image: image,
          order_id: data.order.id,
          callback_url: "http://localhost:5000/api/paymentVerification",
          prefill: {
            name: name,
            email: email,
            contact: "9999999999",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();

        razor.on("payment.success", (response) => {
          console.log("Payment success:", response);
          // Redirect to a success page
          navigate("/");
        });
      }
    } else {
      setEmptyOrder(true);
      setTimeout(() => {
        setEmptyOrder(false);
      }, 3000);
    }
  };

  return (
    <div>
      <div className="dropdownlog">
        <h2 className="dropdownheading">Confirm your Order</h2>
        {cart.length === 0 ? (
          <div style={{ margin: "1rem auto" }}>
            <h3 style={{ margin: "0rem auto" }}>
              Your cart is empty right now
            </h3>
            <span>Please order something from menu.</span>
          </div>
        ) : (
          cart.map((cartt, index) => {
            return (
              <div className="cartt" key={index}>
                <div className="cartHead">
                  <h3 className="catth3">{cartt.name}</h3>
                  <span className="catth3">{cartt.baseSize}</span>
                </div>

                <p className="cattp">{cartt.description}</p>
                <div className="pizzaAdd" id="pizzaAdd">
                  <div
                    className="pizzaAdd pizzaQuantity"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    {cartt.count === 1 ? (
                      <IconButton
                        onClick={() => handleDelete(index)}
                        sx={{ borderRight: "1px solid #ccc" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => handleDecrement(index)}
                        sx={{ borderRight: "1px solid #ccc" }}
                      >
                        <RemoveIcon />
                      </IconButton>
                    )}
                    <Typography
                      variant="body1"
                      sx={{ minWidth: "30px", textAlign: "center" }}
                    >
                      {cartt.count}
                    </Typography>
                    <IconButton
                      onClick={() => handleIncrement(index)}
                      sx={{ borderLeft: "1px solid #ccc" }}
                    >
                      <AddIcon />
                    </IconButton>
                  </div>
                  <span className="carttprice">
                    ₹{cartt.price * cartt.count}
                  </span>
                </div>
                <hr className="cartthr" />
              </div>
            );
          })
        )}
      </div>
      <div className="dropdownbtnss">
        <div className="cartSubtotal">
          <h2>Sub Total</h2>
          <h2>₹{totalMoney}</h2>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePlaceOrder}
          style={{ width: "10rem", margin: "0rem auto 1rem" }}
        >
          Place Order
        </Button>
        {emptyOrder ? (
          <p style={{ color: "red" }}>Please Order something first</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default YourOrder;
