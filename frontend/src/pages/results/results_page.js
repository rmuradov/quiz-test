import React, { Component } from 'react';

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
        </div>
    );
};
