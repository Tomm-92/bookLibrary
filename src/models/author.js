module.exports = (connection, DataTypes) => {
    const schema = {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
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
    }
    const AuthorModel = connection.define('Author', schema);
    return AuthorModel;
}




