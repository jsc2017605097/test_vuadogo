const donhangRouter = require("express").Router();
const donhangModel = require("../model/donhang");

donhangRouter.post("/", async (req, res, next) => {
  const donhang = new donhangModel(req.body);
  const savedDonhang = await donhang.save();
  res.status(200).json(savedDonhang);
});

module.exports = donhangRouter;
