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
        notEmpty: {
          args: [true],
          msg: 'Name value cannot be empty',
        },
        notNull: {
          args: [true],
          msg: 'A name must be provided',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: 'Password cannot be empty',
        },
        isLessThan8Characters(value) {
          if (value.length < 8)
            throw new Error('Password needs to be longer than 8 characters');
        },
      },
    },
  };

  const ReaderModel = connection.define('Reader', schema);
  return ReaderModel;
};
