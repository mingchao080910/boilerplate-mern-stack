const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  Category: {
    type: String,
  },
  SubCategory: {
    type: String,
  },
  Color: {
    type: String,
  },
});

const Category = mongoose.model("Category", CategorySchema);
module.exports = { Category };
