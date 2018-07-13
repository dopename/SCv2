import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import Discovery from "./Discovery";
import { Button } from "reactstrap";
import {main} from "../actions/index"
import {connect} from "react-redux";

class Main extends Component {

	componentDidMount() {
		this.props.getScreenData(window.screen.width, window.screen.height);
	}

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

const mapStateToProps = state => {
	return {
		screen_height:state.main.screen_height,
		screen_width:state.main.screen_width
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getScreenData: (width, height) => {
			dispatch(main.getScreenData(width, height));
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

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