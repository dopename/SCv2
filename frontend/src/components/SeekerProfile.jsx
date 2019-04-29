import React, { Component } from "react";
import {connect} from "react-redux";
import SeekerFeed from "./SeekerFeed";
import {seeker_account, discovery, solution_tiles, main} from "../actions/index";
import SeekerSettings from "./SeekerSettings";
import { Button, ButtonGroup } from "reactstrap";
import DumbTiles from "./dumb_components/DumbTiles"


 function Comparator(a, b) {
   if (a[0] < b[0]) return -1;
   if (a[0] > b[0]) return 1;
   return 0;
 }


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
						bookmarks.push(solution) //if pk matches bookmarked pk, add to bookmark array
				}
				//if solution category matches one of categories subscribed to, push to allFeed (and categoryFeed?)
				//since categories are a broader scope, hit this first and flag sAdded so we don't duplicate
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
							<Button outline className="btn-block mb-1" onClick={() => this.changeView("favorites")} color="warning" active={this.state.view === "favorites" ? true : false}>Favories <i className="fa fa-star"></i></Button>
							<Button outline className="btn-block mb-1" color="secondary" onClick={() => this.props.toggleSettings()}>Feed Settings <i className="fa fa-cogs"></i></Button>
							<Button outline className="btn-block" onClick={() => this.changeView("editUser")} color="info" active={this.state.view === "editUser" ? true : false}>Edit Info <i className="fa fa-user"></i></Button>
						</div>
					</div>
					<div className="col-lg-9">
						<h1 className="text-center">{this.state.view === "main" ? "Your feed" : (this.state.view === "favorites") ? "Your favories" : "Edit User Information"}</h1>
						<div className="container" style={{overflowY:"auto", height:scrollHeight}}>
							{(this.state.view === "main") ? (
								<SeekerFeed solutions={allFeed} mobile={this.props.mobile} />
								): (this.state.view === "favorites") ? (
								<DumbTiles solutions={bookmarks} size="lg" screen_height={this.props.mobile.screen_height} screen_width={this.props.mobile.screen_width} env="discovery" />
								): <EditSeekerInfo user={this.props.auth.user} token={this.props.auth.token} submit={this.props.updateCustomUser} />
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
		mobile:state.main,
		auth:state.auth,
		industries:state.discovery.industries,
		solutions:state.seeker_account.allSolutions,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateCustomUser: (pk, seekerData, token) => {
			dispatch(seeker_account.updateCustomUser(pk, seekerData, token));
		},
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
			custom_user: {
				first_name: null,
				last_name:null,
				phone_number:null,
				email:null
			},
		}

		this.handleChange = this.handleChange.bind(this);
		this.cleanData = this.cleanData.bind(this);
	}

	componentDidMount() {
		const custom_user = {...this.props.user.custom_user}
		delete custom_user['provider_account'];
		delete custom_user['seeker_account'];
		delete custom_user['pk'];
		this.setState({custom_user});
	}

	handleChange(e) {
		var custom_user = {...this.state.custom_user}
		custom_user[e.target.name] = e.target.value
		this.setState({custom_user})
	}

	cleanData(e) {
		e.preventDefault();
		const data = {...this.state.custom_user}
		this.props.submit(this.props.user.custom_user.pk, data, this.props.token);
	}

	render() {
		console.log(this.props, this.state);
		return (
			<div>
				<h3 className="modal-text-heading">Your Information</h3>
				<form onSubmit={this.cleanData}>
					<div className="container-fluid">
						<div className="row">
							<div className="col-lg-6">
								<label for="first_name">First Name</label>
								<input type="text" name="first_name" value={this.state.custom_user.first_name} onChange={this.handleChange} className="form-control" />
							</div>
							<div className="col-lg-6">
								<label for="last_name">Last Name</label>
								<input type="text" name="last_name" value={this.state.custom_user.last_name} onChange={this.handleChange} className="form-control" />
							</div>
						</div>
						<div className="row mt-2">
							<div className="col-lg-6">
								<label for="email">E-mail Address</label>
								<input type="email" name="email" value={this.state.custom_user.email} onChange={this.handleChange} className="form-control" />
							</div>
							<div className="col-lg-6">
								<label for="phone_number">Phone Number</label>
								<input type="text" name="phone_number" value={this.state.custom_user.phone_number} onChange={this.handleChange} className="form-control" />
							</div>
						</div>
					</div>
					<div className="text-center">
						<input type="submit" className="btn btn-md btn-success mt-2" value="Update" />
					</div>
				</form>
			</div>
		)
	}
}