import React, { Component } from "react";
import $ from 'jquery';
import { Button } from 'reactstrap';
import "./Tag.css";

export default class Tags extends Component {
	constructor(props) {
		super(props)

		this.state = {
			tagContainer: null,
			arrows:null,
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
		if ((this.state.tagContainer !== null) && (this.state.arrows === null)) {
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

			if (totalWidth > element.offsetWidth + 10) {
				this.setState({arrows:true});
			}
			else {
				this.setState({arrows:false});
			}

			console.log(totalWidth, element.offsetWidth);
		}
	}

	render() {
		var cols = [];

		let tagLength = this.props.tags.length;

		this.props.tags.map((t, index) => {
			let side = 'right';
			let matches = []

			if (index === 0) {
				side = "left";
			}

			if (!t.type) { 
				cols.push(
					<div className={"p-1 border-dark border-right" + ((side === "left") ? " border-left" : "")} key={"tag_"+t.pk}>
						<p className="mb-0">
							{t.name}
						</p>
					</div>
				)
			}
			else {
				cols.push(
					<div className={"p-1 border-dark border-right" + ((side === "left") ? " border-left" : "")} key={"tag_"+t.type + t.pk}>
						<p className="mb-0">{t.type === "industry" ? <span class="badge badge-warning">&#9733;</span> : <span class="badge badge-secondary">C</span> } {t.name}</p>
					</div>
					)
			}
		})

		return (
			<div className="container-fluid">
				<div className="d-flex flex-row">
					{this.state.arrows === true ? (
						<div className="text-center" style={{width:"5%"}}>
								<h2 className="p-0 m-0">
									<span class="fa fa-angle-left h-100 pointer-hand" onClick={(e) => { this.scrollRight(e)} }></span>
								</h2>
						</div>
					) : null }
						<div className={"overflowX flex-nowrap d-flex flex-row horizontal-scroll py-1 px-0" + (this.state.arrows === true ? " w-100" : " adjusted-w-90")} id={this.state.tagContainer}>
							{cols}
						</div>
					{this.state.arrows === true ? (
						<div className="text-center" style={{width:"5%"}}>
							<h2 className="p-0 m-0">
								<span class="fa fa-angle-right p-auto pointer-hand h-100" onClick={(e) => { this.scrollLeft(e)} }></span>
							</h2>
						</div>
					) : null }
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