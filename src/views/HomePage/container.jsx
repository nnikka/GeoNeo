import React from "react"
import { withRouter  } from 'react-router-dom'
import { Card, Header, Grid } from 'semantic-ui-react'
import CircularProgressbar from 'react-circular-progressbar';
import QRCode from 'qrcode.react'

class HomePage extends React.Component {
    render() {
        return (
            <div>
                <Header as="h1">Home Page</Header>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={1}/>
                        <Grid.Column width={7} style={{ textAlign: 'center' }}>
                            <div style={{ width: '300px', display: 'inline-block' }}>
                                <CircularProgressbar percentage={100} text={`${1000} GN`} />
                                <Header as="h2">Current Savings</Header>
                            </div>
                        </Grid.Column>
                        <Grid.Column width={7}>
                            <QRCode style={{ width: '300px', height: '300px'}} value="http://facebook.github.io/react/" />
                            <Header as="h2">Address</Header>
                        </Grid.Column>
                        <Grid.Column width={1}/>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default withRouter(HomePage)
