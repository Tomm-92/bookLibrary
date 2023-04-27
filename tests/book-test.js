const { expect } = require('chai');
const request = require('supertest');
const { Book } = require('../src/models');
const app = require('../src/app');

describe('/books', () => {
  before(async () => Book.sequelize.sync({ force: true }));

  beforeEach(async () => {
    await Book.destroy({ where: {} });
  });

  describe('with no book records in the database', () => {
    describe('POST /books', () => {
      it('creates a new book in the database', async () => {
        const response = await request(app).post('/books').send({
          title: 'LOTR The Fellowship of The Ring',
          author: 'JRR Tolkien',
          genre: 'Fantasy',
          ISBN: '12345678910',
        });
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(201);
        expect(response.body.title).to.equal('LOTR The Fellowship of The Ring');
        expect(response.body.author).to.equal('JRR Tolkien');
        expect(response.body.ISBN).to.equal('12345678910');
        expect(newBookRecord.title).to.equal('LOTR The Fellowship of The Ring');
        expect(newBookRecord.author).to.equal('JRR Tolkien');
        expect(newBookRecord.genre).to.equal('Fantasy');
        expect(newBookRecord.ISBN).to.equal('12345678910');
      });

      it('cannot create a book if there is no author or title', async () => {
        const response = await request(app).post('/books').send({});
        const newBookRecord = await Book.findByPk(response.body.id, {
          raw: true,
        });

        expect(response.status).to.equal(404);
        expect(response.body.errors.length).to.equal(2);
        expect(newBookRecord).to.equal(null);
      });



    });
  });

  describe('with book records in the database', () => {
    let books;

    beforeEach(async () => {
      books = await Promise.all([
        Book.create({
          title: 'LOTR The Two Towers',
          author: 'JRR Tolkien',
          genre: 'Fantasy',
          ISBN: '2468101214',
        }),
        Book.create({
          title: 'LOTR The Return of The King',
          author: 'JRR Tolkien',
          genre: 'Fantasy',
          ISBN: '369121518',
        }),
        Book.create({
          title: 'To Kill A Mockbird',
          author: 'Harper Lee',
          genre: 'Southern Gothic',
          ISBN: '51015202530',
        }),
      ]);
    });

    describe('GET /books', () => {
      it('gets all book records', async () => {
        const response = await request(app).get('/books');

        expect(response.status).to.equal(200);
        expect(response.body.length).to.equal(3);

        response.body.forEach((book) => {
          const expected = books.find((a) => a.id === book.id);

          expect(book.title).to.equal(expected.title);
          expect(book.author).to.equal(expected.author);
          expect(book.genre).to.equal(expected.genre);
          expect(book.ISBN).to.equal(expected.ISBN);
        });
      });
    });

    describe('GET /books/:id', () => {
      it('gets book record by id', async () => {
        const book = books[0];
        const response = await request(app).get(`/books/${book.id}`);

        expect(response.status).to.equal(200);
        expect(response.body.title).to.equal(book.title);
        expect(response.body.author).to.equal(book.author);
        expect(response.body.genre).to.equal(book.genre);
        expect(response.body.ISBN).to.equal(book.ISBN);
      });

      it('returns a 404 if the reader does not exist', async () => {
        const response = await request(app).get('/books/12345');

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.');
      });
    });

    describe('DELETE /books/:id', () => {
      it('deletes book record by id', async () => {
        const book = books[0];
        const response = await request(app).delete(`/books/${book.id}`);
        const deletedBook = await Book.findByPk(book.id, { raw: true });

        expect(response.status).to.equal(204);
        expect(deletedBook).to.equal(null);
      });

      it('returns a 404 if the book does not exist', async () => {
        const response = await request(app).delete('/books/12345');
        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.');
      });
    });

    describe('PATCH /books/:id', () => {
      it('updates books title by id', async () => {
        const book = books[0];
        const response = await request(app)
          .patch(`/books/${book.id}`)
          .send({ title: 'A storm of swords' });
        const updatedBookRecord = await Book.findByPk(book.id, {
          raw: true,
        });

        expect(response.status).to.equal(200);
        expect(updatedBookRecord.title).to.equal('A storm of swords');
      });

      it('returns a 404 if the book does not exist', async () => {
        const response = await request(app)
          .patch('/books/12345')
          .send({ title: 'A storm of swords' });

        expect(response.status).to.equal(404);
        expect(response.body.error).to.equal('The book could not be found.');
      });
    });
  });
});
