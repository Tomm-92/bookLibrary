const {
  getAllItems,
  getItemById,
  deleteById,
  createItem,
  updateItem,
} = require('./helpers');

const getBooks = (_, res) => getAllItems(res, 'book');

const getBookById = (req, res) => getItemById(res, 'book', req.params.id);

const deleteBookById = (req, res) => deleteById(res, 'book', req.params.id);

const createBook = (req, res) => createItem(res, 'book', req.body);

const updateBook = (req, res) =>
  updateItem(res, 'book', req.params.id, req.body);

module.exports = {
  getBooks,
  getBookById,
  deleteBookById,
  createBook,
  updateBook,
};


