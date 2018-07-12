import React, { Component } from "react";
import {connect} from "react-redux";

import {discovery} from "../actions/index"

class Discovery extends Component {

	componentDidMount() {
		this.props.listIndustries();
	}

	render() {
		console.log("PROPS", this.props);
		var display = [];

		this.props.discovery.allIndustry.map((i) => {
			console.log(i.name);
			display.push(<h3>{i.name}</h3>);
		})
		return (
			<div>
				{display}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		discovery:state.discovery
	}
}

const mapDispatchToProps = dispatch => {
	return {
		listIndustries: () => {
			dispatch(discovery.listIndustries());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Discovery);