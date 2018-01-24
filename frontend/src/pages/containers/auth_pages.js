import React, { createElement } from 'react';
import { withRouter, Switch, Route, Redirect, Link } from 'react-router-dom';

import * as Pages from '../index';

//import userServiceInstance from '../../utils/services/user_service';

class AuthPagesComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false
        };
    }

    componentWillMount() {
        const isLoggedIn = this.isLoggedIn();

        this.setState({isLoggedIn});

        if (!isLoggedIn) {
            this.redirectToLogin(this.props);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            const isLoggedIn = this.isLoggedIn();

            this.setState({isLoggedIn});

            if (!isLoggedIn) {
                this.redirectToLogin(nextProps);
            }
        }
    }

    componentDidMount() {
    }

    isLoggedIn() {
        if (!localStorage.getItem('api_token')) {
            return false;
        }

        return true;
    }

    redirectToLogin(props) {
        const { history, location } = props;

        history.replace({ pathname: '/login' });
    }

    render() {
        return  <div>
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
                    <Switch>
                        <Route
                            exact path="/"
                            render={
                                (props) => {
                                    return this.state.isLoggedIn ? <Redirect to="/home" />  : null;
                                }
                            }
                        />
                        <Route
                            exact path="/home"
                            render={
                                (props) => {
                                    return this.state.isLoggedIn ? createElement(Pages.HomePage, props) : null;
                                }
                            }
                        />
                        <Route exact path="/quiz" component={Pages.QuizPage}/>
                        <Route
                            exact
                            path="/results"
                            render={
                                (props) => {
                                    let Component = Pages.ResultsPage;
                                    return <Component {...props.location.state} />
                                }}
                        />
                        <Redirect from="*" to="/home" />
                    </Switch>
                </div>
    }
}

export const AuthPagesContainer = withRouter(AuthPagesComponent);
