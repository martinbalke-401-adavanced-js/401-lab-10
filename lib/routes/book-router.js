'use strict';

const express = require('express');
const router = express.Router();

let books = [
  { title: 'Brave New World', auth: ['admin'] },
  { title: 'Hamlet', auth: ['admin', 'editor'] },
  { title: 'Alice in Wonderland', auth: ['admin', 'editor', 'user'] },
];

// TODO Swagger Comments
// TODO Edit code (see lab README)
router.get('/books', (req, res, next) => {

  books = books.filter( book => book.auth.includes(req.body.role));
  if(books.length < 1) return next('Access denied');
  let library = {
    count: books.length,
    results: books,
  };
  res.status(200).json(library);
});

// TODO Swagger Comments
// TODO Edit code (see lab README)

router.get('/books/:indx', (req, res, next) => {
  if (req.params.indx < books.length) {
    let book = books[req.params.indx];
    if(book.auth.includes(req.body.role)) res.status(200).json(book);
    else next('Access denied');
  } else {
    res.send('Book not Found');
  }
});

module.exports = router;
