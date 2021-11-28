import React from 'react'
import PropTypes from 'prop-types'
import { NavLink, Link} from 'react-router-dom'
import {
	Container,
	Image,
	Menu,
	Button,
	
  } from 'semantic-ui-react'
  
  

const NotLogged = (props) => {


	return(
		<div>
			    <Menu fixed='top' color='blue' inverted>
      <Container>
        <Menu.Item  header>
          <Image size='tiny' src={require('../../media/logoheader.svg')} style={{ marginRight: '1.5em' }} />
        </Menu.Item>
        <Menu.Item as='a'> <NavLink to="/user/request" exact>All request</NavLink></Menu.Item>
		<Menu.Item as='a'><NavLink to="/user/myrequests" exact>My Request</NavLink></Menu.Item>
		<Menu.Item as='a'><NavLink to="/user/messages" exact>Messages</NavLink></Menu.Item>
		<Menu.Item position='right'>
                    <Button as='a'  inverted  as={Link} to="/sign-in" exact>
                      Log in
                    </Button>
                    <Button as='a' inverted style={{ marginLeft: '0.5em' }} as={Link} to="/sign-up" exact> 
                      Register
                    </Button>
                  </Menu.Item>

        
      </Container>
    </Menu>

    
    
		</div>
		
		)
}

export default NotLogged