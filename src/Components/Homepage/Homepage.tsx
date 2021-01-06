import React from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div>
      <h1>Water Supply Board</h1>
      <h3>
        <Link to="/emplogin">Employee Login</Link>
      </h3>
      <h3>
        <Link to="/custlogin"> Customer Login </Link>
      </h3>
      <h3>
        <Link to="/empreg"> Register Employee </Link>
      </h3>
      <h3>
        <Link to="/custreg"> Register Customer </Link>
      </h3>
    </div>
  );
};

export default Homepage;
