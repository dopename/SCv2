import React, { Component } from "react";
import {connect} from "react-redux";

import Tags from "./dumb_components/Tags";
import {solution_provider} from "../actions/index";

import ProviderTiles from "./ProviderTiles";

class SolutionProvider extends Component {

	componentDidMount() {
		//const { match: { params } } = this.props;
		const providerPK = this.props.match.params.providerPK;
		this.props.retrieveProviderData(providerPK);
	}

	render() {
		console.log(this.props);

		return (
			<div className="container border mt-2">
				<div className="col-lg-12 border-bottom mb-2">
					<h1 className="text-center">{this.props.providerData.name}</h1>
					<p className="text-center"><i>{this.props.providerData.tagline}</i></p>
				</div>
				<div className="row border-bottom mb-2">
					<div className="col-lg-6 border-right text-center">
						<img className="responsive-image m-auto" style={{maxHeight:"200px"}} alt={this.props.providerData.name + " logo"} src={this.props.providerData.logo} />
					</div>
					<div className="col-lg-6 text-center">
						<h3>About us</h3>
						<div className="text-left">
							<p>{this.props.providerData.about_us}</p>
						</div>
					</div>
				</div>
				<div className="row mb-2 pb-2 border-bottom">
					<div className="col-lg-6">
						<h3 className="text-center">Who we serve</h3>
						{this.props.providerData ? <Tags tags={this.props.providerData.child_tags} /> : "Loading..."}
					</div>
					<div className="col-lg-6">
						<h3 className="text-center">Industries & Categories</h3>
						{this.props.providerData ? <Tags tags={this.props.providerData.child_ind_cat} /> : "Loading..."}
					</div>
				</div>
				<div>
					<h3 className="text-center">Our Solutions</h3>
					{this.props.providerData ? <ProviderTiles providerSolutions={this.props.providerData.solutions} /> : "Loading..."}
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