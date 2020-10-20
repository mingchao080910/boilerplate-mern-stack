const mongoose = require("mongoose");

// name,clientName,clientCode,category,subCategory,color,start,end,progress
const ganttSchema = mongoose.Schema({
  id: {
    type: String,
    ref: "GanttList",
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },

  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  dependencies: {
    type: String,
  },
  comments: {
    type: String,
  },
});

const GanttList = mongoose.model("GanttList", ganttSchema);

module.exports = { GanttList };
