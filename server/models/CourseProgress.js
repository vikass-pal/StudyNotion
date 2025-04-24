const mongoose = require("mongoose");

const courseProgress = new mongoose.Schema({
   courseID:{
    type:mongoose.Schema.ObjectId,
    ref:"Course",
   },
   userId:{
      type: mongoose.Schema.ObjectId,
      ref:"user",
   },
   completedVideos:{
      type:mongoose.Schema.ObjectId,
      ref: "Subsection",
   },

})
module.exports = mongoose.model("CourseProgress", courseProgress);



