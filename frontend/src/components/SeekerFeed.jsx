import React, { Component } from "react";
import {connect} from "react-redux";
import SeekerSettings from "./SeekerSettings";
import { Button, ButtonGroup } from "reactstrap";
import Tags from "./dumb_components/Tags";

//mobile
export default class SeekerFeed extends Component {
	constructor(props) {
		super(props) 

		this.state = {
			leftView:[],
			topView:[]
		}
	}

	render() {
		var feed = [];
		var responsiveHeight = (0.18 * this.props.mobile.screen_height).toString() + "px"
		this.props.solutions.map(s => {
			feed.push(
					<div className="col-12 my-1">
						<div className="d-flex flex-column border border-dark" style={{borderRadius:"10px"}}>
							<div className="d-flex flex-row">
								<img src={s.main_image} alt="pic" style={{maxHeight:responsiveHeight}} className="responsive-image mt-2" />
							</div>
							<p className="text-left p-2">{s.why}</p>
							<Tags tags={s.tags} />
						</div>
					</div>
				)
		})

		return ( 
			<div className="d-flex flex-column">
				{feed}
			</div>
		)
	}
}

