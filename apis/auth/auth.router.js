const express = require('express')
const router = express.Router()
const User = require('../users/model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authCtrl = require('./auth.controller');


  router.route('/login').post(authCtrl.login)

  router.route('/registration').post(authCtrl.registration)


  //generate Token
  // function generateAccessToken(user) {
  //   return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  // }

  //authenticate Token
  function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    // console.log(token,"token");
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //   console.log(err,"errr")
    //   if (err) return res.sendStatus(403)
    //   req.user = user
    //   next()
    // })
    let userData=verifyToken(token);
    if(userData){
      req.user = userData
      next()
    }
    else{
      return res.sendStatus(403)
    }
  }

   const verifyToken = (jwtToken) =>{
    try{
       return jwt.verify(jwtToken, process.env.ACCESS_TOKEN_SECRET);
    }catch(e){
       console.log('e:',e);
       return null;
    }
 }



























module.exports=router;