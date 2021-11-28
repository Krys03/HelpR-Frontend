import React from 'react'
import RequestTable from './../Requests/RequestsTable'
import { Icon, Header } from 'semantic-ui-react'

class MyRequests extends React.Component {


	render (props) 
	{
		return (
			<div className="container" >
			<div className="row">
			<Header  as='h2' block style={{ marginTop : 70 , marginLeft : 12 }} color='blue'><Icon name= "check circle" /> My request </Header>
				
				<RequestTable userRequest={true}/>
		</div>
	</div>
		)
	}
}

export default MyRequests