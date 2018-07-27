import React, { Component } from "react";
import {connect} from "react-redux";

import {discovery} from "../actions/index"
//import SolutionTiles from "./SolutionTiles"
import DiscoveryTiles from "./DiscoveryTiles"
import "./Discovery.css"
import { DumbCheckBox, DumbSubCheckBox } from "./dumb_components/DumbCheckBox";

class Discovery extends Component {

	componentDidMount() {
		this.props.listIndustries();
	}

	render() {
		console.log("PROPS", this.props);

		return (
			<div className="container-fluid h-100">
				<div className="row h-100">
					<div className="col-lg-3 text-center discovery-sidebar border border-info">
						<h3 className="mt-2"><i className="fa fa-search"></i> Refine Results</h3>
						<input className="form-control mb-2" type="text" placeholder="What would you like to find?" />
						<div className="text-left discovery-area">
							<div className="text-center discovery-header">
								<h4>Solution Categories</h4>
							</div>
							<div className="discovery-body p-1">
								{this.props.discovery.industries.map(i => (
									<div>
										<DumbCheckBox item={i} checked={i.categories.map(c => c.pk).some(r => this.props.discovery.unselectedCategories.includes(r)) ? false : true} checkBox={this.props.checkBox} type="industry" />
										<DumbSubCheckBox items={i.categories} unselected={this.props.discovery.unselectedCategories} checkBox={this.props.checkBox} />
									</div>
								))}
							</div>
						</div>
					</div>
					<div className="col-lg-9">
						<div className="row">
							<div className="col-12">
								<h2 className="text-left"><i className="fa fa-globe text-success"></i> Explore Solutions</h2>
							</div>
						</div>
						<DiscoveryTiles auth={this.props.auth}/>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		discovery:state.discovery,
		mobile:state.main,
		auth:state.auth,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		listIndustries: () => {
			dispatch(discovery.listIndustries());
		},
		checkBox: (pk, model) => {
			dispatch(discovery.checkBox(pk, model));
		},
		resetState: () => {
			dispatch(discovery.resetState());
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Discovery);

class CheckBoxItem extends Component {
	render() {
		return (
			<div className="input-group">
				<div className="input-group-prepend">
					<input className="mt-1" type="checkbox" onClick={() => this.props.checkBox(this.props.item.pk, this.props.type)} checked={this.props.checked} />
				</div>
				<h5 className={"mb-1" + this.props.type === "industry" ? " font-weight-bold" : ""}>{this.props.item.name}</h5>
			</div>
		)
	}
}

class SubCheckBoxItems extends Component {
	render() {
		return (
			<ul className="mb-0">
				{this.props.items.map(e => (
					<li><CheckBoxItem item={e} checked={this.props.unselected.indexOf(e.pk) > -1 ? false : true} checkBox={this.props.checkBox} type="category" /></li>
				))}
			</ul>
		)
	}
}