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
			<div className="container-md container border mt-2">
				<div className="row">
					<div className="col-lg-2">
						<img className="responsive-image m-auto" style={{maxHeight:"200px"}} alt={this.props.providerData.name + " logo"} src={this.props.providerData.logo} />
					</div>
					<div className="col-lg-6 border-bottom mb-2">
						<h1 className="text-center">{this.props.providerData.name}</h1>
						<p className="text-center"><i>{this.props.providerData.tagline}</i></p>
					</div>
					<div className="col-lg-4">
						<p>www.marinibank.com</p>
						<p>Social links to go here</p>
					</div>
				</div>
				<div className="row mb-2 pb-2 border-bottom">
					<div className="col-lg-6">
						<h3 className="text-center">Who make solutions for:</h3>
						{this.props.providerData ? <Tags tags={this.props.providerData.child_tags} /> : <div className="loader"></div>}
					</div>
					<div className="col-lg-6 border-left">
						<h3 className="text-center">Industries we're in:</h3>
						{this.props.providerData ? <Tags tags={this.props.providerData.child_ind_cat} /> : <div className="loader"></div>}
					</div>
				</div>
				<div className="col-lg-12">
					<div className="text-left">
						<p>{this.props.providerData.about_us}</p>
					</div>
				</div>
				<div id="solutions">
					<h3 className="text-left">Solutions by {this.props.providerData.name}</h3>
					{this.props.providerData ? <ProviderTiles solutions={this.props.providerData.solutions} /> : <div className="loader"></div>}
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