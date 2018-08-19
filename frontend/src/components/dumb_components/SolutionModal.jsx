import React, { Component } from "react";
import { Modal, Button, Carousel, CarouselItem, CarouselIndicators, CarouselControl } from "reactstrap";
import Tags from "./Tags"
import { Link } from "react-router-dom";
import "./SolutionModal.css"
import { incrementAPICall } from "../../helpers/index";
import {connect} from "react-redux";

import {seeker_account} from "../../actions/index"

class SolutionModal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			modal:false,
			mobile:null
		}

		this.checkIfActive = this.checkIfActive.bind(this);
		this.bookmarkSolution = this.bookmarkSolution.bind(this);
		//this.updateSolutionViews = this.updateSolutionViews.bind(this);
	}

	componentDidMount() {
		this.checkIfActive();
	}

	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			this.checkIfActive();
		}
	}

	checkIfActive() { //Is passed an activeModal prop, if it equals the pk of solution, pop open the modal! 
		if (this.props.activeModal === this.props.solution.pk) {
			if (this.props.preview === "preview") {
				null //Shouldn't increment views if it is a preview.
			}
			else {
				incrementAPICall("solution", this.props.solution.pk)
			}
			this.setState({modal:true});
			// this.updateSolutionViews();
		}
		else {
			this.setState({modal:false});
		}
	}

	bookmarkSolution(pk) {
		var bookmarks = this.props.seeker.bookmarks.map(b => b.pk);
		if (bookmarks.indexOf(pk) > -1) {
			bookmarks.splice(bookmarks.indexOf(pk), 1);
		}
		else {
			bookmarks.push(pk);
		}

		var data = {bookmarks:bookmarks}

		this.props.updateSeeker(this.props.seeker.pk, data, this.props.token);
	}

	render() {
		var totalMedia = [];
		totalMedia.push( {file:this.props.solution.main_image });
		if (this.props.solution.solutionmedia.media.length > 0) {
			totalMedia = [...totalMedia, ...this.props.solution.solutionmedia.media]
		}

		var max_height = (this.props.screen_height * 0.25).toString() + "px";
		var bookmarks;
		var bookmarkActive = false;

		if (this.props.seeker) {
			bookmarks = this.props.seeker.bookmarks.map(b => b.pk);

			if (bookmarks.indexOf(this.props.solution.pk) > -1) {
				bookmarkActive = true;
			}
		}

			return (
				<div>
					<Modal size={this.props.isMobile === true ? "md" : "lg"} isOpen={this.state.modal} toggle={this.props.toggle}>
						<h4 className="mb-2">
							<i className="fa fa-window-close mx-1 float-right pointer-hand" title="Close" onClick={() => {  this.props.toggle() }}></i>
							{this.props.seeker ? <i title="Bookmark" className={"fa fa-bookmark mx-1 float-right pointer-hand" + (bookmarkActive ? " text-warning" : "")} onClick={() => this.bookmarkSolution(this.props.solution.pk)}></i> : null }
							<i title="Share" className="fa fa-share-alt-square mx-1 float-right pointer-hand"></i>
						</h4>
						<div className="container-fluid px-3 mt-3" style={{borderBottom:"solid #E9ECEF 1px"}}>
							<div className="row">
								<div className="col-lg-1 pr-0">
									<img src={this.props.solution.provider_logo} alt={this.props.solution.provider_name + " logo"} style={{width:"100%", height:"auto"}} />
								</div>
								<div className="col-lg-7">
									<div className="col-lg-12">
										<h2 className="modal-text-heading">{this.props.solution.name}</h2>
										<h5>{this.props.solution.provider_name}</h5>
										<p className="mb-0"><small>Who it's for</small></p>
										<Tags tags={this.props.solution.tags} />
									</div>
								</div>
								<div className="col-lg-4">
									<div className="col-lg-12 text-right">
										<div className="float-right text-left">
											<p className="ml-2 mb-1"><i className={this.props.solution.status === "Available since" ? "text-success fa fa-check-circle-o" : "text-warning fa fa-clock-o"}></i> {this.props.solution.status}: {this.props.solution.status_date}</p>
											{this.props.env === "discovery" ? (
												<Button color="success" className="border-dark border" size="lg"><Link className="text-white" to={`/provider/${this.props.solution.provider}`}>Go to Solution Provider</Link></Button>
												) : null}
										</div>
									</div>
								</div>
							</div>
						</div>
						<hr className="my-2" />
						<div className="container-fluid px-3 pb-2">
							<div className="row">
								<div className="col-lg-12 text-center">
									<h4 className="mb-2">{this.props.solution.what}</h4>
									{this.props.solution.solutionmedia.media.length < 1 ? 
										(
											<img src={this.props.solution.main_image} alt={"Image for " + this.props.solution.name} className="responsive-image" style={{maxHeight:max_height}}/>
										)
										:
										(
											<SolutionCarousel items={totalMedia} max_height={max_height} />
										)
									}
								</div>
							</div>
							<div className="row">
								<div className="col-lg-12">
									<div className="col-lg-12 text-left">
										<h5 className="mb-1 modal-text-heading"><i className="fa fa-question-circle"></i> Why this exists</h5>
										<p className="mb-2 pl-3">{this.props.solution.why}</p>
										<h5 className="mb-1 modal-text-heading"><i className="fa fa-cogs"></i> How it works</h5>
										<p className="mb-2 pl-3">{this.props.solution.how}</p>
										<h5 className="mb-1 modal-text-heading"><i className="fa fa-lightbulb-o"></i> Opportunity</h5>
										<p className="mb-2 pl-3">{this.props.solution.opportunity}</p>
										<h5 className="mb-1 modal-text-heading"><i className="fa fa-puzzle-piece"></i> Integration</h5>
										<p className="pl-3">{this.props.solution.integration}</p>
									</div>
								</div>
							</div>
						</div>
					</Modal>
				</div>
			)
	}
}

