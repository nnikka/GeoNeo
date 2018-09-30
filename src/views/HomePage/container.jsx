import React from "react"
import { withRouter  } from 'react-router-dom'
import { Card, Header, Grid } from 'semantic-ui-react'
import CircularProgressbar from 'react-circular-progressbar';
import QRCode from 'qrcode.react'
import PropTypes from "prop-types";
import { injectNOS, nosProps } from "@nosplatform/api-functions/lib/react";
import Constants from './../../constants.json'

class HomePage extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            address: "NOT YET",
            quantity: 0
        }
    }

    componentDidMount() {
        this.props.nos.getAddress()
        .then((address) => {
            this.setState({address: address})
            this.props.nos.testInvoke({ scriptHash: Constants.scriptHash, operation: "balanceOf", args: [address] })
            .then(resp => {
                const qnt = parseInt("0x"+resp.stack[0].value)
                if (qnt.toString() !== 'NaN' && qnt.toString()) {
                    this.setState({quantity: qnt})
                }
            })
            .catch(err => {
                console.log(err.message)
            })
        })
        .catch((err) => {
            console.log(err.message)
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
        return (
            <div>
                <Header as="h1">Home Page</Header>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={1}/>
                        <Grid.Column width={7} style={{ textAlign: 'center' }}>
                            <div style={{ width: '300px', display: 'inline-block' }}>
                                <CircularProgressbar percentage={100} text={`${this.state.quantity} GN`} />
                                <Header as="h2">Current Savings</Header>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <QRCode style={{ width: '300px', height: '300px'}} value={this.state.address} />
                            <Header as="h2">Address</Header>
                        </Grid.Column>
                        <Grid.Column width={1}/>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

HomePage.propTypes = {
    nos: nosProps.isRequired
};
  
export default injectNOS(withRouter(HomePage));
