module.exports = (connection, DataTypes) => {
  const schema = {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email cannot be empty',
        },
        isEmail: {
          args: [true],
          msg: 'Must be a valid email address',
        },
      },
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: {
          args: [8],
          msg: 'The password length should be more than 8 characters long.',
        },
        notNull: {
          msg: 'Password cannot be null',
        },
      },
    },
  };

  const ReaderModel = connection.define('Reader', schema);
  return ReaderModel;
};
