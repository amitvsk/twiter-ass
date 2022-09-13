const mongoose = require("mongoose");
const ObjectId=mongoose.Schema.Types.ObjectId;
const userSchema = new mongoose.Schema(
  {
    Name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
  },{ timestamps: true })
module.exports = mongoose.model('user',userSchema)