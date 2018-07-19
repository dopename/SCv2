import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import Discovery from "./Discovery";
import SolutionProvider from "./SolutionProvider";
import Login from "./Login";
import Register from "./Register";

import { Button, Nav, Navbar, NavbarBrand, NavItem } from "reactstrap";
import {main, auth} from "../actions/index"
import {connect} from "react-redux";

class Main extends Component {

	componentDidMount() {
		this.props.getScreenData(window.screen.width, window.screen.height);
		this.props.loadUser();
	}

	render() {
		console.log(this.props.auth);
		return (
			<div>
				<BrowserRouter>
					<div className="h-100">
						<div className="container-fluid">
							<div className="row mb-2">
								<div className="col-12 px-0">
									<Navbar color="dark" dark expand="lg">
										<NavbarBrand className="text-primary" href="/"><h3><i className="fa fa-globe"></i></h3></NavbarBrand>
										<Nav className="ml-auto" navbar>
											<NavItem>
												<Link className="list-inline-item mx-2" to="/">Home</Link>
											</NavItem>
											<NavItem>
												<Link className="list-inline-item mx-2" to="/discovery">Discover</Link>
											</NavItem>
											<NavItem>
												{this.props.auth.isAuthenticated ? (
													<p className="list-inline-item pointer-hand text-primary mx-2" onClick={() => this.props.logout()}>Logout</p>)
													 : (
													 <Link className="list-inline-item mx-2" to="/login">Login</Link>)}
											</NavItem>
										</Nav>
									</Navbar>
								</div>
							</div>
						</div>
						<Switch>
							<Route exact path="/" component={Initial} />
							<Route path="/discovery" render= { () => <Discovery /> } />
							<Route exact path="/login" component={Login} />
							<Route exact path="/register" component={Register} />
							<Route path="/provider/:providerPK" component={SolutionProvider} />
						</Switch>
					</div>
				</BrowserRouter>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		screen_height:state.main.screen_height,
		screen_width:state.main.screen_width,
		auth: state.auth,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getScreenData: (width, height) => {
			dispatch(main.getScreenData(width, height));
		},
		logout: () => {
			return dispatch(auth.logout())
		},
	    loadUser: () => {
	      return dispatch(auth.loadUser());
	    },
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

class Initial extends Component {
	render() {
		console.log(this.props);
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