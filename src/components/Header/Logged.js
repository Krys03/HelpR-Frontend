import React from 'react'
import { NavLink, Link} from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios'
import { logout, setCurrentLocation } from '../../tools/actions'
import {
    Container,
    Image,
    Menu,
    Button,
    Icon
    
  } from 'semantic-ui-react'


class Logged extends React.Component {

    componentDidMount () {
        if (!this.props.currentLocation) { 
            console.log('will have to search for geolocation')
            this.getCurrentLocation()
        } else {
            console.log('already got geolocation')
        }
    }

    getPosition = (position) => {
    let addressName = null
    const googleGeoCoding = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + "," + position.coords.longitude + "&key=AIzaSyAVr5FG_sBx3vU0seFGE7wiSRIN9JHwY1k"
    
    axios.get(googleGeoCoding).then( response => {
        this.props.setUsersLocation({ name: 'unknown', lat: 51.505484, lng: -0.075337 })
      if (response.data.status === 'OK') {
        addressName = response.data.results[3].formatted_address
        this.props.setUsersLocation({ name: addressName, lat: position.coords.latitude, lng: position.coords.longitude })
        console.log('got geolocation')
        
      } else {
        console.log('no geolocation available')
        console.log(response.data.status)
        
        this.props.setUsersLocation({ name: 'unknown', lat: 51.505484, lng: -0.075337 })
      }
    })
    .catch(error => {
      console.log('Geocoding error:', error)
    })
  }

  getCurrentLocation = () => {
    if ("geolocation" in navigator) {
        console.log('trying to get geolocation')
        this.props.setUsersLocation({ name: 'unknown', lat:41.3833 , lng:2.1833})
        // Forced location to Barcelona for HTTP (with HTTPS just remove the next line)
        navigator.geolocation.getCurrentPosition(this.getPosition)
    } else {
        console.log('Warning, Geolocation is not active')
    }
  }

    render (props) {
        return(
        <div>
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
		  <Menu.Item as='a'><NavLink to="/user/createrequest"><Button inverted ><Icon  name='plus circle'/>Create new request</Button></NavLink></Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <Button as='a' inverted as={Link}to="/sign-up" onClick={this.props.logout} exact>
                Log out
              </Button>
            </Menu.Item>
            
         
          </Menu.Menu>
        </Container>
      </Menu>
        </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => { dispatch(logout()) },
        setUsersLocation: (val) => { dispatch(setCurrentLocation(val)) }
    }
}

const mapStateToProps = state => {
    return {
        currentLocation: state.currentLocation,
        auth: state.auth
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logged)
