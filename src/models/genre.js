module.exports = (connection, DataTypes) => {
    const schema = {
        genre: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                  msg: 'Please enter a genre',
                },
                notEmpty: {
                  args: [true],
                  msg: 'The genre cannot be empty',
                },
              },
          }
    }

    const GenreModel = connection.define('Genre', schema);
    return GenreModel;

}

