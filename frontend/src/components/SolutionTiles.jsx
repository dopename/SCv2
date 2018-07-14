import React, { Component } from "react";
import {connect} from "react-redux";
import { Button } from "reactstrap";

import {solution_tiles} from "../actions/index";
import "./SolutionTiles.css";
import Tags from "./dumb_components/Tags";

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

		var max_height = (this.props.mobile.screen_height * 0.15).toString() + "px";

		this.props.solutionData.map((solution, index) => {
			if (this.props.unselected.indexOf(solution.category[0]) < 0) {
		    	cols.push(
		    		<div class="col-md-4 my-2 p-2" key={"solution_" + solution.pk}>
		    			<div className="solution-tile pointer-hand">
			    			<div className="solution-main-image text-center">
			    				<img alt={solution.name + " product image"} src={solution.main_image} style={{maxHeight : max_height}} className="responsive-image" />
			    			</div>
			    			<hr className="my-2" />
			    			<div className="solution-title text-left">
			    				<h3 className="text-center">{solution.name}</h3>
			    				<Tags tags={solution.tags} />
			    				<p className="ml-2 my-1">{solution.provider_name}</p>
			    				<p className="ml-2"><i className={solution.status === "Available since" ? "text-success fa fa-check-circle-o" : "text-warning fa fa-clock-o"}></i> {solution.status}: {solution.status_date}</p>
			    			</div>
			    		</div>
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