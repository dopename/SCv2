import React, { Component } from "react";

import SolutionTiles from "./SolutionTiles"

class SolutionTileManager extends Component {
	
	render() {
		if (this.props.parentType === "discovery") {
			return (
				<div>
					<SolutionTiles />
				</div>
			)
		}
		else {
			return null
		}
	}
}

const mapStateToProps = state => {
	return {
		solutions:state.discovery.solutions,
		unselected:state.discovery.unselectedCategories,
		solutionData:state.solution_tiles.solutionData,
		mobile:state.main,

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