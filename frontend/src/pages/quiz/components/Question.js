import React, { Component } from 'react';

class Question extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time_left: 10,
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.question_index !== nextProps.question_index) {
            this.setState({time_left: 10});
            this.startTimer();
        }
    }

    componentDidMount() {
        this.startTimer();
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    startTimer = () => {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    clearTimer = () => {
        clearInterval(this.timerID);
    }

    handleChange = (event) => {
        this.clearTimer();
        this.props.onAnswerSelected(event.currentTarget.value);
    }

    tick = () => {
        this.setState(
            (prevState, props) => {
                let time_left = prevState.time_left - 1;

                if (!time_left) {
                    this.clearTimer();
                    this.props.onAnswerSelected(null);
                }

                return {time_left: time_left};
            }
        );
    }

    render() {
        const { question_index, question_text, question_options, questions_total, answers, time_left } = this.props;

        return (
            <div className="container">
                <div>
                    <div className="question-count">
                      Question <span>{question_index + 1}</span> of <span>{questions_total}</span>
                    </div>
                    <h2 className="question">
                        {question_text}
                    </h2>
                    <h3 className="time-left">
                        {this.state.time_left} seconds left to answer this question!
                    </h3>
                    <ul className="answer-options">
                        {
                            question_options.map(
                                (option, index) => {
                                    return (
                                        <li key={index} className="answer-option">
                                            <input
                                                type="radio"
                                                name="radioGroup_${question_index}"
                                                id={`option_${question_index}_${index}`}
                                                value={index}
                                                checked={answers[question_index] == index}
                                                onChange={this.handleChange}
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
}
export default Question;
