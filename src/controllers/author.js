const {
    createItem,
    getAllItems,
    getItemById,
    deleteById,
    updateItem
} = require('./helpers');

const createAuthor = (req, res) => createItem(res, 'author', req.body);

const getAuthors = (_, res) => getAllItems(res, 'author'); 

const deleteAuthorById = (req, res) => deleteById(res, 'author', req.params.id);

const getAuthorById = (req, res) => getItemById(res, 'author', req.params.id);

const updateAuthor = (req, res) => updateItem(res, 'author', req.params.id, req.body); 


module.exports = {
    createAuthor,
    getAuthors,
    deleteAuthorById,
    getAuthorById,
    updateAuthor

}