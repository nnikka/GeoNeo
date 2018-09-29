import React from "react"
import { withRouter  } from 'react-router-dom'
import { Card, Header } from 'semantic-ui-react'


class HomePage extends React.Component {
    render() {
        return (
            <div>
                <Header as="h1">Home Page</Header>
            </div>
        )
    }
}

export default withRouter(HomePage)
