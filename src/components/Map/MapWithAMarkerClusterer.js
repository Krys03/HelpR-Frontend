import React from "react"
import { compose, withProps, withStateHandlers } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { MarkerClusterer } from  'react-google-maps/lib/components/addons/MarkerClusterer';
import { connect } from 'react-redux'
import { setModal } from '../../tools/actions'
import { Label, Icon, Card} from 'semantic-ui-react'




const MapWithAMarkerClusterer = compose(
  withStateHandlers(() => ({
   isOpen: false,
 }),

  {
    onToggleOpen: ({isOpen}) => () => ({
      isOpen: !isOpen
    }),
    showInfo: ({isOpen}) => (i) => ({
      isOpen: true, 
      showInfoIndex: i
    })
  }),
  withProps({
    isMarkerShown: true,
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDVx33oZ2CvlKkXSZ7GMCS3kQwC6bDILVE",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    ref={props.onMapMounted}
    onIdle={props.handleMapChanged}
    defaultZoom={13}
    defaultCenter={{ lat: props.currentPosition.lat, lng: props.currentPosition.lng  }}
  >
    <MarkerClusterer
  onClick={props.onMarkerClustererClick}
  averageCenter
  enableRetinaIcons
  gridSize={60}
  >
  {props.markers.map((marker, i) => (
    <Marker
    onClick={() => {props.showInfo(marker.id )}}
    key={marker.id}
    position={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }}
    icon= {(marker.category === 'service') ? {url: "https://cdn-icons-png.flaticon.com/32/929/929426.png"} : {url: "https://cdn-icons-png.flaticon.com/32/727/727606.png"}}
   
    >
    { props.showInfoIndex === marker.id && props.isOpen
      && <InfoWindow onCloseClick={() => props.onToggleOpen()} 
      >
    <Card>
    <Card.Content>
    <div>
    <Card.Header> {marker.title}</Card.Header>
    <div className="mb-2">
    <Card.Meta > <span className="font-weight-bold text-dark mr-1"><Icon name ='map marker alternate' /> { marker.location }</span> </Card.Meta >
    <Card.Meta ><span className="text-muted mr-1"> { marker.status }</span></Card.Meta >
    <Card.Meta > <span className=""> {(marker.category === 'service') ? <Label color='red' as='a' tag>  Service </Label>: <Label color='yellow' as='a' tag>  Material </Label>}</span> </Card.Meta >
    </div>
    <div className="text-primary mb-2">{marker.description}</div>
    <button onClick={() => props.setModal({open: true, type: 'conv', data: marker})} className="btn btn-primary mb-1" data-toggle="modal" data-target="#poppedModal">I'm in !</button>
    </div>
    </Card.Content>
    </Card>

    </InfoWindow>}
    </Marker>
    ))}
  </MarkerClusterer>
  </GoogleMap>
);




const mapDispatchToProps = (dispatch) => {
  return {
    setModal: (val) => { dispatch(setModal(val)) },
  }
}




export default connect(null, mapDispatchToProps)(MapWithAMarkerClusterer)

