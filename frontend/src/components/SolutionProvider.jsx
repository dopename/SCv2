import React, { Component } from "react";
import {connect} from "react-redux";

import {solution_provider} from "../actions/index";

class SolutionProvider extends Component {

	componentDidMount() {
		//const { match: { params } } = this.props;
		const providerPK = this.props.match.params.providerPK;
		this.props.retrieveProviderData(providerPK);
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="col-lg-12">
					<h1 className="text-center">{this.props.providerData.name}</h1>
				</div>
				<div className="row">
					<div className="col-lg-6">
						<img className="responsive-image" style={{maxHeight:"200px"}} alt={this.props.providerData.name + " logo"} href={this.props.providerData.logo} />
					</div>
					<div className="col-lg-6 text-center">
						<h3>About us</h3>
						<div className="text-left">
							<p>{this.props.providerData.abous_us}</p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		providerData:state.solution_provider.providerData,
		mobile:state.main
	}
}

const mapDispatchToProps = dispatch => {
	return {
		retrieveProviderData: (providerPK) => {
			dispatch(solution_provider.retrieveProviderData(providerPK));
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SolutionProvider);