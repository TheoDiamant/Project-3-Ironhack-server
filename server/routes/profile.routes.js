const express = require("express");
const router = express.Router();
const mongoose = require('mongoose')

const Product = require("../models/Products.model")
const User = require("../models/User.model")
const Offer = require("../models/Offer.model")
const Review = require("../models/Review.model")

const { isAuthenticated } = require("../middleware/jwt.middleware.js");


// Route to get the info on the profile page of the user
router.get("/member/", isAuthenticated, (req, res, next) => {

  const { userId } = req.payload._id 

    User.findById(userId)
    .populate("review")
    .populate("product")
    .then(response => {
      res.json(response)
    })

  })

  router.get("member/edit", isAuthenticated, (req, res , next) => {

    const { userId } = req.payload._id 

    User.findById(userId)
    .then(response => {
      res.json(response)
    })

  })

  module.exports = router;