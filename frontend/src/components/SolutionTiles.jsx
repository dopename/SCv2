import React, { Component } from "react";
import {connect} from "react-redux";

import {solution_tiles} from "../actions/index";

class SolutionTiles extends Component {

	componentDidMount() {
		this.props.fetchSolutionData(this.props.solutions)
	}

	componentDidUpdate(prevProps) {
		if (this.props.solutions !== prevProps.solutions) {
			this.props.fetchSolutionData(this.props.solutions);
		}
	}

	render() {
		console.log("SOLUTION TILES PROPS", this.props)
		return (
			<div>
				{this.props.solutionData.map(solution => {
					if (this.props.unselected.indexOf(solution.category[0]) < 0) {
						return (
							<div className="col-lg-3 col-md-6">
								<h3>{solution.name}</h3>
							</div>
						)
					}
				})}
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		solutions:state.discovery.solutions,
		unselected:state.discovery.unselectedCategories,
		solutionData:state.solution_tiles.solutionData,

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