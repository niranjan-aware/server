const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const { Schema } = mongoose;

const userSignup = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  confirmpassword: {
    type: String,
    required: true
  },
  age:{
    type:Number
  }
});


userSignup.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12)
    this.confirmpassword= await bcrypt.hash(this.confirmpassword,12)
  }
  next()
})

userSignup.methods.generateAuthToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
    this.tokens=this.tokens.concat({token:token})
    await this.save()
    return token
  } catch (error) { console.log(error) }
}


const UserSignUp = mongoose.model('USER', userSignup)

module.exports = UserSignUp