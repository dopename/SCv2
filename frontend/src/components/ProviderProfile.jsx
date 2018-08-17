import React, { Component } from "react";
import {connect} from "react-redux";

import {auth, main, discovery, provider_account} from "../actions/index";
import SolutionForm from "./dumb_components/SolutionForm";
import SolutionModal from "./dumb_components/SolutionModal";
import MediaForm from "./dumb_components/MediaForm";
import { Button, Modal } from "reactstrap";

class ProviderProfile extends Component {
	constructor(props) {
		super(props)

		this.state = {
			newToggled: false,
			editToggled: false,
			previewToggled: false,
			newMediaToggled: false
		}

		this.toggleNew = this.toggleNew.bind(this);
		this.toggleOff = this.toggleOff.bind(this);
		this.createSubmit = this.createSubmit.bind(this);
		this.updateSubmit = this.updateSubmit.bind(this);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.togglePreview = this.togglePreview.bind(this);
		this.checkDelete = this.checkDelete.bind(this);
	}

	componentDidMount() {
		this.props.listIndustries();
		// if (this.props.auth.user != null) {
		// 	if (this.props.auth.user.custom_user.provider_account) {
		// 		this.props.retrieveProviderAccount(this.props.auth.user.custom_user.provider_account)
		// 	}
		// }
	}
	componentDidUpdate(prevProps) {
		if (this.props !== prevProps) {
			// if ((this.props.auth.user !== null) && (!this.props.isLoaded || this.props.isUpdated)) {
			// 	if (this.props.auth.user.custom_user.provider_account != null) {
			// 		this.props.retrieveProviderAccount(this.props.auth.user.custom_user.provider_account)
			// 	}
			// }
			if (this.props.allTags.length < 1) {
				this.props.listTags();
			}
		}
	}

	createSubmit(data) {
		var formData = new FormData();
		for ( var key in data ) {
		    formData.append(key, data[key]);
		}
		this.props.createSolution(formData);
		this.toggleOff();
	}

	updateSubmit(data) {
		var formData = new FormData();
		for ( var key in data ) {
		    formData.append(key, data[key]);
		}
		this.props.updateSolution(formData, this.state.editToggled);
		this.toggleOff();
	}

	checkDelete(pk) {
		var provider = this.props.provider.provider.solutions[(this.props.provider.provider.solutions.map(s => s.pk).indexOf(pk))];
		var confirmDelete = () => window.confirm("Are you sure you want to delete " + provider.name + "?")

		if (confirmDelete()) {
			this.props.deleteSolution(pk);
		}

	}

	toggleNew() {
		this.setState({newToggled:!this.state.newToggled});
	}

	toggleEdit(pk) {
		if (this.state.editToggled === pk) {
			this.setState({editToggled:false});
		}
		else {
			this.setState({editToggled:pk})
		}
	}

	togglePreview(pk) {
		if (this.state.previewToggled === pk) {
			this.setState({previewToggled:false});
		}
		else {
			this.setState({previewToggled:pk})
		}
	}

	toggleNewMedia(pk) {
		if (this.state.newMediaToggled === pk) {
			this.setState({newMediaToggled:false});
		}
		else {
			this.setState({newMediaToggled:pk})
		}
	}

	toggleOff() {
		this.setState({newToggled:false, editToggled:false, previewToggled:false, newMediaToggled:false});
	}

