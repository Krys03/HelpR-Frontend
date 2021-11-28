import React from 'react'
import { connect } from 'react-redux'
import MessageBox from './MessageBox'
import { Message, Icon } from 'semantic-ui-react'


const MessagePopped = (props) => {

  return (

    <Message color='blue'>
    
    <h4><span className="text-muted"></span> { props.request.title }</h4>
    <p>
      <span className="text-muted"><Icon name ='user' /> </span>{ props.request.user_full_name }
    </p>
    <p>
      <span className="text-muted"><Icon name='arrow alternate circle right' /> Request:</span> { props.request.description }
    </p>
   <MessageBox request={props.request} message={false}/>

</Message>

    )
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.current_user
  }
}

export default connect(mapStateToProps)(MessagePopped)