import React, { Component } from "react";
import {connect} from "react-redux";

import {seeker_account, auth} from "../actions/index";

class SeekerProfile extends Component {

	componentDidMount() {
		//this.props.loadUser();
		null
	}

	componentDidUpdate(prevProps) {
		if (this.props != prevProps) {
			if (this.props.auth.user != null) {
				this.props.retrieveSeekerAccount(this.props.auth.user.custom_user.seeker_account)
			}
		}
	}

	render() {
		console.log(this.props)
		return (
			null
		)
	}
}

const mapStateToProps = state => {
	return {
		seekerAccount:state.seeker_account,
		mobile:state.main,
		auth:state.auth
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
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SeekerProfile);