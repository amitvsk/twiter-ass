const mongoose = require("mongoose");
const ObjectId=mongoose.Schema.Types.ObjectId;
const followSchema = new mongoose.Schema(
  {
        userId:{
            type:ObjectId,
            ref:'user'
        },
        isFollowee:{
            type:Boolean,
            default:true
        }
  },{ timestamps: true })

module.exports = mongoose.model('follow',followSchema);