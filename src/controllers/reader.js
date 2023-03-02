const { Reader } = require('../models');

const createUser = async (req, res) => {
  const newReader = await Reader.create(req.body);
  res.status(201).json(newReader);
};

const allUsers = async (req, res) => {
  const newReader = await Reader.findAll();
  res.status(200).json(newReader);
};

const userById = async (req, res) => {
  
 const { id } = req.params;
  const reader = await Reader.findByPk(id)
  try {
  if (!reader) {
    res
    .status(404)
    .json({ error: 'The reader could not be found.' });
  } else {
    res
    .status(200)
    .json(reader);
  }
 } catch (err) {
  res.status(500).json(err.message);
}}

const updateById = async (req, res) => {
  const { id } = req.params;
  const { email}  = req.body;
  const user = await Reader.findByPk(id);

  try {
    if (user) {
      console.log('id valid')
      await Reader.update({email}, { where: { id } });
      res.status(200).json(email);
    } else {
      res.status(404).json({ error: 'The reader could not be found.' });
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const user = await Reader.findByPk(id);

  try {
    if (user) {
    const deleteReader = await Reader.destroy({where: {id}});
    res.status(204).json(deleteReader)
  } else {
    res.status(404).json({error: 'The reader could not be found.'})
  }
  } catch (err) {
    res.status(500).json(err.message);
  }
}; 

module.exports = {
  createUser,
  allUsers,
  userById,
  updateById,
  deleteById
};
