import React, { Component } from "react";
import {connect} from "react-redux";
import SeekerSettings from "./SeekerSettings";
import { Button, ButtonGroup } from "reactstrap";
import Tags from "./dumb_components/Tags";

//mobile
export default class SeekerFeed extends Component {
	render() {
		var feed = [];
		var responsiveHeight = (0.18 * this.props.mobile.screen_height).toString() + "px"
		this.props.solutions.map(s => {
			feed.append(
					<div className="col-12">
						<div className="d-flex flex-column">
							<div className="d-flex flex-row" style={{height:responsiveHeight}}>
								<img src={s.main_image} alt="pic" className="responsive-image mt-2" />
							</div>
							<p className="text-left p-2">{s.about}</p>
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
