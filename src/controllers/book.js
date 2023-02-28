const { Book } = require('../models');

const createUser = async (req, res) => {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  };

const getBook = async (req, res) => {
  const newBook = await Book.findAll()
  res.status(200).json(newBook)
}





  module.exports = {createUser, getBook};