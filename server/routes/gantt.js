const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { GanttList } = require("../models/GanttList");
const { Category } = require("../models/GanttCategory");
//save data
router.post("/ganttList", (req, res) => {
  if (req.body._id) {
    GanttList.updateOne({ _id: req.body._id }, req.body, (err) => {
      if (err) return res.json({ success: false, err });
      res.json({ success: true });
    });
  } else {
    GanttList.create(req.body, (err) => {
      if (err) return res.json({ success: false, err });
      res.json({ success: true });
    });
  }
});
//get data find data
router.get("/getList", (req, res) => {
  let config = req.query.id ? { _id: req.query.id } : {};

  GanttList.find(config).populate('categoryID').exec((err, ganttList) => {
    if (err) return res.json({ success: false, err });
    res.json({ success: true, tableData: ganttList });
  });
});
//gantt delete
router.delete("/deleteOne", (req, res) => {
  if (req.query.id) {
    GanttList.deleteOne({ _id: req.query.id }, (err) => {
      if (err) return res.json({ success: false, err });
      res.json({ success: true });
    });
  }
});

//category
router.post("/category", (req, res) => {
  //if id 存在
  if (req.body.id !== "") {
    Category.updateOne({ _id: req.body.id }, req.body, (err) => {
      if (err) return res.json({ success: false, err });
      res.json({ success: true });
    });
  } else {
    Category.create(req.body, (err) => {
      if (err) return res.json({ success: false, err });
      res.json({ success: true });
    });
  }
});
//categoryList
router.get("/category", (req, res) => {
  //if req has id params ,find _id one data
  let config = req.query.id ? { _id: req.query.id } : {};

  Category.find(config).exec((err, CategoryList) => {
    if (err) return res.json({ success: false, err });
    res.json({ success: true, tableData: CategoryList });
  });
});
//delete
router.delete("/category", (req, res) => {
  if (req.query.id) {
    Category.deleteOne({ _id: req.query.id }, (err) => {
      if (err) return res.json({ success: false, err });
      res.json({ success: true });
    });
  }
});
module.exports = router;
