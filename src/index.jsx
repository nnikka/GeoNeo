import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom"

import { create as createJss } from "jss";
import camelCase from "jss-camel-case";
import globalStyles from "jss-global";
import vendorPrefixer from "jss-vendor-prefixer";
import { JssProvider } from "react-jss";

import App from "./views/App";
import 'semantic-ui-css/semantic.min.css';
const jss = createJss();
jss.use(vendorPrefixer(), camelCase(), globalStyles());

ReactDOM.render(
  <JssProvider jss={jss}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </JssProvider>,
  document.getElementById("root")
);
