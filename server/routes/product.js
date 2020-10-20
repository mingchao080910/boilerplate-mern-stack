const express = require("express");
const router = express.Router();
const multer = require("multer");
const { auth } = require("../middleware/auth");
const { Product } = require("../models/Product");

//=================================
//             product
//=================================
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

const upload = multer({ storage: storage }).single("file");

router.post("/uploadImage", auth, (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.json({ success: false, err });
    } else {
      return res.status(200).json({
        success: true,
        image: res.req.file.path,
        fileName: res.req.file.filename,
      });
    }
  });
});

router.post("/uploadProduct", auth, (req, res) => {
  Product.create(req.body, (err) => {
    if (err) {
      res.status(400).json({ success: false });
    } else {
      res.status(200).json({ success: true });
    }
  });
});

//  response product data to client
router.post("/getProducts", auth, (req, res) => {
  /***************************************
   * 定义oder sortby limit
   **************************************/
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? req.body.limit : 100;
  let skip = parseInt(req.body.skip);
  let continent = req.body.continent ? {continent:req.body.continent} : undefined;

  Product.find(continent)
    .populate("writer")
    // .sort([[sortBy,order]])
    .skip(skip)
    .limit(limit)
    .exec((err, products) => {
      if (err) return res.status(400).json({ success: false, err });
      res
        .status(200)
        .json({ success: true, products, postSize: products.length });
    });
});

module.exports = router;
