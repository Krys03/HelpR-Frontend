import React from 'react';
import { Icon, Table} from 'semantic-ui-react'

const RequestRow = (props) => {
	let activeButton
	if (props.showActive) {
		let requestTimeUp = new Date(new Date(props.request.start_date).getTime() + 86400000)
		let now = new Date()
		if (props.request.start_count === 5 && now <= requestTimeUp && props.request.status !== 'fulfilled') {
			activeButton = <span className="">{ (props.request.active) ? <span className="text-shrink text-success">Active</span> : <span className="text-shrink text-warning">WIP for 24hrs</span> }
			</span> 
		} else { 
			activeButton = <span className="text-primary text-shrink" 
				onClick={props.active}>{ (props.request.active) ?  <span className="text-success">Active</span> :  <span className="text-danger">Inactive</span> }
			</span> 
		}
	}
	return (

		
            
            <Table.Row >
            <Table.Cell>{ props.request.id }</Table.Cell>
            <Table.Cell>{(props.request.category === 'service') ? 'Service' : 'Material'}</Table.Cell>
            <Table.Cell>{ props.request.title }</Table.Cell>
            <Table.Cell onClick={props.status}>{(props.request.status === 'fulfilled') ? <span >Fulfilled</span> : <span >Unfulfilled </span>} <Icon name='spinner'/></Table.Cell>
            <Table.Cell>{activeButton} <Icon name='hand point left' onClick={props.active} /> </Table.Cell>
            <Table.Cell>{props.request.description}</Table.Cell>
            <Table.Cell type="button" onClick={props.delete} className="btn col-1 "><Icon name='trash alternate outline' inverted alt="Recycle Bin"/></Table.Cell>
            </Table.Row>
            
        


		
		
		)
}

export default RequestRow