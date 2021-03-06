const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);

const usersSchema = new mongoose.Schema({
  name: {
     type: String,
     required: [true,"user name is requied"] 
  },
  mobileNumber: {
    type: String,
    required: [true , "mobile number is requied"],
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
  }
})

module.exports = mongoose.model('users', usersSchema)