const mapStateToProps = state => {
	return {
		seeker:state.auth.seeker,
		token:state.auth.token,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateSeeker: (pk, seekerData, token) => {
			dispatch(seeker_account.updateSeeker(pk, seekerData, token));
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SolutionModal);

class SolutionCarousel extends Component {
	constructor(props) {
		super(props)

		this.state = {
			activeIndex:0
		}

		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		this.goToIndex = this.goToIndex.bind(this);
		this.onExiting = this.onExiting.bind(this);
		this.onExited = this.onExited.bind(this);
	}

	onExiting() {
		this.animating = true;;
	}

	onExited() {
		this.animating = false;
	}

	next() {
		if (this.animating) {
			return;
		}
		const nextIndex = this.state.activeIndex === this.props.items.length - 1 ? 0 : this.state.activeIndex + 1;
		this.setState({activeIndex:nextIndex});
	}

	previous() {
		if (this.animating) {
			return;
		}
		const nextIndex = this.state.activeIndex === 0 ? this.props.items.length - 1 : this.state.activeIndex - 1;
		this.setState({activeIndex:nextIndex});
	}

	goToIndex(newIndex) {
		if (this.animating) {
			return;
		}
		this.setState({activeIndex:newIndex});
	}

	render() {
		console.log(this.props);
		const { activeIndex } = this.state;

		const slides = this.props.items.map((item, i) => {
			if (item.file.endsWith(".jpg") || item.file.endsWith(".png") || item.file.endsWith(".jpeg")) {
				return (
					<CarouselItem
						onExiting={this.onExiting}
						onExited={this.onExited}
						key={item.file}
					>
						<img src={item.file} alt={"Slide" + i} className="responsive-image" style={{maxHeight:this.props.max_height}} />
					</CarouselItem>

				)
			}
			else {
				return (
					<CarouselItem
						onExiting={this.onExiting}
						onExited={this.onExited}
						key={item.file}
					>
						<video controls className="responsive-image" style={{maxHeight:this.props.max_height}}>
							<source src={item.file} type="video/mp4" />
						</video>
					</CarouselItem>

				)
			}
		});

		return (
			<Carousel
				activeIndex={activeIndex}
				next={this.next}
				previous={this.previous}
				interval={false}
			>
				<CarouselIndicators items={this.props.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
					{slides}
				<CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
				<CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
			</Carousel>
		);
	}
}