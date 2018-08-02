import React, { Component } from "react";
import {connect} from "react-redux";

import Tags from "./dumb_components/Tags";
import {solution_provider} from "../actions/index";

import ProviderTiles from "./ProviderTiles";
import "./SolutionProvider.css"

class SolutionProvider extends Component {

	componentDidMount() {
		//const { match: { params } } = this.props;
		const providerPK = this.props.match.params.providerPK;
		this.props.retrieveProviderData(providerPK);
	}

	render() {
		console.log(this.props);

		return (
			<div className="container-fluid mt-4">
				<div className="row">
					<div className="col-lg-1 d-none d-sm-block">
					</div>
					<div className="col-lg-10 m-auto">
						<div className="row">
							<div className="col-lg-2">
								<img className="responsive-image m-auto" style={{maxHeight:"200px"}} alt={this.props.providerData.name + " logo"} src={this.props.providerData.logo} />
							</div>
							<div className="col-lg-8">
								<table>
									<tbody>
										<tr>
											<td><h1 className="text-left text-primary mt-3">{this.props.providerData.name}</h1></td>
										</tr>
										<tr>
											<td><p className="text-left"><i>{this.props.providerData.tagline}</i></p></td>
										</tr>
									</tbody>
								</table>
							</div>
							<div className="col-lg-2">
								<div className="d-flex flex-column-reverse h-100">
									<div className="p-2"><h5 className="d-flex flex-row text-primary"><i className="fa fa-linkedin-square mx-2"></i><i className="fa fa-twitter mx-2"></i><i className="fa fa-facebook-official mx-2"></i></h5></div>
									<div className="p-2">www.marinibank.com</div>
								</div>
							</div>
						</div>
						<hr className="mb-2" style={{borderBottom:"dotted black 1px"}} />
						<div className="col-12 border-bottom">
							<h5 className="d-inline mx-2 text-primary">Overview</h5>
							<h5 className="d-inline mx-2 text-primary">Solutions</h5>
							<h5 className="d-inline mx-2 text-primary">About</h5>
						</div>
						<div className="row my-4 pt-2">
							<div className="col-lg-6">
								<div className="provider-tags p-2">
									<h4 className="text-left">We make solutions for:</h4>
									{this.props.providerData ? <Tags tags={this.props.providerData.child_tags} /> : <div className="loader"></div>}
								</div>
							</div>
							<div className="col-lg-6">
								<div className="provider-tags p-2">
									<h4 className="text-left">Industries we're in:</h4>
									{this.props.providerData ? <Tags tags={this.props.providerData.child_ind_cat} /> : <div className="loader"></div>}
								</div>
							</div>
						</div>
						<div className="col-lg-12">
							<div className="text-left p-4">
								<p>{this.props.providerData.about_us}</p>
							</div>
						</div>
						<div id="solutions" className="pt-3" style={{borderTop:"dotted black 1px"}}>
							<h3 className="text-left mt-2 text-primary">Solutions by {this.props.providerData.name}</h3>
							{this.props.providerData ? <ProviderTiles solutions={this.props.providerData.solutions} /> : <div className="loader"></div>}
						</div>
					</div>
					<div className="col-lg-1 d-none d-sm-block">
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