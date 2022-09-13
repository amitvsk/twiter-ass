const mongoose = require("mongoose");
const ObjectId=mongoose.Schema.Types.ObjectId;

const twiteSchema = new mongoose.Schema(
  {
    twite:{
        type:String,
        required:true
    },
    userId:{
        type:ObjectId,
        ref:'user'
    }
    
  },{ timestamps: true })

module.exports = mongoose.model('twite',twiteSchema)