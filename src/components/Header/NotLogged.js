/* eslint-disable max-classes-per-file */
/* eslint-disable react/no-multi-comp */

import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button, Container, Dropdown, Menu, Image} from 'semantic-ui-react';

class Notlogged extends Component {
  render() {
    return (
      <Menu fluid stackable borderless color="blue" inverted attached>
        <Container>
          <Menu.Item>
            <Link to="/" className="brand">
            <Image size='tiny' src={require('../../media/helpr.png')} />
            </Link>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/user/request" exact>All request</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/user/myrequests" exact>My requests</NavLink>
          </Menu.Item>
          <Menu.Item>
            <NavLink to="/user/messages" exact>Messages</NavLink>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Button as='a'  inverted as={Link} to="/sign-in" exact>
                Log in
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button as='a'  inverted as={Link} to="/sign-up" exact>
                Register
              </Button>
            </Menu.Item>
         
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}




export default Notlogged
