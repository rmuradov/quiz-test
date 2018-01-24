import React, { Component } from 'react';

import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import * as Pages from './pages/index';
import { AuthPagesContainer } from './pages/containers/auth_pages';

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
                <hr/>
                <Switch>
                    <Route path="/login" component={Pages.LoginPage} />
                    <Route path="/"
                        render={
                            (props) => {
                                return React.createElement(AuthPagesContainer, props)
                            }
                        }
                    />
                    <Redirect from="*" to="/" />
                </Switch>
                </div>
            </Router>
        );
    }

}

export default App;
