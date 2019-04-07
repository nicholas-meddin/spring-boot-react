import React, {Component} from 'react';
import './App.css';
import Home from './Home';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ProductList from './ProductList';
import ProductEdit from './ProductEdit';

import {CookiesProvider} from 'react-cookie';

class App extends Component {
    render() {
        return (
            <CookiesProvider>
                <Router>
                    <Switch>
                        <Route path='/' exact={true} component={Home}/>
                        <Route path='/products' exact={true} component={ProductList}/>
                        <Route path='/products/:id' component={ProductEdit}/>
                    </Switch>
                </Router>
            </CookiesProvider>
        )
    }
}

export default App;