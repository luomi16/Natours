const mongoose = require('mongoose');
// const slugify = require('slugify');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name.'],
    unique: true,
    maxlength: [20, 'A user name must have less or equal than 20 characters'],
    minlength: [4, 'A user name must have more or equal than 4 characters.']
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Please provide your email.'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email.']
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please confirm your password'],
    select: false
    //   validate: [validator.isStrongPassword, 'Please input a strong password']
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please reconfirm your password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function(el) {
        return el === this.password;
      },
      message: 'Passwords are not the same'
    }
  }
});

userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
