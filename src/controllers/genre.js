const {
    getAllItems,
    getItemById,
    deleteById,
    createItem,
    updateItem,
  } = require('./helpers');
  
  const getGenres = (_, res) => getAllItems(res, 'genre');
  
  const getGenreById = (req, res) => getItemById(res, 'genre', req.params.id);
  
  const deleteGenreById = (req, res) => deleteById(res, 'genre', req.params.id);
  
  const createGenre = (req, res) => createItem(res, 'genre', req.body);
  
  const updateGenre = (req, res) => updateItem(res, 'genre', req.params.id, req.body); 
  
  module.exports = {
    getGenres,
    getGenreById,
    deleteGenreById,
    createGenre,
    updateGenre};
  