import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, NavItem, Navbar, NavDropdown, MenuItem } from "react-bootstrap";
import "./App.css";
import Routes from "./Routes";
import RouteNavItem from "./components/RouteNavItem";
import { authUser, signOutUser } from "./libs/awsLib";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      if (await authUser()) {
        this.userHasAuthenticated(true);
      }
    }
    catch(e) {
      alert(e);
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = event => {
    signOutUser();
    this.userHasAuthenticated(false);
    this.props.history.push("/login");
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    };

    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              {this.state.isAuthenticated
                ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
                : [
                    <RouteNavItem key={2} href="/signup">
                      Signup
                    </RouteNavItem>,
                    <RouteNavItem key={3} href="/login">
                      Login
                    </RouteNavItem>
                  ]}
            </Nav>
            <Nav pullLeft>
            <NavDropdown eventKey={1} title="Menu" id="basic-nav-dropdown">
              {this.state.isAuthenticated
                ? <NavItem onClick={this.handleClick}>
                <RouteNavItem key={1.1} href="/Count">
                  Count
                </RouteNavItem>
      					<MenuItem divider />
                <RouteNavItem key={1.2} href="/Status">
                  Status
                </RouteNavItem>
      					<MenuItem divider />
      					<RouteNavItem key={1.3} href="/Shipping">
                Shipping
                </RouteNavItem>
                <MenuItem divider />
      					<RouteNavItem key={1.4} href="/Shipments">
                Shipments
                </RouteNavItem>
                </NavItem>
                : [

                  ]}
            </NavDropdown>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
        <Routes childProps={childProps} />
      </div>
    );
  }
}
export default withRouter(App);
