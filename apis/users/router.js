const express = require('express')
const router = express.Router()
const User = require('./model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// Creating one
router.post('/',authenticateToken, async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10)
  console.log(hashedPassword,"hashedPassword");
  const user = new User({
    name: req.body.name,
    mobileNumber: req.body.mobileNumber,
    password:hashedPassword
  })
  try {
    const newUser = await user.save()
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.get('/',async(req,res)=>{
  let result=await User.find();
  res.json(result);
})

function authenticateToken(req, res, next) {
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


module.exports = router