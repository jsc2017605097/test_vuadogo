const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const userModel = require("../model/user");

userRouter.post("/", async (req, res, next) => {
  if (!req.body.password) {
    return res.status(400).send("Field password is empty!");
  }
  const newUser = new userModel({
    ...req.body,
    password: await bcrypt.hash(req.body.password, 10),
  });
  const savedUser = await newUser.save();
  res.status(200).json(savedUser);
});

userRouter.get("/", async (req, res, next) => {
  const user = await userModel.find({});
  res.status(200).json(user);
  console.log(user);
});

// userRouter.put('/:id',async (req,res,next)=>{
//     const id = req.params.id
//     const userUpdated = await userModel.findByIdAndUpdate(id,
//         { ...req.body, user: product.user },
//         { new: true })
//         // username
//         // password
//         // name
//     res.status(200).json(userUpdated)
// })

module.exports = userRouter;
