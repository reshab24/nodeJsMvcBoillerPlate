const User= require('./model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

 exports.createUser =async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    console.log(hashedPassword,"hashedPassword");
    const user = new User({
      name: req.body.name,
      mobileNumber: req.body.mobileNumber,
      password:hashedPassword
    })
    try {
      const newUser = await user.save()
      res.status(201).json({
        status:"success",
        data:result
      })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
  
 exports.getallUsers=async(req,res)=>{
   try{
    let result=await User.find();
    res.status(201).json({
      status:"success",
      data:result
    })
   }
   catch(err){
      res.status(400).json({
        status:"fail",
        message:err
      })
   }
    
  }

 exports.getUser=async(req,res)=>{
     console.log(req.params.id,"userId")
     let result= await User.find({"_id":req.params.id})
     console.log(result,"resultData");
     res.status(201).json({
       status:"success",
       data:{
         result
       }
      });    
 }

 exports.patchUserData=async(req,res)=>{
   console.log("meeeee");
  // let result=await User.updateOne({"_id":req.params.id},{$set:{"name":res.body.name}})
  // console.log(result,"result");
  res.status(201);
 }

  

 exports.authenticateToken=(req, res, next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    console.log(token,"token");
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      console.log(err,"errr")
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }