import React, { Component } from "react";

import {auth, main, discovery} from "../actions/index";

class ProviderProfile extends Component {

	componentDidMount() {
		this.props.listIndustries();
		this.props.retrieveProviderAccount(this.props.auth.user.custom_user.provider_account)
	}

	render() {
		console.log(this.props);
		return (
			<div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		mobile:state.main,
		auth:state.auth,
		industries:state.discovery.industries,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		listIndustries: () => {
			dispatch(discovery.listIndustries());
		},
		retrieveProviderAccount: (providerAccountPK) => {
			dispatch(provider_account.providerSeekerAccount(providerAccountPK));
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderProfile);