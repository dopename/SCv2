import React, { Component } from "react";
import {connect} from "react-redux";

import {solution_provider} from "../actions/index";

class SolutionProvider extends Component {

	componentDidMount() {
		const providerPK = this.props.match.params.id;
		this.props.retrieveProviderData(providerPK);
	}

	render() {
		return (
			<div>
				<h1 className="text-center">{this.props.providerData.name}</h1>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		providerData:state.solution_provider.providerData,
		mobile:state.main
	}
}

const mapDispatchToProps = dispatch => {
	return {
		retrieveProviderData: (providerPK) => {
			dispatch(solution_provider.retrieveProviderData(providerPK));
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SolutionProvider);