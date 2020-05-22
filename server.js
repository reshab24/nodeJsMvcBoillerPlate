require('dotenv').config()
const subscribersRouter = require('./apis/subscriber/router')
const usersRouter = require('./apis/users/router')
const authRouter=require('./apis/auth/auth.router') 

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())


app.use('/subscribers', subscribersRouter)
app.use('/users', usersRouter)
app.use('/auth',authRouter)

app.listen(3000, () => console.log('Server Started'))