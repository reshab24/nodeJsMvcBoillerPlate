
const bcrypt = require('bcrypt')
const User = require('../users/model')
const JWTHelper=require('../../helpers/jwt/jwt.helper');

 async function registration (req, res) {
    try {
        const userExists = await User.findOne({ mobileNumber: req.body.mobileNumber })
        if (!userExists) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)

            const user = new User({
            name: req.body.name,
            mobileNumber: req.body.mobileNumber,
            password:hashedPassword
            })

            const newUser = await user.save()
            res.status(201).json({message:" user LogedIn"})
           
            }
            else{
                res.status(400).json({message: "user AlreadyExit"})
            }
    }
    catch (err) {
        res.status(400).json({ message: err.message })
      }  
  }

   async  function login (req, res) {
    try {
      let SingleUser = await User.find({mobileNumber:req.body.mobileNumber})
  
      if (SingleUser.length == 0) {
        return res.status(404).json({ message: 'Cannot find User' })
      }
      else{
        if(await bcrypt.compare(req.body.password, SingleUser[0].password)) {
          const user = { name: req.body.name }
          const accessToken = JWTHelper.generateAccessToken(user)
          res.status(201).json({ "token": accessToken})
        } else {
          res.send('Not Allowed')
        }
      }
    } 
    catch (err) {
      res.status(400).json({ message: err.message })
    }
  
  }

  

  

  module.exports = {registration , login}