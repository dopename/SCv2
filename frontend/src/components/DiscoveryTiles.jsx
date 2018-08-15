import React, { Component } from "react";
import {connect} from "react-redux";

import {solution_tiles} from "../actions/index";
import DumbTiles from "./dumb_components/DumbTiles";


class DiscoveryTiles extends Component {

	componentDidMount() {
		this.props.fetchSolutionData(this.props.solutions)
	}

	componentDidUpdate(prevProps) {
		if (this.props.solutions !== prevProps.solutions) {
			this.props.fetchSolutionData(this.props.solutions);
		}
	}

	render() {
		//document.body.classList.add("noscroll");
		var renderSolutions = [];
		var scrollHeight = (0.85 * this.props.mobile.screen_height).toString() + "px"

		this.props.solutionData.map(solution => {
			if (this.props.unselected.indexOf(solution.category[0]) < 0) {
				renderSolutions.push(solution);
			}
		})
		return (
				<div className="col-12 vertical-scroll h-75">
					<DumbTiles 
						solutions={renderSolutions} 
						size="md" 
						screen_height={this.props.mobile.screen_height} 
						screen_width={this.props.mobile.screen_width} 
						isMobile={this.props.mobile.isMobile} 
						env="discovery"
						auth={this.props.auth} />
				</div>
		)
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

export default connect(mapStateToProps, mapDispatchToProps)(DiscoveryTiles);