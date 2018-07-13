import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Discovery from "./Discovery";
import { Button } from "reactstrap";

export default class Main extends Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={Initial} />
						<Route path="/discovery/" render= { () => <Discovery /> } />
					</Switch>
				</BrowserRouter>
			</div>
		)
	}
}


class Initial extends Component {
	render() {
		return (
			<div className="container">
				<div id="intro" className="text-center">
					<h1>Welcome line will go here</h1>
					<p>I'm sure there will be more text too</p>
				</div>
			</div>
		)
	}
}