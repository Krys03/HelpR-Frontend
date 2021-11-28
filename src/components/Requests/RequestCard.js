import React from 'react';
import { Button, Card,Label,Icon} from 'semantic-ui-react'


const RequestCard = (props) => {

	return (
		
		
		<Card fluid>
		<Card.Content>
		 
		  <Card.Header>{ props.request.title }</Card.Header>
		  <Card.Meta > <Icon name= "map marker alternate" /> { props.request.location }</Card.Meta>
		  <Card.Description >
		  {(props.request.status === 'fulfilled') ? <span className="text-success">Fulfilled</span> : <span className="text-muted">Unfulfilled</span>}
		  </Card.Description>
          <Card.Description >
		  {(props.request.category === 'service') ? <Label color='red'    as='a' tag>  Service </Label> :<Label color='yellow' as='a' tag>  Material </Label> }
		  </Card.Description>
		</Card.Content>
		<Card.Content extra>
		  <div className='ui two buttons'>
			<Button color='blue'onClick={props.offer} data-toggle="modal" data-target="#poppedModal" >
			  Participate
			</Button>
			
		  </div>
		</Card.Content>
	  </Card>
	
		)
}

export default RequestCard