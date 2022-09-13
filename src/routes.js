const express = require("express"); //import express
const router = express.Router(); //used express to create route handlers
const twiterModel=require('./twiterMode')
const userModel=require('./user');
const follwModel=require('./followModel')
const ObjectId = require('mongoose').Types.ObjectId;
function isValidObjectId(id){
     
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;       
        return false;
    }
    return false;
}
//create twiter
router.post('/twite', async(req,res)=>{
    try{
        const data=req.body;
        const {twite,userId}=data
        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "Invalid userId" })

        const twited= await twiterModel.create(data);
        return res.status(201).send({status:true,msg:twited})
    }catch (err) {
    return  res.status(500).send({ status: false, msg: err.message })
  }

});

//create user
router.post('/createUser',async (req,res)=>{
    try{
        const data= req.body
        let user=await userModel.create(data);
        return res.status(201).send({status:true,msg:user})

    }catch (err) {
    return  res.status(500).send({ status: false, msg: err.message })
  }
});

// follower
router.post('/follow',async (req,res)=>{
    try{
        const userId= req.params.userId
        const followerId=req.query.followerId

        if (!isValidObjectId(followerId)) return res.status(400).send({ status: false, message: "Invalid followerId" })

        let user= await userModel.findById(userId);
        if(!user) return res.status(404).send({status:false,msg:'user not found'})
        
        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "Invalid userId" })
        let follower= await userModel.findById(followerId);
        if(!follower) return res.status(404).send({status:false,msg:'can not follow'})

        let follow=await follwModel.create(userId).select({_id:1,userId:0});
        return res.status(201).send({status:true,msg:'success',followId:follow})

    }catch (err) {
    return  res.status(500).send({ status: false, msg: err.message })
  }
});

//unfollow
router.put('/unFollow',async (req,res)=>{
    try{
        const userId= req.params.userId
        const followerId=req.query.followerId

        if (!isValidObjectId(followerId)) return res.status(400).send({ status: false, message: "Invalid followerId" })

        let user= await userModel.findById(userId);
        if(!user) return res.status(404).send({status:false,msg:'user not found'})
        
        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "Invalid userId" })
        let follower= await follwModel.findById(followerId);
        if(!follower) return res.status(404).send({status:false,msg:'can not follow'})

        let follow=await follwModel.findOneAndDelete({_id:followerId},{$set:{isfollow:false}}).select({_id:1,userId:0});
        return res.status(201).send({status:true,msg:'success',followId:follow})

    }catch (err) {
    return  res.status(500).send({ status: false, msg: err.message })
  }
});

//getNewsFeed 
router.get('/getNewsFeed',async (req,res)=>{
    try{
        const userId= req.params.userId

        let user= await userModel.findById(userId);
        if(!user) return res.status(404).send({status:false,msg:'user not found'})
        
        if (!isValidObjectId(userId)) return res.status(400).send({ status: false, message: "Invalid userId" })

        let twites= await twiterModel.find({userId:userId}).select({_id:1,userId:0});
        if(twites.length==0) return res.status(404).send({status:false,msg:'no twite'})

        let follow=await follwModel.find({_userId:userId,isfollow:true}).sort({_id:-1}).limit(1).select({_id:1,userId:0});

        return res.status(201).send({status:true,msg:'success',followId:follow})

    }catch (err) {
    return  res.status(500).send({ status: false, msg: err.message })
  }
});


//export router
module.exports = router;
