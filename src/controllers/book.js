const { Book } = require('../models');

const createUser = async (req, res) => {
    const newReader = await Book.create(req.body);
    res.status(201).json(newReader);
  };





  module.exports = {createUser};