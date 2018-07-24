import React, { Component } from "react";
import { Modal, Button } from "reactstrap";
import Tags from "./Tags"
import { Link } from "react-router-dom";
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
						<div className="container-fluid px-3 mt-3" style={{borderBottom:"solid #E9ECEF 1px"}}>
							<div className="row">
								<div className="col-1 pr-0">
									<img src={this.props.solution.provider_logo} alt={this.props.solution.provider_name + " logo"} style={{width:"100%", height:"auto"}} />
								</div>
								<div className="col-7">
									<div className="col-12">
										<h2 className="modal-text-heading">{this.props.solution.name}</h2>
										<p>{this.props.solution.provider_name}</p>
										<p className="mb-0"><small>Who it's for</small></p>
										<Tags tags={this.props.solution.tags} />
									</div>
								</div>
								<div className="col-4">
									<div className="col-12 text-right">
										<div className="float-right text-left">
											<p className="ml-2 mb-1"><i className={this.props.solution.status === "Available since" ? "text-success fa fa-check-circle-o" : "text-warning fa fa-clock-o"}></i> {this.props.solution.status}: {this.props.solution.status_date}</p>
											{this.props.env === "discovery" ? (
												<Button color="success" size="lg"><Link className="text-white" to={`/provider/${this.props.solution.provider}`}>Go to Solution Provider</Link></Button>
												) : null}
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
										<h5 className="mb-1 modal-text-heading"><i className="fa fa-question-circle"></i> Why this exists</h5>
										<p className="mb-1 pl-3">{this.props.solution.why}</p>
										<h5 className="mb-1 modal-text-heading"><i className="fa fa-cogs"></i> How it works</h5>
										<p className="mb-1 pl-3">{this.props.solution.how}</p>
										<h5 className="mb-1 modal-text-heading"><i className="fa fa-lightbulb-o"></i> Opportunity</h5>
										<p className="mb-1 pl-3">{this.props.solution.opportunity}</p>
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
		else {
			return (
				null
			)
		}
	}
}

export default SolutionModal;