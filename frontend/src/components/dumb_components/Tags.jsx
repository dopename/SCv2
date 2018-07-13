import React, { Component } from "react";
import $ from 'jquery';
import { Button } from 'reactstrap';

export default class Tag extends Component {
	constructor(props) {
		super(props)

		this.state = {
			tagContainer: null,
		}

		this.scrollLeft = this.scrollLeft.bind(this);
		this.scrollRight = this.scrollRight.bind(this);
		this.randomString = this.randomString.bind(this);
	}

	componentDidMount() {
		this.setState({tagContainer:this.randomString()});
	}

	randomString() {
		var text = "";
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text
	}

	scrollRight(e) {
		var slider = document.getElementById(this.state.tagContainer)
		$(slider).animate({
			scrollLeft: '-=156px'
		});
	}

	scrollLeft(e) {
		var slider = document.getElementById(this.state.tagContainer)
		$(slider).animate({
			scrollLeft: '+=156px'
		});
	}

	render() {
		var cols = [];

		this.props.tags.map((t) => {
			//var t = tag[0]
			cols.push(
				<div className={"list-group-item btn-outline-info"} key={"tag_"+t.pk}>
					<p className="mb-0">
						{t.name}
					</p>
				</div>
			)
		})

		return (
			<div class="container-fluid">
				<div className="row">
					<div className="col-1 px-1 text-center">
						<Button 
							outline
							color="dark"
							onClick={(e) => { this.scrollRight(e)} }
							className="px-1 h-100">
							<span class="fa fa-angle-left pointer-hand"></span>
						</Button>
					</div>
					<div className="col-10">
						<div class="row overflowX flex-nowrapp-0" id={this.state.tagContainer}>
							{cols}
						</div>
					</div>
					<div className="col-1 px-1 text-center">
						<Button 
							outline
							color="dark"
							onClick={(e) => { this.scrollLeft(e)} }
							className="px-1 h-100">
							<span class="fa fa-angle-right p-auto pointer-hand"></span>
						</Button>
					</div>
				</div>
			</div>
		)
	}

}

