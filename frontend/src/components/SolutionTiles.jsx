import React, { Component } from "react";
import {connect} from "react-redux";
import { Button } from "reactstrap";

import {solution_tiles} from "../actions/index";
import "./SolutionTiles.css";
import Tags from "./dumb_components/Tags";

import SolutionModal from "./dumb_components/SolutionModal";

class SolutionTiles extends Component {
	constructor(props) {
		super(props)

		this.state = {
			openSolution: false
		}
	}

	componentDidMount() {
		this.props.fetchSolutionData(this.props.solutions)
	}

	componentDidUpdate(prevProps) {
		if (this.props.solutions !== prevProps.solutions) {
			this.props.fetchSolutionData(this.props.solutions);
		}
	}

	toggleSolution(pk) {
		if (!this.state.openSolution) {
			this.setState({openSolution:pk});
		}
		else {
			this.setState({openSolution:false});
		}
	}

	toggleOff() {
		this.setState({openSolution:false});
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
		    			<div className="solution-tile">
			    			<div className="solution-main-image text-center">
			    				<img alt={solution.name + " product image"} src={solution.main_image} style={{maxHeight : max_height}} className="responsive-image" />
			    			</div>
			    			<hr className="my-2" />
			    			<div className="solution-title text-left">
			    				<h3 className="text-center">{solution.name}</h3>
			    				<p className="ml-2 mb-0">Who it's for:</p>
			    				<Tags tags={solution.tags} />
			    				<p className="ml-2 my-1">{solution.provider_name}</p>
			    				<p className="ml-2 mb-1"><i className={solution.status === "Available since" ? "text-success fa fa-check-circle-o" : "text-warning fa fa-clock-o"}></i> {solution.status}: {solution.status_date}</p>
			    				<div className="row">
			    					<div className="col-1">
			    					</div>
			    					<div className="col-10">
			    						<Button outline className="btn-block mb-1" color="success" size="md" onClick={() => { this.toggleSolution(solution.pk) } }>View Details</Button>
			    					</div>
			    					<div className="col-1">
			    					</div>
			    				</div>
			    			</div>
			    		</div>
			    		<SolutionModal solution={solution} toggle={this.toggleOff} screen_width={this.props.mobile.screen_width} activeModal={this.state.openSolution} />
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