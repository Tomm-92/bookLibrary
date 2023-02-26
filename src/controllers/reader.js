const { Reader } = require('../models');

const createUser = async (req, res) => {
  const newReader = await Reader.create(req.body);
  res.status(201).json(newReader);
};

const allUsers = async (req, res) => {
    const newReader = await Reader.findAll();
    res.status(200).json(newReader);
}

const userById = async (req, res) => {
    const {id} = req.params
    const newReader = await Reader.findByPk(id);
    res.status(200).json(newReader);
}

module.exports = {
  createUser, allUsers, userById
};
