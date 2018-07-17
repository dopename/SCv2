import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import Discovery from "./Discovery";
import SolutionProvider from "./SolutionProvider";

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
						<Route path="/discovery" render= { () => <Discovery /> } />
						<Route path="/provider/:providerPK" component={SolutionProvider} />
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
			<div className="container-fluid h-100">
				<div id="intro" className="text-center h-100">
					<div className="row">
						<div className="col-12">
							<h1>Welcome Friends</h1>
						</div>
					</div>
					<div className="row h-100" style={{borderTop:"solid black 1px"}}>
						<div className="col-lg-6 h-100 text-center pt-3" style={{backgroundColor:"#e6e6e6"}}>
							<h2>To your profile</h2>
							<div className="row">
								<div className="col-md-2">
								</div>
								<div className="col-md-8">
									<p className="px-3">Customize what content you subscribe to and stay up to date on the latest innovations.
									Your profile is a one-stop shop for innovative tech so you can maximize your efficiency.</p>
								</div>
								<div className="col-md-2">
								</div>
							</div>
						</div>
						<div className="col-lg-6 h-100 text-center pt-3" style={{borderLeft:"solid black 1px", backgroundColor:"#eef4fc"}}>
							<h2>To the Discovery Environment</h2>
							<div className="row">
								<div className="col-md-2">
								</div>
								<div className="col-md-8">
									<p className="px-3">Know you need something, but don't quite know what you're looking for?
									Head over to the discovery environment and see new technology in every industry imaginable</p>
								</div>
								<div className="col-md-2">
								</div>
							</div>
							<Button outline color="secondary" size="lg"><Link to="/discovery">Go Discover!</Link></Button>
						</div>
					</div>
				</div>
			</div>
		)
	}
}