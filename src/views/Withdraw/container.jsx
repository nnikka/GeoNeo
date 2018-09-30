import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Header, Grid, Input, Button, Separator } from 'semantic-ui-react'
import PropTypes from "prop-types";
import { injectNOS, nosProps } from "@nosplatform/api-functions/lib/react";
import Constants from './../../constants.json'

class Withdraw extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            withdraw: {
                address: "",
                value: 0
            },
            get: {
                address: "",
                value: 0
            }
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleWithdraw = () => {
        console.log("movida")
        this.props.nos.getAddress()
        .then((address) => {
            this.props.nos.invoke({ scriptHash: Constants.scriptHash, 
                                    operation: "transfer", 
                                    args: [address, Constants.owner, this.state.withdraw.value] })
            .then((resp) => {
                console.log(resp)
            })
            .catch(err => {
                console.log(err.message)
            })
        })
        .catch(err => {
            console.log(err.message)
        })
    }

    async handleChange(event) {
        const eventName = event.target.name
        if (eventName === 'WithdrawAddress') await this.setState({withdraw: {...this.state.withdraw, address: event.target.value}})
        if (eventName === 'WithdrawValue') await this.setState({withdraw: {...this.state.withdraw, value: event.target.value}})
        if (eventName === 'getAddress') await this.setState({get: {...this.state.get, address: event.target.value}})
        if (eventName === 'getValue') await this.setState({get: {...this.state.get, value: event.target.value}})
    }

    render() {
        return (
            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Header as="h1">Withdraw</Header>
                            <Input name="WithdrawAddress" placeholder='To...' 
                                   value={this.state.withdraw.address} 
                                   type="text" 
                                   onChange={this.handleChange} />
                            <br/>
                            <br/>
                            <Input placeholder='Value...'
                                   name="WithdrawValue"
                                   value={this.state.withdraw.value} 
                                   type="text" 
                                   onChange={this.handleChange} />
                            <br/>
                            <br/>
                            <Button onClick={this.handleWithdraw}>Send</Button>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Header as="h1">Get Tokens</Header>
                            <Input name="GetAddress" placeholder='To...' 
                                   value={this.state.get.address} 
                                   type="text" 
                                   onChange={this.handleChange} />
                            <br/>
                            <br/>
                            <Input placeholder='Value...'
                                   name="GetValue"
                                   value={this.state.get.value} 
                                   type="text" 
                                   onChange={this.handleChange} />
                            <br/>
                            <br/>
                            <Button>Get</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

Withdraw.propTypes = {
    nos: nosProps.isRequired
};
  
export default injectNOS(withRouter(Withdraw));