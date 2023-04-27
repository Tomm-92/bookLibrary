const Sequelize = require('sequelize');
const ReaderModel = require('./reader');
const BookModel = require('./book');
const GenreModel = require('./genre');
const AuthorModel = require('./author');

const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST, PGPORT } = process.env;

const setupDatabase = () => {
  const connection = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
    host: PGHOST,
    port: PGPORT,
    dialect: 'postgres',
    logging: false,
  });

  const Reader = ReaderModel(connection, Sequelize);
  const Book = BookModel(connection, Sequelize);
  const Genre = GenreModel(connection, Sequelize);
  const Author = AuthorModel(connection, Sequelize)

  Genre.hasMany(Book);
  Author.hasMany(Book);
  Book.belongsTo(Genre);
  Book.belongsTo(Author);

  connection.sync({ alter: true });
  return { Reader, Book, Genre, Author };
};

module.exports = setupDatabase();
