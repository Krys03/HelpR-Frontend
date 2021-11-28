import React from 'react'
import MessageBox from './MessageBox'
import { Icon, Comment} from 'semantic-ui-react'


const allMessages = (props) => {
  return(
    <div className="">
    {
     props.messages.length > 0  ? <MessageBox start={true} messages={props.messages} /> : null
    }
    {
      props.messages.map( msg => ( 
        <Comment.Group>
        <Comment>
        <div key={msg.id}  className="media">
          
          <div className="text-primary"><span><Icon  name='clock outline'/> {msg.created_at.replace('T', ' at ').substring(0, 19)}, <br/> <Icon name='user circle' /> {msg.from_full_name} said: {'\u00A0'}</span></div>
            <div className=""><br/>{msg.body}</div>
          
        </div>
        </Comment>
        </Comment.Group>
      ))
    }
    
    </div>
    )
}

export default allMessages