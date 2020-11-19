const mongoose = require("mongoose");

const donhangSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: String,
  product: [],
});

module.exports = mongoose.model("donhang", donhangSchema);
