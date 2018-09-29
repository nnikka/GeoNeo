import React from "react"
import { withRouter  } from 'react-router-dom'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";
import { Grid, List, Header, Card, Button } from 'semantic-ui-react'

class CheckIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentLang: 41.717578,
            currentLong: 44.7850189
        }
    }

    render() {
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
              defaultZoom={18}
              defaultCenter={{ lat: this.state.currentLang, lng: this.state.currentLong }}
            >
              <Marker
                position={{ lat: this.state.currentLang, lng: this.state.currentLong }}
              />
            </GoogleMap>
        ))

        return (
            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Header as="h1">Current Location</Header>
                            <MapWithAMarker
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDBoRDE4PRHBZIR5F2u9sJVeLL9aBzk44c&ver=4.9.8.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `50vh` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            />
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <Header as="h1">&nbsp;</Header>
                            <Card fluid>
                                <Card.Content header='Check in at' />
                                <Card.Content>
                                    <Header color="violet" as="h1">"GeoLab"</Header>
                                    <Header as="h1">And Get 1000 GNEO</Header>
                                </Card.Content>
                                <Card.Content>
                                    <Button color="green">
                                        Check In
                                    </Button>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default withRouter(CheckIn)
