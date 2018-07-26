import React, { Component } from "react";
import {connect} from "react-redux";

import {auth, main, discovery, provider_account} from "../actions/index";

class ProviderProfile extends Component {

	componentDidMount() {
		this.props.listIndustries();
		if (this.props.auth.user != null) {
			if (this.props.auth.user.custom_user.provider_account) {
				this.props.retrieveProviderAccount(this.props.auth.user.custom_user.provider_account)
			}
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props != prevProps) {
			if ((this.props.auth.user != null) && (!this.props.provider.isLoaded)) {
				this.props.retrieveProviderAccount(this.props.auth.user.custom_user.provider_account)
			}
		}
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
		provider:state.provider_account.provider,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		listIndustries: () => {
			dispatch(discovery.listIndustries());
		},
		retrieveProviderAccount: (providerAccountPK) => {
			dispatch(provider_account.retrieveProviderAccount(providerAccountPK));
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderProfile);