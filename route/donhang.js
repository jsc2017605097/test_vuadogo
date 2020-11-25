const donhangRouter = require("express").Router();
const donhangModel = require("../model/donhang");

donhangRouter.post("/", async (req, res, next) => {
  const donhang = new donhangModel({ ...req.body, product: req.body.cart });
  const savedDonhang = await donhang.save();
  res.status(200).json(savedDonhang);
});

donhangRouter.get("/", async (req, res) => {
  const donhang = await donhangModel.find({});
  res.status(200).json(donhang);
});

donhangRouter.put("/:id", async (req, res, next) => {
  const donhang = await donhangModel.findById(req.params.id);
  donhang.status = !donhang.status;
  const donhangSaved = await donhang.save();
  res.status(200).json(donhangSaved);
});

module.exports = donhangRouter;
