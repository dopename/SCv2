import React, { Component } from "react";
import {connect} from "react-redux";

import {seeker_account, auth, solution_tiles} from "../actions/index";

class SeekerProfile extends Component {

	componentDidMount() {
		this.props.listSolutions();
		if (this.props.auth.user != null) {
			this.props.retrieveSeekerAccount(this.props.auth.user.custom_user.seeker_account);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props != prevProps) {
			if (this.props.auth.user != null) {
				//this.props.retrieveSeekerAccount(this.props.auth.user.custom_user.seeker_account)
			}
		}
	}

	render() {
		var bookmarks = [];
		var categoryFeed = [];
		var identityFeed = [];

		if (true) {
			this.props.allSolutions.map(solution => {
				if (this.props.seekerAccount.seekerBookmarks.indexOf(solution.pk) > -1) {
						bookmarks.push(<li>{solution.name}</li>)
				}
				if (this.props.seekerAccount.seekerCategories.some(r => solution.category.indexOf(r)) > -1) {
					categoryFeed.push(<li>{solution.name}</li>)
				}
				if (this.props.seekerAccount.seekerTags.some(r => solution.tags.indexOf(r)) > -1) {
					identityFeed.push(<li>{solution.name}</li>)
				}
			})
		}

		console.log(this.props)
		return (
			<div>
				<div className="row">
					<div className="col-4 text-center">
						<h1>Booksmarks..</h1>
						{ bookmarks }
					</div>
					<div className="col-4 text-center">
						<h1>Category Feed</h1>
						{ categoryFeed }
					</div>	
					<div className="col-4 text-center">
						<h1>Identity Feed</h1>
						{ identityFeed }
					</div>	
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		seekerAccount:state.seeker_account.seekerAccount,
		mobile:state.main,
		auth:state.auth,
		allSolutions:state.seeker_account.allSolutions
	}
}

const mapDispatchToProps = dispatch => {
	return {
		retrieveSeekerAccount: (seekerAccountPK) => {
			dispatch(seeker_account.retrieveSeekerAccount(seekerAccountPK));
		},
	    loadUser: () => {
	      return dispatch(auth.loadUser());
	    },
		listSolutions: () => {
			dispatch(seeker_account.listSolutions());
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SeekerProfile);