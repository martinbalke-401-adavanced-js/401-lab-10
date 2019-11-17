'use strict';

// == EXTERNAL RESOURCES ===============================================

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// == INTERNAL RESOURCES ===============================================

const errorHandler = require('./middleware/error.js');
const notFound = require('./middleware/404.js');
const authRouter = require('./routes/auth-router.js');
const bookRouter = require('./routes/book-router.js');
const app = express();

// == APPLICATION MIDDLEWARE ============================================

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// == ROUTES ===========================================================

/**
 * The homepage for our application
 * @route GET /
 * @returns {string} 200 - Text showing us we are on the homepage
 */
app.get('/', (req, res, next) => {
  res.send('Homepage');
});

//Setting up express to use our authentication routes
app.use(authRouter);

//Setting up express to use our book routes
app.use(bookRouter);

//404 error handler
app.use(notFound);

// Our general error handler
app.use(errorHandler);

// == EXPORTS ===========================================================

module.exports = {
  server: app,

  start: port => {
    const PORT = port || process.env.PORT;

    /**
     * Set up our server to run on the port specified above
     * @param PORT - The port our server is running on
     */
    app.listen(PORT, () => {
      console.log(`Server Up on ${PORT}`);
    });

    //Enabling mongoose configuration's to avoid using out dated methods
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };

    const path = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/app';
    mongoose.connect(path, options);
  },
};
