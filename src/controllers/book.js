const { Book } = require('../models');

const createUser = async (req, res) => {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  };

const getBooks = async (req, res) => {
  const books  = await Book.findAll()
  res.status(200).json(books)
}

const getBookbyId = async (req, res) => {
  const { id } = req.params
  const book = await Book.findByPk(id)
  try {

    if (!book) {
      res.status(404).json({error: 'The book could not be found.'})
  
    } else {
      res.status(200).json(book)
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
}

const deleteBookById = async (req, res) => {
  const { id } = req.params
  const book = await Book.findByPk(id)

  try {
    if(!book) {
      res.status(404).json({error: 'The book could not be found.'})
    } else {
      const deletedBook = await Book.destroy({where: {id}})
      res.status(204).json(deletedBook);
    }
  } catch (err) {
    res.status(500).json(err.message)
  }
}


const updateById = async (req, res) => {
  const {id} = req.params
  const book = await Book.findByPk(id)
  const update = req.body

  try {
    if (!book) {
      res.status(404).json({error: 'The book could not be found.'})
    } else {
      const updatedBook = await Book.update(update, {where: {id}})
      res.status(200).json(updatedBook)
    }
  } catch (err) {
    res.status(500).json(err.message)
  }
}



  module.exports = {createUser, getBooks, getBookbyId, deleteBookById, updateById};