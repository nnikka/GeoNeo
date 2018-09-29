import React from "react"
import { withRouter  } from 'react-router-dom'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";
import { Grid, List, Header } from 'semantic-ui-react'


const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: -34.397, lng: 150.644 }}
    >
      <Marker
        position={{ lat: -34.397, lng: 150.644 }}
      />
    </GoogleMap>
));

const txtAlign = {
    textAlign: "left"
}

class Places extends React.Component {
    constructor(props) {
        super(props)
       
        }

    render() {
        return (
            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={12}>
                        <MapWithAMarker
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDBoRDE4PRHBZIR5F2u9sJVeLL9aBzk44c&ver=4.9.8.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `calc(100vh - 170px)` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                        </Grid.Column>
                        
                        <Grid.Column width={4}>
                            <Header as="h1">Places</Header>
                            <List divided relaxed>
                                <List.Item>
                                    <List.Icon name='marker' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header style={txtAlign}>GeoLab</List.Header>
                                        <List.Description style={txtAlign}>1000 GNEO</List.Description>
                                    </List.Content>
                                </List.Item>
                                <List.Item>
                                    <List.Icon name='marker' size='large' verticalAlign='middle' />
                                    <List.Content>
                                        <List.Header style={txtAlign}>GeoLab</List.Header>
                                        <List.Description style={txtAlign}>1000 GNEO</List.Description>
                                    </List.Content>
                                </List.Item>
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default withRouter(Places)
