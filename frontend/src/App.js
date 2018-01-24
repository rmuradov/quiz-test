import React, { Component } from 'react';

import { HashRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';

import * as Pages from './pages/index';

class App extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    render() {
        return (
            <Router>
                <div className="App">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/quiz">Quiz</Link>
                    </li>
                    <li>
                        <Link to="/results">Results</Link>
                    </li>
                </ul>
                <hr/>
                    <Route exact path="/" component={Pages.HomePage}/>
                    <Route exact path="/quiz" component={Pages.QuizPage}/>
                    <Route
                        exact
                        path="/results"
                        render={
                            (props) => {
                                let Component = Pages.ResultsPage;
                                return <Component {...props.location.state} />
                            }}/>
                </div>
            </Router>
        );
    }

}

export default App;
