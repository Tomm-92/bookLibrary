const {
  getAllItems,
  getItemById,
  deleteById,
  createItem,
  updateItem,
} = require('./helpers');

const getUsers = (_, res) => getAllItems(res, 'reader');

const getUserById = (req, res) => getItemById(res, 'reader', req.params.id);

const deleteUserById = (req, res) => deleteById(res, 'reader', req.params.id);

const createUser = (req, res) => createItem(res, 'reader', req.body);

const updateUser = (req, res) => updateItem(res, 'reader', req.params.id, req.body); 

module.exports = {
  getUsers,
  getUserById,
  deleteUserById,
  createUser,
  updateUser};


