export const typeDefs = `#graphql
  type Book {
    title: String!
    author: String
    coverPhotoURL: String
    readingLevel: String
  }

  type Query {
    books(searchText: String): [Book]
    book(title: String!): Book
  }
`;
