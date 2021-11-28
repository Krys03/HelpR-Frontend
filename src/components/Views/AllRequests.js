import React from 'react'
import Map from '../Map/Map'
import Pop from '../../tools/pop'
import { connect } from 'react-redux'
import { connectBack } from '../../tools/axiosURL'
import RequestsCardContainer from './../Requests/RequestsCardContainer'
import { Icon, Header, Statistic, Image} from 'semantic-ui-react'

class AllRequests extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		  statUser: 0,
		  statFulfilled: 0,
		  statUnfulfilled: 0,
		  isActive: true
		}
	  }
	
	  handleShow = () => {
		this.setState({isActive: true});
	  };
	
	  handleHide = () => {
		this.setState({isActive: false});
	  };

	  handleMap = () => {
		this.setState({isActive : !this.state.isActive});
	  };


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


	render() {

		return (
			<div>
			<section>
				<div className="container-fluid">
					<div className="row text-primary text-center">
					<Header  as='h2' block style={{ marginTop : 70 , marginLeft : 12 }} color='blue'><Icon name= "world" fluid/> Helpr Map </Header>
	

						<div className="col-12">
							<Pop />
						</div>
						<div className="btn btn-primary mx-auto mt-3 d-md-none" onClick={ this.handleMap }>{(this.state.isActive === true) ? <span className="">Hide the Map</span> : <span className="">Show the Map</span>}</div>
						{this.state.isActive ? 
							<div className="col-12 col-md-7 mt-3 map">
								<Map/>
							</div>
						 : null }
             			
						<div className="col-12 col-md-5 p-0 map-request">
							<section className="map-request-container">
								<div className="container lh-1-5 p-1 pb-6 mb-7">
									<RequestsCardContainer userRequest={false}/>
								</div>
							</section>
						</div>
						<footer className="text-white bg-dark col-12 text-center mt-4 pb-5">
							
                        <Statistic.Group widths='three' inverted style={{ paddingTop : 40 }}>
    
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


					</footer>


					</div>
				</div>
			</section>
		</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return {	
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllRequests)