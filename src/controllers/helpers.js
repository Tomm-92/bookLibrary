const { Reader, Book, Author, Genre } = require('../models');

const get404Error = (model) => ({ error: `The ${model} could not be found.` });

const getModel = (model) => {
  const models = {
    reader: Reader,
    book: Book,
    author: Author,
    genre: Genre
  };

  return models[model];
};

const hidePassword = (obj) => {
  if (obj.hasOwnProperty('password')) {
    delete obj.password;
  }
  return obj;
};

const getAllItems = async (res, model) => {
  const Model = getModel(model);

  const items = await Model.findAll();

  const itemsWithoutPassword = items.map((item) => {
    return hidePassword(item.dataValues);
  });

  res.status(200).json(itemsWithoutPassword);
};

const getItemById = async (res, model, id) => {
  const Model = getModel(model);
  const item = await Model.findByPk(id, {include: Genre});

  try {
    if (!item) {
      res.status(404).json(get404Error(model));
    } else {
      const itemWithoutPassword = hidePassword(item.dataValues)
      res.status(200).json(itemWithoutPassword);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const deleteById = async (res, model, id) => {
  const Model = getModel(model);
  const item = await Model.findByPk(id);

  try {
    if (!item) {
      res.status(404).json(get404Error(model));
    } else {
      const deleteItem = await Model.destroy({ where: { id } });
      res.status(204).json(deleteItem);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const createItem = async (res, model, body) => {
  const Model = getModel(model);

  try {
    const item = await Model.create(body);
    const itemWithoutPassword = hidePassword(item.dataValues)
    res.status(201).json(itemWithoutPassword);
  } catch (error) {
    const errorMessages = error.errors?.map((e) => e.message);
    res.status(404).json({ errors: errorMessages });
  }
};

const updateItem = async (res, model, id, body) => {
  const Model = getModel(model);

  const [itemsUpdated] = await Model.update(body, { where: { id } });

  try {
    if (!itemsUpdated) {
      res.status(404).json(get404Error(model));
    } else {
      const updatedItem = await Model.findByPk(id);
      //const itemWithoutPassword = hidePassword(updatedItem.get())
      res.status(200).json(updatedItem);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAllItems,
  getItemById,
  deleteById,
  createItem,
  updateItem,
};
