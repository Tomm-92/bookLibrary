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
  try {
    const newReader = await Reader.findByPk(id);
    if (newReader) {
      res.status(200).json(newReader);
    }
    res.status(404).json({ error: 'The reader could not be found.' });
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { email}  = req.body;
  const user = await Reader.findByPk(id);

  try {
    if (user) {
      console.log('id valid')
      const updatedReader = await Reader.update({email}, { where: { id } });
      console.log(updatedReader)
      res.status(200).json(email);
    } else {
      res.status(404).json({ error: 'The reader could not be found.' });
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
};
