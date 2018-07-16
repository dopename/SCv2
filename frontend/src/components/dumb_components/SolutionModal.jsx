import React, { Component } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "reactstrap";
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
		return (
			<div>
				<Modal size={this.state.mobile ? "md":"lg"} isOpen={this.state.modal} toggle={this.props.toggle}>
					<h4 className="mb-2"><i className="fa fa-window-close mx-1 float-right pointer-hand" onClick={() => {  this.props.toggle() }}></i><i className="fa fa-bookmark mx-1 float-right pointer-hand"></i><i className="fa fa-share-alt-square mx-1 float-right pointer-hand"></i></h4>
					<div className="container">
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
								<div className="col-12 text-center">
									<p className="ml-2 mb-1"><i className={this.props.solution.status === "Available since" ? "text-success fa fa-check-circle-o" : "text-warning fa fa-clock-o"}></i> {this.props.solution.status}: {this.props.solution.status_date}</p>
									<Button color="success" size="lg">Connect with Solution Provider</Button>
								</div>
							</div>
						</div>
					</div>
					<hr className="my-2" />
					<ModalBody>
						<br/>
					</ModalBody>
					<ModalFooter>
						<Button outline color="primary" className="btn-block">Additional Solution Media</Button>
					</ModalFooter>
				</Modal>
			</div>
		)
	}
}

export default SolutionModal;