import React from "react"
import { withRouter  } from 'react-router-dom'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";
import { Grid, List, Header, Card, Button, Modal, Icon } from 'semantic-ui-react'
import PropTypes from "prop-types";
import { injectNOS, nosProps } from "@nosplatform/api-functions/lib/react";
import Constants from './../../constants.json'

class CheckIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentLang: 41.717578,
            currentLong: 44.7850189,
            modalLog: false,
        }
    }

    handleChackIn = () => {
        this.props.nos.getAddress()
        .then((address) => {
            this.props.nos.invoke({ scriptHash: Constants.scriptHash, operation: "make_check_in", args: ["Tbilisi, GeoLab", address] })
            .then((script) => {
                console.log(script)
                // if (script.stack[0].value == 1) {

                // }
                this.setState({modalLog: true})
            })
            .catch((err) => {
                console.log(`Error2: ${err}`)
            })
        })
        .catch((err) => {
            alert(err.message)
        });
    }

    handleClose = () => this.setState({modalLog: false})

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
                                    <Header as="h1">And Get 100 GNEO</Header>
                                </Card.Content>
                                <Card.Content>
                                    <Button color="green" onClick={() => this.handleChackIn()}>
                                        Check In
                                    </Button>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>

                <Modal open={this.state.modalLog}>
                    <Header icon='check' content='You checked in successfully' />
                    <Modal.Actions>
                        <Button color='green' onClick={this.handleClose} inverted>
                            <Icon name='checkmark' /> Got it
                        </Button>
                    </Modal.Actions>
                </Modal>

            </div>
        )
    }
}

CheckIn.propTypes = {
    nos: nosProps.isRequired
};
  
export default injectNOS(withRouter(CheckIn));
