import React, { Component } from 'react';

import { Route, Redirect } from 'react-router-dom';

import questions from '../../../mock_api/questions';
import Question from './Question';

class Quiz extends Component {

    constructor(props) {
        super(props);

        this.state = {
            question_text: '',
            question_index: 0,
            question_options: [],
            answers: [],
            result: null
        };

        this.handleAnswerSelected = this.handleAnswerSelected.bind(this);
    }

    componentWillMount() {
        this.setState({
            question_text: questions[this.state.question_index].question_text,
            question_options: questions[this.state.question_index].question_options
        });
    }

    handleAnswerSelected(value) {
        let answers = this.state.answers.concat([]);
        answers[this.state.question_index] = parseInt(value, 10);

        this.setState({answers: answers});

        if (this.state.question_index < questions.length - 1) {
            setTimeout(
                () => this.moveToNextQuestion(),
                300
            );
        }
        else {
            setTimeout(
                () => this.setResults(),
                300
            );
        }
    }

    moveToNextQuestion() {
        let next_question_index = this.state.question_index + 1;

        this.setState({
            question_index: next_question_index,
            question_text: questions[next_question_index].question_text,
            question_options: questions[next_question_index].question_options
        });
    }

    getResults() {
        let scores = questions.reduce(
            (acc, question, question_index) => {
                let selected_val = this.state.answers[question_index];
                let score = questions[question_index].correct_answer == selected_val;

                return acc + score;
            },
            0
        );

        return scores.toString();
    }

    setResults() {
        this.setState({result: this.getResults()});
    }

    renderQuestion() {
        return (
            <Question
                question_text={this.state.question_text}
                question_options={this.state.question_options}
                question_index={this.state.question_index}
                questions_total={questions.length}
                answers={this.state.answers}
                onAnswerSelected={this.handleAnswerSelected}
            />
        );
    }


    renderResult() {
        return (
            <div>
                <Redirect
                    push={true}
                    to={
                            {
                                pathname: '/results',
                                state: {
                                    scores: this.state.result,
                                    out_of: questions.length,
                                }
                            }
                    }
                />
            </div>
        );
    }

    render() {
        return (
            <div className="App">
                <h2>
                    React Quiz
                </h2>
                {
                    this.state.result ? this.renderResult() : this.renderQuestion()
                }
            </div>
        );
    }

}

export default Quiz;
