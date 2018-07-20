import React, { Component } from "react";
import {connect} from "react-redux";

import {solution_account} from "../actions/index";

class SeekerProfile extends Component {

	componentDidMount() {
		this.props.retrieveSeekerAccount(this.props.auth.user.custom_user.seeker_account)
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
		retrieveSeekerAccount: (providerPK) => {
			dispatch(solution_provider.retrieveProviderData(providerPK));
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SeekerProfile);