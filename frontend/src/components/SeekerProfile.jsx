import React, { Component } from "react";
import {connect} from "react-redux";

import {seeker_account, discovery, solution_tiles, main} from "../actions/index";
import SeekerSettings from "./SeekerSettings";
import { Button, ButtonGroup } from "reactstrap";
import DumbTiles from "./dumb_components/DumbTiles"

class SeekerProfile extends Component {
	constructor(props) {
		super(props)

		this.state = {
			settingsOpen: false,
			view: "main",
		}

		this.toggleSettings = this.toggleSettings.bind(this);
		this.changeView = this.changeView.bind(this);
	}

	componentDidMount() {
		this.props.listSolutions();
		//this.props.listIndustries();
		//if (this.props.auth.user != null) {
		//	this.props.retrieveSeekerAccount(this.props.auth.user.custom_user.seeker_account);
		//}
	}

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			this.setState({view:"main"});
		}
	}

	toggleSettings() {
		this.setState({settingsOpen:!this.state.settingsOpen});
	}

	changeView(view) {
		this.setState({view:view});
	}

	render() {
		var bookmarks = [];
		var categoryFeed = [];
		var identityFeed = [];

		var scrollHeight = (0.75 * this.props.mobile.screen_height).toString() + "px"

		var allFeed = [];

		console.log(this.props)

		if (this.props.auth.isAuthenticated) {
			let seeker = {...this.props.auth.user.custom_user.seeker_account};
			this.props.solutions.map(solution => {
				let sAdded = false;
				if (seeker.bookmarks.map(e => e.pk).indexOf(solution.pk) > -1) {
						bookmarks.push(solution)
				}
				if (seeker.categories.length > 0) {
					if (seeker.categories.map(e => e.pk).some(r => solution.category.includes(r))) {
						categoryFeed.push(solution)
						allFeed.push(solution)
						sAdded = true;
					}
				}
				if (seeker.tags.length > 0) {
					if (seeker.tags.map(e => e.pk).some(r => solution.tags.map(e => e.pk).includes(r))) {
						identityFeed.push(solution)
						if (!sAdded) {
							allFeed.push(solution)
						}
					}
				}
			})
		}

		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-3 text-center">
						<div className={"d-flex " + this.props.mobile.isMobile ? "flex-row" : "flex-column"}>
							<Button outline className="btn-block mb-1" onClick={() => this.changeView("main")} color="secondary" active={this.state.view === "main" ? true : false}>Main</Button>
							<Button outline className="btn-block mb-1" onClick={() => this.changeView("favorites")} color="warning" active={this.state.view === "favorites" ? true : false}>Favories <span class="badge badge-warning">&#9733;</span></Button>
							<Button outline className="btn-block mb-1" color="secondary" onClick={() => this.props.toggleSettings()}>Feed Settings <i className="fa fa-cogs nav-link pointer-hand"></i></Button>
							<Button outline className="btn-block" onClick={() => this.changeView("editUser")} color="info" active={this.state.view === "editUser" ? true : false}>Edit Info <i className="fa fa-user"></i></Button>
						</div>
					</div>
					<div className="col-lg-9">
						<h1 className="text-center">{this.state.view === "main" ? "Your feed" : (this.state.view === "favorites") ? "Your favories" : "Edit User Information"}</h1>
						<div className="container" style={{overflowY:"auto", height:scrollHeight}}>
							{(this.state.view === "main") ? (
								<DumbTiles solutions={allFeed} size="lg" screen_height={this.props.mobile.screen_height} screen_width={this.props.mobile.screen_width} env="discovery" />
								): (this.state.view === "favorites") ? (
								<DumbTiles solutions={bookmarks} size="lg" screen_height={this.props.mobile.screen_height} screen_width={this.props.mobile.screen_width} env="discovery" />
								): <EditSeekerInfo user={this.props.auth.user} />
							}
						</div>
					</div>
				</div>
				{this.props.auth.isAuthenticated ? (
					<SeekerSettings 
						industries={this.props.industries} 
						open={this.state.settingsOpen} 
						toggle={this.toggleSettings} 
						seeker={this.props.auth.user.custom_user.seeker_account}
						onSubmit={this.props.updateSeeker}
						token={this.props.auth.token}
						mobile={this.props.mobile}
					/>) : null }
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		//seeker:state.seeker_account.seeker,
		mobile:state.main,
		auth:state.auth,
		//solutions:state.discovery.solutions,
		industries:state.discovery.industries,
		//isLoaded: state.seeker_account.isLoaded,
		//isUpdated: state.seeker_account.isUpdated,
		solutions:state.seeker_account.allSolutions,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		// retrieveSeekerAccount: (seekerAccountPK) => {
		// 	dispatch(seeker_account.retrieveSeekerAccount(seekerAccountPK));
		// },
		updateSeeker: (pk, seekerData, token) => {
			dispatch(seeker_account.updateSeeker(pk, seekerData, token));
		},
		listIndustries: () => {
			dispatch(discovery.listIndustries());
		},
		listSolutions: () => {
			dispatch(seeker_account.listSolutions());
		},
		toggleSettings: () => {
			dispatch(main.toggleSettings());
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SeekerProfile);

class EditSeekerInfo extends Component {
	constructor(props) {
		super(props)

		this.state = {
			user: {
				username: null,
			},
		}

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
		const user = {...this.props.user}
		this.setState({user});
	}

	handleChange(e) {
		var user = {...this.state.user}
		user[e.target.name] = e.target.value
		this.setState({user})
	}

	render() {
		console.log(this.props, this.state);
		return (
			<div>
				<h3>Your Information</h3>
				<form>
					<input type="text" name="username" value={this.state.user.username} onChange={this.handleChange} className="form-control" />
					<input type="submit" value="Submit" />
				</form>
			</div>
		)
	}
}