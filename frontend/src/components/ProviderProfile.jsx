import React, { Component } from "react";
import {connect} from "react-redux";

import {auth, main, discovery, provider_account} from "../actions/index";

class ProviderProfile extends Component {

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

	render() {
		console.log(this.props);
		if (this.props.isLoaded === true) {
			return (
				<div>
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
				</div>
			)
		}
		else {
			return (<div className="loader"></div>)
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