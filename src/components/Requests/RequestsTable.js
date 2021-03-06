import React from 'react'
import { connect } from 'react-redux'
import { Container, Table } from 'semantic-ui-react'
import { setRequest, 
    deleteRequest, 
    updateRequestActive, 
    updateRequestStatus, } from '../../tools/actions'
import RequestRow from './RequestRow'

class RequestsTable extends React.Component {

    componentDidMount = () => {
        this.props.getRequest()
      }
    
    
      deleteRequest = (arrayIndex) => {
        let requests = [...this.props.currentUserRequests]
        let requestId = requests[arrayIndex].id
        requests.splice(arrayIndex, 1)
        this.props.deleteRequest(requests, requestId)
      } 
    
    
      stateHandler = (id) => {
        let active
    
        let requests = this.props.currentUserRequests.filter( request => { 
         if (request.id === id) {
          request.active = active = (request.active === 1) ? 0 : 1
         } 
         return request
       }) 
        this.props.switchActive({id: id, requests: requests, active: active })
      } 
    
      statusHandler = (id) => {
        let status
        let requests = this.props.userRequest ? this.props.currentUserRequests : this.props.requests
    
        requests = requests.filter( request => { 
         if (request.id === id) {
          request.status = status = (request.status === 'unfulfilled') ? 'fulfilled' : 'unfulfilled'
         } 
         if (!this.props.userRequest && request.status === 'fulfilled') {
          return null
         }
         return request
       }) 
        this.props.switchStatus({id: id, requests: requests, status: status, user: this.props.userRequest })
      }
      
    
      render(props) {
        let requests = (this.props.userRequest) ? this.props.currentUserRequests : this.props.requests
      
        requests = requests.map((request, index) => {
                return (
                  <RequestRow
                  key={request.id}
                  status={ this.statusHandler.bind(this, request.id) } 
                  showActive={true}
                  active={ this.stateHandler.bind(this, request.id) }  
                  deleteButton={this.props.userRequest}
                  delete={ this.deleteRequest.bind(this, index) }
                  request={request} />
                )
            })
    
        if(requests.length === 0 && this.props.userRequest) {
          return (
            <div className="col-12 text-center">
              You haven't added any requests yet, feel free to do so if you need any help.
            </div>
            )
        }
    
        return(

          <Container style={{marginTop : 120}}>
            
          <Table color='blue' inverted>
            <Table.Header>
          <Table.Row>
          <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell>State</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Options</Table.HeaderCell>
                  </Table.Row>
              </Table.Header>
              
              <Table.Body>
                {requests}
                </Table.Body>
                </Table>

            

                
                
              
          </Container>
              
            
          )
      }
    }


const mapStateToProps = (state) => {
    return {
      requests: state.requests,
      currentUserRequests: state.currentUserRequests,
    } 
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getRequest: (val) => { dispatch(setRequest(val)) },
      deleteRequest: (requests, requestId) => { dispatch(deleteRequest(requests, requestId)) },
      switchActive: (requestActive) => { dispatch(updateRequestActive(requestActive)) },
      switchStatus: (requestStatus) => { dispatch(updateRequestStatus(requestStatus)) },
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(RequestsTable)