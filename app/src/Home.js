import React, { Component } from 'react';
import './App.css';
import AppNavbar from './AppNavbar';
import HomeHero from './HomeHero';
import GoldiSurvey from './GoldiSurvey';
import ProductList from './ProductList';

import { Link } from 'react-router-dom';
import { Button, Container } from 'reactstrap';
import { withCookies } from 'react-cookie';

class Home extends Component {
    state = {
        isLoading: true,
        isAuthenticated: false,
        user: undefined
    };

    constructor(props) {
        super(props);
        const {cookies} = props;
        this.state.csrfToken = cookies.get('XSRF-TOKEN');
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    async componentDidMount() {
        const response = await fetch('/api/user', {credentials: 'include'});
        const body = await response.text();
        if (body === '') {
            this.setState(({isAuthenticated: false}))
        } else {
            this.setState({isAuthenticated: true, user: JSON.parse(body)})
        }
    }

    login() {
        let port = (window.location.port ? ':' + window.location.port : '');
        if (port === ':3000') {
            port = ':8081';
        }
        window.location.href = '//' + window.location.hostname + port + '/private';
    }

    logout() {
        fetch('/api/logout', {method: 'POST', credentials: 'include',
            headers: {'X-XSRF-TOKEN': this.state.csrfToken}}).then(res => res.json())
            .then(response => {
                window.location.href = response.logoutUrl + "?id_token_hint=" +
                    response.idToken + "&post_logout_redirect_uri=" + window.location.origin;
            });
    }

    render() {
        const message = this.state.user ?
            <h2>Welcome, {this.state.user.name}!</h2> :
            <p>Log in to get started.</p>;

        const button = this.state.isAuthenticated ?
            <div>
                <Button color="link"><Link to="/products">Browse Products</Link></Button>
                <br/>
                <Button color="link" onClick={this.logout}>Logout</Button>
            </div> :
            <Button color="primary" onClick={this.login}>Login</Button>;

        const gsurvey = this.state.isAuthenticated ?
            <GoldiSurvey/> : <div><p>Log in to get started</p></div>


        return (
            <div>
                <AppNavbar/>

                <Container fluid>
                    <HomeHero/>
                    {gsurvey}
                    {button}
                </Container>

            </div>
        );
    }
}

export default withCookies(Home);