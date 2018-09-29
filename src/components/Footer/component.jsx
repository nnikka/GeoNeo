import React from 'react'
import { Card, Header } from 'semantic-ui-react'

const style = {
    position: 'fixed',
    bottom: '0'
}

const divider = {
    display: 'block',
    width:' 100%',
    paddingTop: "12px",
    paddingBottom: "12px"
}

const marginless = {
    margin: 0
}

export default class Footer extends React.Component {
    render() {
        return (
            <Card fluid style={style}>
                <div style={divider} />
                <Header as="h5" style={marginless}>© 2018 GeoLab</Header>
                <div style={divider} />
            </Card>
        )
    }
}