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
		var cols = [];
		var rows = [];

		this.props.solutionData.map((solution, index) => {
			if (this.props.unselected.indexOf(solution.category[0]) < 0) {
		    	cols.push(
		    		<div class="col-md-3 my-2" key={"solution_" + solution.pk}>
		    			<Button outline size="block" color="primary">
		    				<h3 className="">{solution.name}</h3>
		    			</Button>
		    		</div>)
			}
		    if (((index + 1) % 3 === 0) || (index + 1 === this.props.solutionData.length)) {
		        rows.push(
		          <div class="row" key={"row_"+index}>
		            {cols}
		          </div>
		          )
		        cols = []
		      }
		})

		return (
			<div>
				{rows}
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