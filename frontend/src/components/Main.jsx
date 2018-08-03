import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import Discovery from "./Discovery";
import SolutionProvider from "./SolutionProvider";
import Login from "./Login";
import Register from "./Register";
import SeekerProfile from "./SeekerProfile";
import ProviderProfile from "./ProviderProfile";
import SeekerSettings from "./SeekerSettings";

import "./Main.css"

import { Button, Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavLink } from "reactstrap";
import {main, auth, seeker_account, discovery} from "../actions/index"
import {connect} from "react-redux";

class Main extends Component {

	componentDidMount() {
		this.props.getScreenData(window.screen.width, window.screen.height);
		this.props.listIndustries();
		this.props.loadUser();
	}

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			if (this.props.auth.isUpdated === true) {
				this.props.loadUser();
			}
		}
	}

	render() {
		console.log(this.props.auth);
		return (
			<div>
				<BrowserRouter>
					<div className="h-100">
						<TopNav logout={this.props.logout} auth={this.props.auth} mobile={this.props.mobile} toggleSettings={this.props.toggleSettings} />
						<Switch>
							<Route exact path="/" render= { () => <Initial screen_width={this.props.mobile.screen_width} screen_height={this.props.mobile.screen_height} /> } />
							<Route path="/discovery" render= { () => <Discovery /> } />
							<Route exact path="/login" component={Login} />
							<Route exact path="/register" component={Register} />
							<Route path="/provider/:providerPK" component={SolutionProvider} />
							<Route path="/profile/seeker" component={SeekerProfile} />
							<Route path="/profile/provider" component={ProviderProfile} />
						</Switch>
						{this.props.auth.isAuthenticated ? (
							<SeekerSettings 
								industries={this.props.industries} 
								open={this.props.settingsOpen} 
								toggle={this.props.toggleSettings} 
								seeker={this.props.auth.user.custom_user.seeker_account}
								onSubmit={this.props.updateSeeker}
								token={this.props.auth.token}
								mobile={this.props.mobile}
							/>) : null }
					</div>
				</BrowserRouter>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		mobile:state.main,
		auth: state.auth,
		industries:state.discovery.industries,
		settingsOpen:state.main.settingsOpen,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		getScreenData: (width, height) => {
			dispatch(main.getScreenData(width, height));
		},
		logout: () => {
			return dispatch(auth.logout());
		},
	    loadUser: () => {
	      	return dispatch(auth.loadUser());
	    },
		updateSeeker: (pk, seekerData, token) => {
			dispatch(seeker_account.updateSeeker(pk, seekerData, token));
		},
		listIndustries: () => {
			dispatch(discovery.listIndustries());
		},
		toggleSettings: () => {
			dispatch(main.toggleSettings());
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);

class TopNav extends Component {
	constructor(props) {
		super(props)

		this.state = {
			collapsed: false,
		}

		this.toggleNavbar = this.toggleNavbar.bind(this);
	}
		
	toggleNavbar() {
		this.setState({collapsed:!this.state.collapsed});
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-12 px-0">
						<Navbar color="dark" dark expand="lg">
							<NavbarBrand className="text-primary" href="/"><h3><i className="fa fa-globe"></i></h3></NavbarBrand>
							<NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
							<Collapse isOpen={this.state.collapsed} navbar>
								<Nav className="ml-auto" navbar>
									<NavItem>
										<NavLink href="/">Home</NavLink>
									</NavItem>
									<NavItem>
										<NavLink href="/discovery">Discover</NavLink>
									</NavItem>
										{this.props.auth.isAuthenticated ? (
											<NavItem>
												<i className="fa fa-cogs" onClick={this.props.toggleSettings}></i>
											</NavItem>
										) : null}

										{this.props.auth.isAuthenticated ? (
											<UncontrolledDropdown nav inNavbar>
												<DropdownToggle nav caret>
													Welcome back, {this.props.auth.user.username}
												</DropdownToggle>
												<DropdownMenu right>
													<DropdownItem>
														<Link className="list-inline-item mx-2" to="/profile/seeker">Seeker Profile</Link>
													</DropdownItem>
													<DropdownItem>
														<Link className="list-inline-item mx-2" to="/profile/provider">Provider Profile</Link>
													</DropdownItem>
													<DropdownItem>
														<p className="list-inline-item pointer-hand text-primary mx-2" onClick={() => this.props.logout()}>Logout</p>
													</DropdownItem>
												</DropdownMenu>
											</UncontrolledDropdown> )
											 : (
											 <NavItem>
											 	<NavLink href="/login">Login</NavLink>
											</NavItem>)
										}
								</Nav>
							</Collapse>
						</Navbar>
					</div>
				</div>
			</div>
		)
	}
}

class Initial extends Component {
	render() {
		var image_height = (0.50 * this.props.screen_height).toString() + "px";
		return (
			<div className="container-fluid custom-h-100">
				<div id="intro" className="text-center custom-h-100">
					<div className="row custom-h-75" id="home-content1">
						<div className="col-12 custom-h-75">
							<h1 className="text-white mt-3 display-1">Bringing clarity to innvovation</h1>
						</div>
						<div className="col-12 custom-h-25">
							<div className="row">
								<div className="col-lg-8">
									<div className="col-lg-10 m-auto">
										<h1 className="text-left text-white ml-3">Solution Connect simplifies technology so you can focus on what matters most you you.</h1>
									</div>
								</div>
								<div className="col-lg-4">
									<div className='col-lg-6 m-auto custom-h-100'>
										<Link to="/discovery"><Button className="btn-block custom-h-100" color="light">Explore Solutions</Button></Link>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-12 mb-4 mt-2">
						<h1 className="text-center">Connecting businesses with solutions to help them succeed</h1>
					</div>
					<div className="row custom-h-25 mb-2">
						<div className="col-lg-8 custom-h-100 text-left">
							<div className="col-12">
								<h2>Technological innovation is accelerating at an exponential rate, and it can be difficult to keep up with the developments that matter to you.</h2>
							</div>
							<br />
							<div className="col-12 mt-3">
								<h2>Solution Connect demystifies cutting edge technologies to help you find and connect with the solutions you need.</h2>
							</div>
						</div>
						<div className="col-lg-4 custom-h-100 text-center">
							<img className="m-auto custom-h-100" style={{backgroundPosition:"center", backgrondSize:"contain", width:"auto"}} src="/media/home-2.png" alt="Solution man" />
						</div>
					</div>
				</div>
			</div>
		)
	}
}