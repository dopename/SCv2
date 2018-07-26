import React, { Component } from "react";

import {auth, main, discovery} from "../actions/index";

class ProviderProfile extends Component {

	componentDidMount() {
		this.props.listIndustries();
	}

	render() {
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
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderProfile);