import React, { Component } from "react";
import { Modal, Button } from "reactstrap";
import Tags from "./Tags"
import "./SolutionModal.css"

class SolutionModal extends Component {
	constructor(props) {
		super(props)

		this.state = {
			modal:false,
			mobile:null
		}

		this.checkIfActive = this.checkIfActive.bind(this);
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

	// updateSolutionViews() {
	//     var data = this.props.solution
	//     data.views += 1
	//     var url = 'https://www.solutionconnect.org/api/postings/solution/update/'
	//     fetch(url + this.props.solution.pk + '/', {
	//       method: 'put',
	//       headers: {
	//         'content-type':'application/json',
	//       },
	//       body: JSON.stringify(data)
	//     })
	// }

	checkIfActive() {
		var isMobile = this.props.screen_width < 540 ? true : false;
		if (this.props.activeModal === this.props.solution.pk) {
			this.setState({modal:true, mobile:isMobile});
			// this.updateSolutionViews();
		}
		else {
			this.setState({modal:false});
		}
	}

	render() {
		var max_height = (this.props.screen_height * 0.15).toString() + "px";

		if (!this.state.isMobile) {
			return (
				<div>
					<Modal size="lg" isOpen={this.state.modal} toggle={this.props.toggle}>
						<h4 className="mb-2"><i className="fa fa-window-close mx-1 float-right pointer-hand" onClick={() => {  this.props.toggle() }}></i><i className="fa fa-bookmark mx-1 float-right pointer-hand"></i><i className="fa fa-share-alt-square mx-1 float-right pointer-hand"></i></h4>
						<div className="container-fluid px-3" style={{borderBottom:"solid #E9ECEF 1px"}}>
							<div className="row">
								<div className="col-6">
									<div className="col-12">
										<h2>{this.props.solution.name}</h2>
										<p>{this.props.solution.provider_name}</p>
										<p className="mb-0"><small>Who it's for</small></p>
										<Tags tags={this.props.solution.tags} />
									</div>
								</div>
								<div className="col-6">
									<div className="col-12 text-right">
										<div className="float-right text-left">
											<p className="ml-2 mb-1"><i className={this.props.solution.status === "Available since" ? "text-success fa fa-check-circle-o" : "text-warning fa fa-clock-o"}></i> {this.props.solution.status}: {this.props.solution.status_date}</p>
											<Button color="success" size="lg">Connect with Solution Provider</Button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<hr className="my-2" />
						<div className="container-fluid px-3 pb-2">
							<div className="row">
								<div className="col-12 text-center">
									<h4 className="mb-2">{this.props.solution.what}</h4>
									<img src={this.props.solution.main_image} alt={"Image for " + this.props.solution.name} className="responsive-image" style={{maxHeight:max_height}}/>
								</div>
							</div>
							<div className="row">
								<div className="col-12">
									<div className="col-12 text-left">
										<h5 className="mb-1">Why this solution exists</h5>
										<p className="mb-1">{this.props.solution.why}</p>
										<h5 className="mb-1">How it works</h5>
										<p className="mb-1">{this.props.solution.how}</p>
										<h5 className="mb-1">What's the opportunity?</h5>
										<p className="mb-1">{this.props.solution.opportunity}</p>
										<h5 className="mb-1">How do you integrate?</h5>
										<p>{this.props.solution.integration}</p>
									</div>
								</div>
							</div>
						</div>
					</Modal>
				</div>
			)
		}
		else {
			return (
				null
			)
		}
	}
}

export default SolutionModal;