import React, {Component} from 'react';
import {Button, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';
import {withCookies} from "react-cookie";

class AppNavbar extends Component {

    state = {
        isAuthenticated: false
    };

    constructor(props) {
        super(props);
        this.state = {isOpen: false};
        this.toggle = this.toggle.bind(this);
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


    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const button = this.state.isAuthenticated ?
            <div>
                <Button color="link"><Link to="/groups">Manage JUG Tour</Link></Button>
                <br/>
                <Button color="link" onClick={this.logout}>Logout</Button>
            </div> :
            <Button color="primary" onClick={this.login}>Login</Button>;

        return <Navbar color="light" light expand="md">
            <NavbarBrand tag={Link} to="/">Goldilocks</NavbarBrand>
            <NavbarToggler onClick={this.toggle}/>
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink tag={Link} to="/shop">SHOP</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/goldstandard">GOLD STANDARD</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} to="/about">ABOUT</NavLink>
                    </NavItem>
                    <NavItem>
                        {button}
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>;
    }
}

export default withCookies(AppNavbar);