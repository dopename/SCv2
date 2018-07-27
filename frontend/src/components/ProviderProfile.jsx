import React, { Component } from "react";
import {connect} from "react-redux";

import {auth, main, discovery, provider_account} from "../actions/index";
import SolutionForm from "./dumb_components/SolutionForm";
import { Button, Modal } from "reactstrap";

class ProviderProfile extends Component {
	constructor(props) {
		super(props)

		this.state = {
			formToggled: false,
		}

		this.toggleForm = this.toggleForm.bind(this);
	}

	componentDidMount() {
		this.props.listIndustries();
		if (this.props.auth.user != null) {
			if (this.props.auth.user.custom_user.provider_account) {
				this.props.retrieveProviderAccount(this.props.auth.user.custom_user.provider_account)
			}
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props != prevProps) {
			if ((this.props.auth.user != null) && (!this.props.isLoaded)) {
				if (this.props.auth.user.custom_user.provider_account != null) {
					this.props.retrieveProviderAccount(this.props.auth.user.custom_user.provider_account)
				}
			}
		}
	}

	toggleForm() {
		this.setState({formToggled:!this.state.formToggled});
	}

	render() {
		var allIndustries = [];
		var allCategories = [];

		if (this.props.industries) {
			this.props.industries.map(i => {
				allIndustries.push({pk:i.pk, name:i.name});
				i.categories.map(c => {
					allCategories.push({pk:c.pk, name:c.name, industry:i.pk});
				})
			})
		}

		console.log(this.props);
		if (this.props.isLoaded === true) {
			return (
				<div className="container-fluid">
					<div className="row">
						<div className="col-4">
							<h1 className="text-center">Provider Information</h1>
							<div className="text-left">
								<p><strong>Name:</strong> {this.props.provider.provider.name}</p>
								<p><strong>Tagline</strong> {this.props.provider.provider.tagline}</p>
								<p><strong>About:</strong> {this.props.provider.provider.about_us}</p>
								<p><strong>Address:</strong> {this.props.provider.provider.address} {this.props.provider.provider.city}, {this.props.provider.provider.state} {this.props.provider.provider.zipcode}</p>
								<p><strong>Phone:</strong> {this.props.provider.provider.phone}</p>
							</div>
						</div>
						<div className="col-8">
							<h1 className="text-center">Solution Information</h1>
							<table className="table">
								<tr>
									<th>Name</th>
									<th>Status</th>
									<th>Views</th>
								</tr>
								{this.props.provider.provider.solutions.map(s => (
									<tr>
										<td>{s.name}</td>
										<td>{s.status}</td>
										<td>{s.views}</td>
									</tr>
								))}
							</table>
						</div>
					</div>
					<Button onClick={this.toggleForm}>Toggle Form</Button>
					{this.state.formToggled ? (<Modal size="lg" isOpen={this.state.formToggled} toggle={this.state.toggleForm} ><SolutionForm submit={null} industries={allIndustries} categories={allCategories} /></Modal>) : null}
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
		provider:state.provider_account.provider,
		isLoaded:state.provider_account.isLoaded,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		listIndustries: () => {
			dispatch(discovery.listIndustries());
		},
		retrieveProviderAccount: (providerAccountPK) => {
			dispatch(provider_account.retrieveProviderAccount(providerAccountPK));
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProviderProfile);