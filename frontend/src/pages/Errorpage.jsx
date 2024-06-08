import React from 'react';

const ErrorPage = () => (
  <div style={{ textAlign: 'center', marginTop: '50px', fontWeight: 'bolder' }}>
    <img
      src="https://static.vecteezy.com/system/resources/previews/021/844/396/non_2x/error-404-page-not-found-funny-little-man-chibi-sits-thoughtfully-next-to-a-broken-wire-illustration-for-design-design-vector.jpg"
      alt="Error"
      className="Error"
    />
    <h1>404</h1>
    <p>Sorry, the page you are looking for does not exist.</p>
    <a href="/">Go back to Home</a>
  </div>
);

export default ErrorPage;
