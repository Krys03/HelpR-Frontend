import React from 'react';
import { connectBack } from '../../tools/axiosURL'
import {Image, Grid, Statistic,Icon} from 'semantic-ui-react'
import './Home.css'

class Home extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
		  statUser: 0,
		  statFulfilled: 0,
		  statUnfulfilled: 0,
		  intervalID: 0
		}
	  }

	componentDidMount () {
		// initial load of the stats
		this.getData();
		
		// reload every 5 seconds
		this.intervalID = setInterval(this.getData.bind(this), 5000);
	}
	componentWillUnmount() {
		console.log('Clearing Interval')
		clearInterval(this.intervalID);
	  }

	getData =() => {
		connectBack.get('users/count', {
		})
		.then( response => {
			this.setState({statUser: response.data})
			this.setState({statFulfilled: response.data})
			this.setState({statUnfulfilled: response.data})
			console.log('getting stats')
		})
		.catch( error => {
			console.log('CountUsers ', error)
		})
	}

	render (props) {
		return(     
			
			
<Grid textAlign='center'  verticalAlign='middle' id="backghome" style={{ marginTop: 0 }}>
    <Grid.Column style={{ maxWidth: 800 }}>
    <Image size='medium ' src={require('../../media/helpr.png')}  verticalAlign='middle'  attached='top'  style={{ marginBottom: '100px', }}/> 
	<Statistic.Group widths='three' inverted>
    
	<Statistic >
      <Statistic.Value >
        <Image src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' className='circular inline' />
        {this.state.statUser.users}
      </Statistic.Value>
      <Statistic.Label>Helpr Members</Statistic.Label>
    </Statistic>

    <Statistic>
      <Statistic.Value >
	  <Icon name='check'/>{this.state.statFulfilled.fulfilled}
      </Statistic.Value>
      <Statistic.Label>Help fulfilled</Statistic.Label>
    </Statistic>

    <Statistic>
      <Statistic.Value>
         {this.state.statUnfulfilled.unfulfilled}
      </Statistic.Value>
      <Statistic.Label>Help available</Statistic.Label>
    </Statistic>

    
  </Statistic.Group>
	  </Grid.Column>
	  </Grid>
		)
	}
}

export default Home