	render() {
		var allIndustries = [];
		var allCategories = [];
		var existingSolution = null;

		if (this.state.editToggled) {
			existingSolution = this.props.provider.provider.solutions[(this.props.provider.provider.solutions.map(s => s.pk).indexOf(this.state.editToggled))];
		}
		if (this.state.previewToggled) {
			existingSolution = this.props.provider.provider.solutions[(this.props.provider.provider.solutions.map(s => s.pk).indexOf(this.state.previewToggled))];
			existingSolution['provider_logo'] = this.props.provider.provider.logo;
		}
		if (this.state.newMediaToggled) {
			existingSolution = this.props.provider.provider.solutions[(this.props.provider.provider.solutions.map(s => s.pk).indexOf(this.state.newMediaToggled))];
		}

		if (this.props.industries) {
			this.props.industries.map(i => {
				allIndustries.push({pk:i.pk, name:i.name});
				i.categories.map(c => {
					allCategories.push({pk:c.pk, name:c.name, industry:i.pk});
				})
			})
		}

		if (this.props.provider) {
			return (
				<div className="container-fluid">
					<div className="row mt-3">
						<div className="col-1 d-none d-lg-block">
						</div>
						<div className="col-lg-10">
							<h1 className="text-center">Provider Information</h1>
							<div className="text-left">
								<p><strong>Name:</strong> {this.props.provider.provider.name}</p>
								<p><strong>Tagline</strong> {this.props.provider.provider.tagline}</p>
								<p><strong>About:</strong> {this.props.provider.provider.about_us}</p>
								<p><strong>Address:</strong> {this.props.provider.provider.address} {this.props.provider.provider.city}, {this.props.provider.provider.state} {this.props.provider.provider.zipcode}</p>
								<p><strong>Phone:</strong> {this.props.provider.provider.phone}</p>
							</div>
						</div>
						<div className="col-1 d-none d-lg-block">
						</div>						
					</div>
					<div className="row mt-3">
						<div className="col-1 d-none d-lg-block">
						</div>
						<div className="col-lg-10">
							<h1 className="text-center">Solution Information</h1>
							<table className="table table-striped table-bordered">
								<thead className="thead-dark">
									<tr>
										<th>Name</th>
										<th>Views</th>
										<th>Bookmarks</th>
										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{this.props.provider.provider.solutions.map(s => (
										<tr>
											<td>{s.name}</td>
											<td>{s.views}</td>
											<td>{s.bookmark_count}</td>
											<td>
												<i className="fa fa-pencil text-warning pointer-hand" onClick={() => this.toggleEdit(s.pk)}></i>
												<i className="fa fa-eye text-info pointer-hand mx-2" onClick={() => this.togglePreview(s.pk)}></i>
												<i className="fa fa-close text-danger pointer-hand" onClick={() => this.checkDelete(s.pk)}></i>
												<i className="fa fa-file-image-o text-primary pointer-hand" onClick={() => this.toggleNewMedia(s.pk)}></i>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div className="col-1 d-none d-lg-block">
						</div>
					</div>
					<div className="text-center m-auto">
						<Button outline color="success" onClick={this.toggleNew}>Create Solution</Button>
					</div>
					{this.state.newToggled ? (
						<Modal size={this.props.mobile.isMobile ? "md" : "lg"} isOpen={this.state.newToggled} toggle={this.toggleOff} >
							<h4><i className="fa fa-window-close mx-1 float-right pointer-hand" title="Close" onClick={() => {  this.toggleOff() }}></i></h4>
							<SolutionForm 
								title="New" 
								isMobile={this.props.mobile.isMobile}
								submit={this.createSubmit} 
								industries={allIndustries} 
								allTags={this.props.allTags} 
								categories={allCategories} 
								providerPK={this.props.provider.provider.pk} />
						</Modal>
						) : null}
					{this.state.editToggled ? (
						<Modal size={this.props.mobile.isMobile ? "md" : "lg"} isOpen={this.state.editToggled} toggle={this.toggleOff} >
							<h4><i className="fa fa-window-close mx-1 float-right pointer-hand" title="Close" onClick={() => {  this.toggleOff() }}></i></h4>
							<SolutionForm 
								title="Edit"
								isMobile={this.props.mobile.isMobile}
								submit={this.updateSubmit} 
								industries={allIndustries} 
								allTags={this.props.allTags} 
								categories={allCategories} 
								providerPK={this.props.provider.provider.pk}
								existingSolution={existingSolution} />
						</Modal>
						) : null}
					{this.state.previewToggled ? (
			   		<SolutionModal 
			   			isMobile={this.props.mobile.isMobile} 
			   			solution={existingSolution} 
			   			toggle={this.toggleOff} 
			   			screen_width={this.props.mobile.screen_width} 
			   			screen_height={this.props.mobile.screen_height} 
			   			activeModal={this.state.previewToggled} 
			   			env="provider"
			   			auth={this.props.auth}
			   			preview="preview" />
						) : null}
					{this.state.newMediaToggled ? (
						<Modal size={this.props.mobile.isMobile ? "md" : "lg"} isOpen={this.state.newMediaToggled} toggle={this.toggleOff}>
							<h4><i className="fa fa-window-close mx-1 float-right pointer-hand" title="Close" onClick={() => {  this.toggleOff() }}></i></h4>
							<MediaForm
								solution_title={existingSolution.name}
								solutionmediaPK={existingSolution.solutionmedia.pk}
								submit={this.props.createMedia}
							/>
						</Modal>
						) : null}
				</div>
			)
		}
		else {
			return (
				<div className="container-fluid">
					<div className="text-center">
						<h1>It looks like you haven't signed up for a Provider Account</h1>
						<h3>Click the button below to request to request an account!</h3>
						<Button color="success">Request Access</Button>
					</div>
				</div>
			)
		}
	}
}

const mapStateToProps = state => {
	return {
		mobile:state.main,
		auth:state.auth,
		industries:state.discovery.industries,
		provider:state.auth.provider,
		allTags:state.provider_account.allTags,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		listIndustries: () => {
			dispatch(discovery.listIndustries());
		},
		createSolution: (data) => {
			dispatch(provider_account.createSolution(data));
		},
		updateSolution: (data, pk) => {
			dispatch(provider_account.updateSolution(data, pk));
		},
		deleteSolution: (pk) => {
			dispatch(provider_account.deleteSolution(pk));
		},
		listTags: () => {
			dispatch(provider_account.listTags());
		},
		createMedia: (data) => {
			dispatch(provider_account.createMedia(data));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderProfile);