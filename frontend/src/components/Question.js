import React from 'react';

function Question(props) {
    const { question_index } = props;

    return (
        <div className="container">
            <div>
                <div className="question-count">
                  Question <span>{props.question_index + 1}</span> of <span>{props.questions_total}</span>
                </div>
                <h2 className="question">
                    {props.question_text}
                </h2>
                <ul className="answer-options">
                    {
                        props.question_options.map(
                            (option, index) => {
                                return (
                                    <li key={index} className="answer-option">
                                        <input
                                            type="radio"
                                            name="radioGroup_${question_index}"
                                            id={`option_${question_index}_${index}`}
                                            value={index}
                                            checked={props.answers[question_index] == index}
                                            onChange={props.onAnswerSelected}
                                        />
                                        <label htmlFor={`option_${index}`}>
                                            {option.option_text}
                                        </label>
                                    </li>
                                );
                            }
                        )
                    }
                </ul>
            </div>
        </div>
    );
}

export default Question;
