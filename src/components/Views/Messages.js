import React from 'react'
import { connect } from 'react-redux'
import MessageCard from './../Conversations/MessageCard'
import { getConversations, getMessages } from './../../tools/actions'
import {  Header, Icon} from 'semantic-ui-react'

class Messages extends React.Component {

	componentDidMount () {
		this.props.viewConversations()
	  }
	
	
	  viewMessages = (convId) => {
		  this.props.viewMessages(convId)
	  }
	

	render () {

		let messageCards = <h3 className="text-center">No Messages Yet</h3>

		if (this.props.conversations.length > 0) {
			messageCards = this.props.conversations.map(conversation => {
				return <MessageCard 
					key={conversation.id} 
					conversation={conversation} 
					messages={this.props.messages.filter( msg => msg.conversation_id === conversation.id)}
					showMessages={this.viewMessages.bind(this, conversation.id)} />
			})
		}

							
	return(

		 
			<div className="container" >
				<div className="row">
					
					<Header  as='h2' block style={{ marginTop : 70 }} color='blue'><Icon name= "chat" /> Messages</Header>
					
		    
					<div className="col-12 col-md-10 offset-md-1 p-0 m-0">
						{ messageCards }
					</div>
				</div>
			</div>
			
		)
	}
}

const mapStateToProps = (state) => {
	return {
		conversations: state.conversations,
		messages: state.messages
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		viewConversations: () => { dispatch(getConversations()) },
		viewMessages: (convId) => { dispatch(getMessages(convId)) }
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages)