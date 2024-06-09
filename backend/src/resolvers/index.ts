import { booksData } from '../data/books';

interface BookArgs {
  title: string;
}

export const resolvers = {
  Query: {
    books: () => booksData,
    book: (_: unknown, args: BookArgs) => {
      const { title } = args;
      const foundBook = booksData.find(book => book.title === title);
      return foundBook;
    }
  }
};