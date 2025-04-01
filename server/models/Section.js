const mongoose = require("mongoose");
const Subsection = require("../models/Subsection"); 

const sectionSchema = new mongoose.Schema({
    sectionName: {
      type: String,
      required: true,
    },
    subSection: [{
      type: mongoose.Schema.Types.ObjectId,  // ✅ Allow multiple subSections
      ref: "Subsection",
      default: [],  // ✅ Default to an empty array
    }],
  });
module.exports = mongoose.model("Section", sectionSchema);



 