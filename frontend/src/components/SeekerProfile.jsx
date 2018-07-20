import React, { Component } from "react";
import {connect} from "react-redux";

import {seeker_account, auth, solution_tiles} from "../actions/index";

class SeekerProfile extends Component {

	componentDidMount() {
		// this.props.listSolutions();
		this.props.listIndustries();
		if (this.props.auth.user != null) {
			this.props.retrieveSeekerAccount(this.props.auth.user.custom_user.seeker_account);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props != prevProps) {
			if (this.props.auth.user != null && !this.props.isLoaded) {
				this.props.retrieveSeekerAccount(this.props.auth.user.custom_user.seeker_account)
			}
		}
	}

	render() {
		var bookmarks = [];
		var categoryFeed = [];
		var identityFeed = [];

		var allFeed = [];

		console.log(this.props)

		if (this.props.isLoaded) {
			this.props.solutions.map(solution => {
				let sAdded = false;
				if (this.props.seeker.bookmarks.map(e => e.pk).indexOf(solution.pk) > -1) {
						bookmarks.push(<li>{solution.name}</li>)
				}
				if (this.props.seeker.categories.length > 0) {
					if (this.props.seeker.categories.map(e => e.pk).some(r => solution.category.includes(r))) {
						categoryFeed.push(<li>{solution.name}</li>)
						allFeed.push(<li>{solution.name}</li>)
						sAdded = true;
					}
				}
				if (this.props.seeker.tags.length > 0) {
					if (this.props.seeker.tags.map(e => e.pk).some(r => solution.tags.map(e => e.pk).includes(r))) {
						identityFeed.push(<li>{solution.name}</li>)
						if (!sAdded) {
							allFeed.push(<li>{solution.name}</li>)
						}
					}
				}
			})
		}

		return (
			<div>
				<div className="row">
					<div className="col-4 text-center">
						<h1>Booksmarks..</h1>
						<ul>
							{ bookmarks }
						</ul>
					</div>
					<div className="col-4 text-center">
						<h1>Category Feed</h1>
						<ul>
							{ categoryFeed }
						</ul>
					</div>	
					<div className="col-4 text-center">
						<h1>Identity Feed</h1>
						<ul>
							{ identityFeed }
						</ul>
					</div>	
				</div>
				<div className="col-12 text-center">
					<h1>The aggregate feed will be..</h1>
					<ul>
						{ allFeed }
					</ul>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		seeker:state.seeker_account.seeker,
		mobile:state.main,
		auth:state.auth,
		solutions:state.discovery.solutions,
		industries:state.discovery.industries,
		isLoaded: state.seeker_account.isLoaded,
		// allSolutions:state.seeker_account.allSolutions,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		retrieveSeekerAccount: (seekerAccountPK) => {
			dispatch(seeker_account.retrieveSeekerAccount(seekerAccountPK));
		},
		// listSolutions: () => {
		// 	dispatch(seeker_account.listSolutions());
		// },
		listIndustries: () => {
			dispatch(discovery.listIndustries());
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SeekerProfile);