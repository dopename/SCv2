import React, { Component } from "react";
import $ from 'jquery';
import { Button } from 'reactstrap';
import "./Tag.css";

export default class Tags extends Component {
	constructor(props) {
		super(props)

		this.state = {
			tagContainer: null,
			arrows:false,
		}

		this.scrollLeft = this.scrollLeft.bind(this);
		this.scrollRight = this.scrollRight.bind(this);
		this.randomString = this.randomString.bind(this);
		this.testArrows = this.testArrows.bind(this);
	}

	componentDidMount(prevProps) {
		this.setState({tagContainer:this.randomString()});
	}

	componentDidUpdate(prevProps, prevState) {
		if ((this.state.tagContainer !== null) && (prevState !== this.state)) {
			this.testArrows();
		}
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

	testArrows() {
		const element = document.getElementById(this.state.tagContainer);
		var totalWidth = 0;
		let childArray =  [...element.childNodes]

		if (childArray.length > 0) {
			childArray.map(e => {
				totalWidth += e.offsetWidth;
			})

			if (totalWidth > element.offsetWidth) {
				this.setState({arrows:true});
			}

			console.log(totalWidth, element.offsetWidth);
		}
	}

	render() {
		var cols = [];

		this.props.tags.map((t) => {
			//var t = tag[0]
			if (!t.type) { 
				cols.push(
					<div className={"list-group-item p-1"} key={"tag_"+t.pk}>
						<p className="mb-0">
							{t.name}
						</p>
					</div>
				)
			}
			else {
				cols.push(
					<div className={"list-group-item p-1"} key={"tag_"+t.type + t.pk}>
						<p className="mb-0">{t.type === "industry" ? <span class="badge badge-warning">&#9733;</span> : <span class="badge badge-secondary">C</span> } {t.name}</p>
					</div>
					)
			}
		})

		return (
			<div class="container-fluid">
				<div className="row">
					<div className="col-1 px-0 text-center">
						{this.state.arrows ? (
							<h2 className="p-0 m-0">
								<span class="fa fa-angle-left h-100 pointer-hand" onClick={(e) => { this.scrollRight(e)} }></span>
							</h2>
							) : null }
					</div>
					<div className="col-10">
						<div class="row overflowX flex-nowrap horizontal-scroll py-1 px-0" id={this.state.tagContainer}>
							{cols}
						</div>
					</div>
					<div className="col-1 px-0 text-center">
						{this.state.arrows ? (
							<h2 className="p-0 m-0">
								<span class="fa fa-angle-right p-auto pointer-hand h-100" onClick={(e) => { this.scrollLeft(e)} }></span>
							</h2>
							) : null }
					</div>
				</div>
			</div>
		)
	}

}


					// 	<Button 
					// 		outline
					// 		color="dark"
					// 		onClick={(e) => { this.scrollRight(e)} }
					// 		className="px-1 h-100">
					// 		<span class="fa fa-angle-left pointer-hand"></span>
					// 	</Button>
					// </div>
					// <div className="col-10">
					// 	<div class="row overflowX flex-nowrap horizontal-scroll py-1 px-0" id={this.state.tagContainer}>
					// 		{cols}
					// 	</div>
					// </div>
					// <div className="col-1 p-1 text-center">
					// 	<Button 
					// 		outline
					// 		color="dark"
					// 		onClick={(e) => { this.scrollLeft(e)} }
					// 		className="px-1 h-100">
					// 		<span class="fa fa-angle-right p-auto pointer-hand"></span>
					// 	</Button>