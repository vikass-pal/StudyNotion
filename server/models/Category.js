const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   description:{
    type:String,
   },
   couse: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
   },

})
module.exports = mongoose.model("category ", categorySchema);
