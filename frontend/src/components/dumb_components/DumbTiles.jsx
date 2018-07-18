import React, { Component } from "react";
import { Button } from "reactstrap";

import Tags from "./Tags";
import SolutionModal from "./SolutionModal";
import "./DumbTiles.css";

export default class DumbTiles extends Component {
	constructor(props) {
		super(props)

		this.state = {
			openSolution: false
		}

		this.toggleSolution = this.toggleSolution.bind(this);
		this.toggleOff = this.toggleOff.bind(this)
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
	//Props required - screen_height, screen_width, solutions(array), openSolution, 
	render() {
		var colSize = 0
		switch (this.props.size) {
			case "lg":
				colSize = 6;
			case "md":
				colSize = 4;
			case "sm":
				colSize = 3;
			default:
				colSize = 4
		}

		var numPerRow = 12 / colSize;
		colSize = colSize.toString();

		var cols = [];
		var rows = [];

		var max_height = (this.props.screen_height * 0.18).toString() + "px";

		this.props.solutions.map((solution, index) => {
		    cols.push(
		    	<div class={"my-2 p-2 col-md-" + colSize} key={"solution_" + solution.pk}>
		    		<div className="solution-tile">
			   			<div className="solution-main-image text-center pointer-hand" onClick={() => { this.toggleSolution(solution.pk) } }>
			   				<img alt={solution.name + " product image"} src={solution.main_image} style={{maxHeight : max_height}} className="responsive-image mt-2" />
			   			</div>
			   			<hr className="my-2" style={{borderTop:"dotted black 1px"}} />
			   			<div className="solution-title text-left">
			   				<h3 className="text-center">{solution.name}</h3>
			   				<h5 className="ml-2 my-1">{solution.provider_name}</h5>
			   				<p className="ml-2 mb-1"><i className={solution.status === "Available since" ? "text-success fa fa-check-circle-o" : "text-warning fa fa-clock-o"}></i> {solution.status}: {solution.status_date}</p>
			   				<hr className="my-2" style={{borderTop:"dotted black 1px"}} />
			   				<small className="ml-2 mb-0">Who it's for:</small>
			   				<Tags tags={solution.tags} />
			   			</div>
			   		</div>
			   		<SolutionModal solution={solution} toggle={this.toggleOff} screen_width={this.props.screen_width} screen_height={this.props.screen_height} activeModal={this.state.openSolution} />
		    	</div>)

		    if (((index + 1) % numPerRow === 0) || (index + 1 === this.props.solutions.length)) {
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