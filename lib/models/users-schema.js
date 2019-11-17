'use strict';

// == EXTERNAL RESOURCES ===============================================

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// == DEFINE THE USER SCHEMA =============================================

// TODO Comment
const users = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['admin', 'editor', 'user'],
  },
});

/**
 * Pre save is a function which allows us to check if a user has modified their password. If they have we resave it in hashed format.
 * 
 */
users.pre('save', async function() {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

// TODO JSDocs Comment
/**
 * Users.authenticate is a functiomn that allows us to find a user based off of passed in credentails
 * Those credentials are then varified. 
 * @param {Object} creds - The user credentials we are trying to authenticate
 * @returns {Boolean} - If the user and user password match return true else return false
 */
users.statics.authenticate = async function(creds) {
  let query = { username: creds.username };
  
  try {
    let user = await this.findOne(query);
    return user && user.comparePassword(creds.comparePassword);
  } catch (error) {
    console.error(error);
  }
  // return this.findOne(query)
  //   .then(user => user && user.comparePassword(creds.password))
  //   .catch(console.error);
};


/**
 * Users.comparePassword allows us to take in a password then use bcrypt to compare it to the password stored in our database
 * @param {string} password - The password you wish to compare with the database
 * @returns {boolean} - True if the password is a valid else null
 */
users.methods.comparePassword = async function(password) {
  let valid = bcrypt.compare(password, this.password);
  return valid ? this : null;
};

/**
 * The generate token method creates a JWT token for use in further authentication within our app.
 * @returns {Object} - The generated JWT token  
 */
users.methods.generateToken = function() {
  let tokenData = { id: this._id };
  return jwt.sign(tokenData, process.env.SECRET || 'this-is-my-secret');
};

module.exports = mongoose.model('users', users);
