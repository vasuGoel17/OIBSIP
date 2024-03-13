const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: {
    type: Number,
    default: 30,
  },
});

const stockSchema = new mongoose.Schema({
  base: [itemSchema],
  cheese: [itemSchema],
  toppings: [itemSchema],
  sauces: [itemSchema],
  mayo: [itemSchema],
  extraCheese: [itemSchema],
});

const stocks = mongoose.model("stock", stockSchema);

module.exports = stocks;
