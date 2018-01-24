import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export const HomePage = () => (
  <div>
    <h2>
        Home
    </h2>
    <hr/>
    <ul>
        <li>
            <Link to="/quiz">Start Quiz</Link>
        </li>
    </ul>
  </div>
);
