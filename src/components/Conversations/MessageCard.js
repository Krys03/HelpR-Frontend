import React from 'react'
import AllMessages from './AllMessages'
import { Segment, Button, Header, Icon} from 'semantic-ui-react'



const MessageCard = (props) => {

	return (

	<Segment color='blue'>
		
			
				<div onClick={props.showMessages} className="">
					
						<Header as='h4'> {props.conversation.subject} </Header>
						<span className="text-muted ml-1">{props.conversation.status}</span>
					
					<Button type="button"  inverted color='blue' style={{marginBottom : 5 }}><Icon name='envelope'/>Show Conversation</Button>
					
				</div>
                <AllMessages messages={props.messages} />
		
	
	</Segment>
	
		)
}


export default MessageCard