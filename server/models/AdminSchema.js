const mongoose = require("mongoose");
const keysecret = process.env.KEYSECRET;
const jwt = require("jsonwebtoken");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  verifytoken: {
    type: String,
  },
});

adminSchema.methods.generateAuthtoken = async function () {
  try {
    const token1 = jwt.sign({ _id: this._id }, keysecret, {
      expiresIn: "1h",
    });
    this.tokens = this.tokens.concat({ token: token1 });
    await this.save();
    return token1;
  } catch (error) {
    res.status(404).json({ error: "some errors are there" });
  }
};

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;
