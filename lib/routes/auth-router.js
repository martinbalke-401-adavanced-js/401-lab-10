'use strict';

const express = require('express');
const router = express.Router();

const Users = require('../models/users-model.js');
const users = new Users();

/**
 * Create is a helper function that enables us to create a new user
 * @param {object} req.body = The necessary information to create a new user in the database 
 * @param {object} req.user = The user record that we've created inside the database 
 * @param {Function} next - Calls the next middleware in line
 */
const create = async (req, res, next) => {
  let user = await users.create(req.body);
  req.user = user && user._id ? user : null;

  next();
};

/**
 * Authenticate is a helper function that enables us to authenticate an existing user
 * @param {object} req.body - The required inforamtion to authenticate a user sent over inside of the request 
 * @param {object} req.user - The user record that matches 
 * @param {Function} next - Calls the next middleware in line
 */
const authenticate = async (req, res, next) => {
  let user = await users.authenticate(req.body);
  req.user = user && user._id ? user : null;

  next();
};


const setToken = (req, res, next) => {
  if (req.user) {
    let token = req.user.generateToken();

    //Setting the response header.token to be the token we generated for an authenticated user
    res.set('token', token);

    //Setting a cookie inside of the users browser with the key value pair of token and the token data 
    res.cookie('token', token);

    res.send('Successfully authenticated and logged in');
  } else res.send('Unable to authenticate and log in');
};

/**
 * Route for signing up for an account on our website
 * @group Signup/Signin
 * @route POST /signup
 * @returns {string} 200 - A message letting the user know they are succesfully authenticated and logged in
 * @returns {Error} 500  - Unabe to authenticate and log in
 */
router.post('/signup', create, setToken);


/**
 * Route for signing up for an account on our website
 * @group Signup/Signin
 * @route POST /signin
 * @returns {string} 200 - A message letting the user know they are succesfully authenticated and logged in
 * @returns {Error} 500  - Unabe to authenticate and log in
 */
router.post('/signin', authenticate, setToken);

module.exports = router;
