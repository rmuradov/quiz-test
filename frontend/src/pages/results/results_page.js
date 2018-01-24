import React, { Component } from 'react';

import { Link } from 'react-router-dom';

export const ResultsPage = (props) => {
    return (
        <div>
            <h2>
                Results
            </h2>
            <div>
                Finish!
                <br/>
                You scored {props.scores} out of {props.out_of}
            </div>
            <ul>
                <li>
                    <Link to="/quiz">New Quiz?</Link>
                </li>
                <li>
                    <Link to="/home">Home</Link>
                </li>
            </ul>
        </div>
    );
};
