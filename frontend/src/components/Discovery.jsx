import React, { Component } from "react";
import {connect} from "react-redux";

import {discovery} from "../actions/index"

class Discovery extends Component {

	componentDidMount() {
		this.props.listIndustries();
	}

	render() {
		console.log("PROPS", this.props);
		return (
			<div>
				{this.props.allIndustry.map(industry => (
					<h3>{industry.name}</h3>
				))}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		allIndustry:state.discovery.allIndustry
	}
}

const mapDispatchToProps = dispatch => {
	return {
		listIndustries: () => {
			dispatch(discovery.listIndustries())
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Discovery);