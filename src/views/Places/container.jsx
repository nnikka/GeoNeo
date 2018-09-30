import React from "react"
import { withRouter  } from 'react-router-dom'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";
import { Grid, List, Header, Popup } from 'semantic-ui-react'
import PropTypes from "prop-types";
import { injectNOS, nosProps } from "@nosplatform/api-functions/lib/react";
import Constants from './../../constants.json'
import axios from 'axios'

const txtAlign = {
    textAlign: "left"
}

class Places extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            locations: [],
            coords: [],
            prices: {

            },
            people: {

            }
        }
        this.hexToString = this.hexToString.bind(this)
    }

    componentDidMount() {
        this.props.nos.testInvoke({ scriptHash: Constants.scriptHash, operation: "all_places", args: [] })
        .then((script) => {
            const hex = script.stack[0].value
            let str = this.hexToString(hex)
            let arr = str.split("**");
            this.setState({locations: arr})
            arr.map(item => {
                axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + item + "&key=AIzaSyA2WNFQTO0gEHWSwA8VhnYDClRFmzvPMJI").then(resp => {
                    let coord = resp.data.results[0].geometry.location
                    this.setState(prevState => ({
                        coords: [...prevState.coords, coord]
                    }))
                })
                this.props.nos.testInvoke({ scriptHash: Constants.scriptHash, operation: "get_place_token", args: [item] })
                .then(resp => {
                    this.setState(prevState => ({
                        prices: {...prevState.prices, [item]: parseInt("0x"+resp.stack[0].value)}
                    }))
                })
                this.props.nos.testInvoke({ scriptHash: Constants.scriptHash, operation: "get_place_checkin", args: [item] })
                .then(resp => {
                    this.setState(prevState => ({
                        people: {...prevState.people, [item]: parseInt("0x"+resp.stack[0].value)}
                    }))
                })
            })
        })
        .catch((err) => {
            console.log(`Error: ${err.message}`)
        })
    }

    hexToString = (hex) => {
        var string = '';
        for (var i = 0; i < hex.length; i += 2) {
          string += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        }
        return string;
    }

    render() {
        const MapWithAMarker = withScriptjs(withGoogleMap(props =>
            <GoogleMap
              defaultZoom={16}
              defaultCenter={{ lat: 41.717578, lng: 44.7850189 }}
            >
            {
                this.state.coords.map((item, i) => {
                    return (
                        <Marker
                            key={i}
                            position={{ lat: item.lat, lng: item.lng }}
                        />
                    )
                })
            }
            </GoogleMap>
        ));

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
                                {
                                    this.state.locations.map(item => {
                                        return (
                                            <List.Item key={item}>
                                                <List.Icon name='marker' size='large' verticalAlign='middle' />
                                                <List.Content>
                                                    <List.Header style={txtAlign}>{item}</List.Header>
                                                    <List.Description style={txtAlign}>
                                                    {this.state.prices[item] ? this.state.prices[item] : ""} &nbsp; GNEO
                                                    &nbsp; | {(this.state.prices[item] && this.state.prices[item].toString() !== 'NaN') ? this.state.people[item] : ""} person
                                                    </List.Description>
                                                </List.Content>
                                            </List.Item>
                                        )
                                    })
                                }
                            </List>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

Places.propTypes = {
    nos: nosProps.isRequired
};
  
export default injectNOS(withRouter(Places));
