import React, { Component } from "react";
import {connect} from "react-redux";

import {solution_tiles} from "../actions/index";

class SolutionTiles extends Component {

	compnentDidMount() {
		this.props.fetchSolutionData(this.props.solutions)
	}

	render() {
		console.log("SOLUTION TILES PROPS", this.props)
		return (
			<div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		solutions:state.discovery.solutions,

	}
}

const mapDispatchToProps = dispatch => {
	return {
		fetchSolutionData: (solutions) => {
			dispatch(solution_tiles.fetchSolutionData(solutions));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SolutionTiles);