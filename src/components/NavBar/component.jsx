import React from 'react'
import { Menu, Icon } from "semantic-ui-react"
import { withRouter } from "react-router-dom"

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {activeItem: null}
        this.redirect = this.redirect.bind(this)
    }
    redirect(path) {
        this.props.history.push("/"+ path)
    }
    render() {
        const { translate } = this.props
        return (
            <Menu>
                <Menu.Item onClick={() => this.redirect("")} name='HomePage' active={this.activeItem === 'HomePage'}>
                    <Icon circular inverted color='green' name='home'></Icon>
                    Home
                </Menu.Item>
                <Menu.Item onClick={() => this.redirect("check_in")} name='CheckIn' active={this.activeItem === 'CheckIn'}>
                    <Icon circular inverted color='green' name='marker'></Icon>
                    Check In
                </Menu.Item>
                <Menu.Item onClick={() => this.redirect("places")} name='Places' active={this.activeItem === 'Places'}>
                    <Icon circular inverted color='green' name='map'></Icon>
                    Places
                </Menu.Item>
                <Menu.Item onClick={() => this.redirect("withdraw")} name='Withdraw' active={this.activeItem === 'Withdraw'}>
                    <Icon circular inverted color='green' name='chain'></Icon>
                    Withdraw
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(NavBar)