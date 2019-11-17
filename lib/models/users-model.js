'use strict';

const Model = require('./model.js');
const schema = require('./users-schema.js');

class Users extends Model {
  constructor() {
    super(schema);
  }

  /**
   * Authenticate is a function which takes in a users credentials then calls upon
   * the mongoose schema to authenticate them
   * @param {object} creds - The users password and username credentials 
   * @returns {object} - The found user record
   */
  authenticate(creds) {
    return this.schema.authenticate(creds);
  }
}

module.exports = Users;
