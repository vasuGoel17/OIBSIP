const mongoose = require("mongoose");

const pizzaSchema = new mongoose.Schema({
  name: String,
  size: String,
  decription: String,
  quantity: Number,
  ingredients: [String],
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
  },
  pizzaName: [pizzaSchema],
  name: String,
  payment: {
    type: Boolean,
    default: false,
  },
  inKitchen: {
    type: Boolean,
    default: false,
  },
  sentToDelivery: {
    type: Boolean,
    default: false,
  },
  delivered: {
    type: Boolean,
    default: false,
  },
});

const orders = mongoose.model("order", orderSchema);

module.exports = orders;
