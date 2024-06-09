import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  ApolloClient, InMemoryCache, ApolloProvider, createHttpLink,
} from '@apollo/client';
import App from './App';
import { ReadingListProvider } from './components/listcontext';

const appNode = createRoot(document.getElementById('ReadingList'));
const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache(),
});

const Root = () => (
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ReadingListProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReadingListProvider>
      ,
    </ApolloProvider>
  </React.StrictMode>
);
appNode.render(<Root />);
