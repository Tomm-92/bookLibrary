module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter a book title',
        },
        notEmpty: {
          args: [true],
          msg: 'The book title cannot be empty',
        },
      },
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter the author name',
        },
        notEmpty: {
          args: [true],
          msg: 'The author name cannot be empty',
        },
      },
    },
    genre: {
      type: DataTypes.STRING,
    },
    ISBN: { type: DataTypes.STRING },
  };

  const BookModel = connection.define('Book', schema);
  return BookModel;
};
