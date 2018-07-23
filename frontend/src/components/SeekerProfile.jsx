import React, { Component } from "react";
import {connect} from "react-redux";

import {seeker_account, discovery, solution_tiles} from "../actions/index";
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
		this.props.listIndustries();
		if (this.props.auth.user != null) {
			this.props.retrieveSeekerAccount(this.props.auth.user.custom_user.seeker_account);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props != prevProps) {
			if ((this.props.auth.user != null && !this.props.isLoaded) || this.props.isUpdated) {
				this.props.retrieveSeekerAccount(this.props.auth.user.custom_user.seeker_account)
			}
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

		if (this.props.isLoaded) {
			this.props.solutions.map(solution => {
				let sAdded = false;
				if (this.props.seeker.bookmarks.map(e => e.pk).indexOf(solution.pk) > -1) {
						bookmarks.push(solution)
				}
				if (this.props.seeker.categories.length > 0) {
					if (this.props.seeker.categories.map(e => e.pk).some(r => solution.category.includes(r))) {
						categoryFeed.push(solution)
						allFeed.push(solution)
						sAdded = true;
					}
				}
				if (this.props.seeker.tags.length > 0) {
					if (this.props.seeker.tags.map(e => e.pk).some(r => solution.tags.map(e => e.pk).includes(r))) {
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
					<div className="col-3 text-center">
						<ButtonGroup vertical className="w-100 mt-1">
							<Button outline className="btn-block mb-1" onClick={() => this.changeView("main")} color="secondary" active={this.state.view === "main" ? true : false}>Main</Button>
							<Button outline className="btn-block mb-1" onClick={() => this.changeView("favorites")} color="warning" active={this.state.view === "favorites" ? true : false}>Favories</Button>
							<Button outline className="btn-block" color="secondary" onClick={() => this.toggleSettings()}>Settings</Button>
						</ButtonGroup>
					</div>
					<div className="col-9">
						<h1 className="text-center">{this.state.view === "main" ? "Your feed" : "Your favories"}</h1>
						<div className="container" style={{overflowY:"auto", height:scrollHeight}}>
							{this.state.view === "main" ? (
								<DumbTiles solutions={allFeed} size="lg" screen_height={this.props.mobile.screen_height} screen_width={this.props.mobile.screen_width} env="discovery" />
								):(
								<DumbTiles solutions={bookmarks} size="lg" screen_height={this.props.mobile.screen_height} screen_width={this.props.mobile.screen_width} env="discovery" />
								)
							}
						</div>
					</div>
				</div>
				{this.props.isLoaded ? (<SeekerSettings 
					industries={this.props.industries} 
					open={this.state.settingsOpen} 
					toggle={this.toggleSettings} 
					seeker={this.props.seeker}
					onSubmit={this.props.updateSeeker}
					seeker={this.props.seeker}
					token={this.props.auth.token}
					mobile={this.props.mobile}
					/>) : null }
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		seeker:state.seeker_account.seeker,
		mobile:state.main,
		auth:state.auth,
		//solutions:state.discovery.solutions,
		industries:state.discovery.industries,
		isLoaded: state.seeker_account.isLoaded,
		isUpdated: state.seeker_account.isUpdated,
		solutions:state.seeker_account.allSolutions,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		retrieveSeekerAccount: (seekerAccountPK) => {
			dispatch(seeker_account.retrieveSeekerAccount(seekerAccountPK));
		},
		updateSeeker: (pk, seekerData, token) => {
			dispatch(seeker_account.updateSeeker(pk, seekerData, token));
		},
		listIndustries: () => {
			dispatch(discovery.listIndustries());
		},
		listSolutions: () => {
			dispatch(seeker_account.listSolutions());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SeekerProfile);