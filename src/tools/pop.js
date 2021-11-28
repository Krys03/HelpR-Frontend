import React from  'react'
import { connect } from 'react-redux'
import { setModal } from './actions'
import MessagePopped from './../components/Conversations/MessagePopped'
import { Message,Button } from 'semantic-ui-react'

const Modal = (props) => {

  return(

    
    <div>

    { props.modal.open ? 

 
      <section className="modal fade" id="poppedModal" tabIndex="-1" role="dialog" aria-labelledby="poppedModalLabel" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <Message className="modal-content" >
          <div className="modal-body">
          <MessagePopped request={props.modal.data} />
          </div>
          <Button type="button" className="btn btn-secondary" data-dismiss="modal">Close</Button>
        </Message>
      </div>
      
    </section>
    
       : null }
      </div>
      
    )
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal
  } 
}

const mapDispatchToProps = (dispatch) => {
  return {
    setModal: (val) => { dispatch(setModal(val)) }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Modal)