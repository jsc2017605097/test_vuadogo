const donhangRouter = require("express").Router();
const donhangModel = require("../model/donhang");

donhangRouter.post("/", async (req, res, next) => {
  const donhang = new donhangModel({ ...req.body, product: req.body.cart });
  const savedDonhang = await donhang.save();
  res.status(200).json(savedDonhang);
});

module.exports = donhangRouter;
