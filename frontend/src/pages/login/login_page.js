import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';

class LoginPageComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            password: '',
            isLoggedIn: false
        };
    }

    componentWillMount() {
        const isLoggedIn = this.isLoggedIn();

        this.setState({isLoggedIn});

        if (isLoggedIn) {
            this.redirectToProfile(this.props);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.location !== this.props.location) {
            const isLoggedIn = this.isLoggedIn();

            this.setState({isLoggedIn});

            if (isLoggedIn) {
                this.redirectToProfile(nextProps);
            }
        }
    }

    isLoggedIn() {
        if (!localStorage.getItem('api_token')) {
            return false;
        }

        return true;
    }

    redirectToProfile(props) {
        const { history, location } = props;

        if (location.pathname.startsWith('/login')) {
            history.replace({ pathname: '/home' });
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.password == 'admin') {
            localStorage.setItem('api_token', 'data_api_token');

            this.props.history.push({pathname: '/home'});
        }
    }

    render() {

        return  (
            <form className="" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    placeholder="enter you username"
                />

                <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    placeholder="enter password"
                />

                <button className="" type="submit">
                    Login
                </button>
            </form>
        );
    }
}

export const LoginPage = withRouter(LoginPageComponent);
