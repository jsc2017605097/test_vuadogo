const mongoose = require("mongoose");

const donhangSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: String,
  product: [],
  created_at: { type: Date, default: Date.now },
  status: { type: Boolean, default: false },
});

module.exports = mongoose.model("donhang", donhangSchema);
