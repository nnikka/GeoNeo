import React from 'react'
import { withRouter } from 'react-router-dom'
import { Card, Header, Grid, Input, Button, Separator } from 'semantic-ui-react'
import PropTypes from "prop-types";
import { injectNOS, nosProps } from "@nosplatform/api-functions/lib/react";
import Constants from './../../constants.json'

class Withdraw extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Header as="h1">Withdraw</Header>
                            <Input placeholder='Get...' />
                            <br/>
                            <Button>Send</Button>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Header as="h1">Get Tokens</Header>
                            <Input placeholder='Withdraw...' />
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