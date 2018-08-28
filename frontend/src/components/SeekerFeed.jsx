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

	checkDimensions(img, pk) {

	}

	render() {
		var feed = [];
		var responsiveHeight = (0.18 * this.props.mobile.screen_height).toString() + "px"
		this.props.solutions.map(s => {
			var feedImage = <img src={s.main_image} alt="pic" style={{maxHeight:responsiveHeight, width:"auto"}} className="m-2" />
			console.log(feedImage.naturalWidth, feedImage.naturalHeight);
			if ((feedImage.width / feedImage.height) > 1.70) {
				feed.push(<TopFeedItem s={s} image={feedImage} />)
			}
			else {
				feed.push(<LeftFeedItem s={s} image={feedImage} />)
			}

		})

		return ( 
			<div className="d-flex flex-column">
				{feed}
			</div>
		)
	}
}

class LeftFeedItem extends Component {

	render() {
		return (
			<div className="col-12 my-1">
				<div className="d-flex flex-column border border-dark" style={{borderRadius:"10px"}}>
					<div className="d-flex flex-row">
						{this.props.image}
						<p className="text-left p-2">{this.props.s.why}</p>
					</div>
					<Tags tags={this.props.s.tags} />
				</div>
			</div>
		)
	}
}

class TopFeedItem extends Component {

	render() {
		return (
			<div className="col-12 my-1">
				<div className="d-flex flex-column border border-dark" style={{borderRadius:"10px"}}>
					<div className="d-flex flex-row">
						{this.props.image}
					</div>
					<p className="text-left p-2">{this.props.s.why}</p>
					<Tags tags={this.props.s.tags} />
				</div>
			</div>
		)
	}
}
