import React from 'react';
import { Link } from 'react-router-dom';
import { Icon, Navbar, Alignment } from '@blueprintjs/core';
import './AppNav.css';

function AppNav() {
  return (
    <React.Fragment>
      <Navbar>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Accounting</Navbar.Heading>
          <Navbar.Divider />
          <Link className="bp5-button" role="button" tabIndex={0} to="/">
            <Icon icon="home"></Icon> Home
          </Link>
          <Link className="bp5-button" role="button" tabIndex={0} to="/transfer">
            <Icon icon="swap-horizontal"></Icon> Transfer
          </Link>
          <Link className="bp5-button" role="button" tabIndex={0} to="/logout">
            <Icon icon="log-out"></Icon> Logout
          </Link>
        </Navbar.Group>
      </Navbar>
    </React.Fragment>
  );
}

export default AppNav;
