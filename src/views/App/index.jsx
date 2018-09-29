import React from "react";
import injectSheet from "react-jss";
import PropTypes from "prop-types";
import { Route } from "react-router-dom"

import NavBar from "./../../components/NavBar/component"
import Footer from "./../../components/Footer/component"

import Header from "./../../components/Header";
// import NOSActions from "./../../components/NOSActions";
 
import HomePage from '../HomePage/container'
import Places from '../Places/container'
import CheckIn from '../CheckIn/container'

const styles = {
  "@import": "react-circular-progressbar/dist/styles.css",
  "@import": "https://fonts.googleapis.com/css?family=Source+Sans+Pro",
  "@global html, body": {
    fontFamily: "Source Sans Pro",
    margin: 0,
    padding: 0,
    backgroundColor: "#ffffff"
  },
  App: {
    textAlign: "center"
  },
  intro: {
    fontSize: "large"
  },
  lineBreak: {
    width: "75%",
    borderTop: "1px solid #333333",
    margin: "32px auto"
  }, 
  bodyCont: {
    position: "fixed",
    top: "80px",
    width: "100%",
    height: "calc(100vh - 160px)",
    overflow: "auto",
    overflowX: "hidden"
  }
};

const App = ({ classes }) => (
  <div className={classes.App}>
    {/* <Header title="A nOS dApp starter-kit!" /> */}
    {/* <p className={classes.intro}>
      To get started, edit <code>src/views/App/index.js</code> and save to reload.
    </p>
    <p className={classes.intro}>Or test out the following demo functions!</p>
    <hr className={classes.lineBreak} />
    <NOSActions /> */}
    <NavBar />
    <div style={styles.bodyCont}>
      <Route path="/" exact component={HomePage} />
      <Route path="/places" exact component={Places} />
      <Route path="/check_in" exact component={CheckIn} />
    </div>
    <Footer />
  </div>
);

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(App);
