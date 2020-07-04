const subscribersRouter = require('./apis/subscriber/router')
const usersRouter = require('./apis/users/router')
const authRouter=require('./apis/auth/auth.router') 
const cors = require('cors')
const express = require('express')
const app = express()


app.use(cors())
app.use(express.json())


app.use('/subscribers', subscribersRouter)
app.use('/users', usersRouter)
app.use('/auth',authRouter)
app.get('/', function(req, res){
    res.send('Tks heroku');
})

module.exports=app;