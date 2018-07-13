import React, { Component } from "react";
import {connect} from "react-redux";

import {discovery} from "../actions/index"
import SolutionTiles from "./SolutionTiles"
import "./Discovery.css"

class Discovery extends Component {

	componentDidMount() {
		this.props.listIndustries();
	}

	render() {
		console.log("PROPS", this.props);

		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-3 text-center discovery-sidebar">
						<h3><i className="fa fa-search"></i> Refine Results</h3>
						<input className="form-control mb-2" type="text" placeholder="What would you like to find?" />
						<div className="text-left discovery-area">
							<div className="text-center discovery-header">
								<h4>Solution Categories</h4>
							</div>
							{this.props.discovery.industries.map(i => (
								<div>
									<CheckBoxItem item={i} checked={i.categories.map(c => c.pk).some(r => this.props.discovery.unselectedCategories.includes(r)) ? false : true} checkBox={this.props.checkBox} type="industry" />
									<SubCheckBoxItems items={i.categories} unselected={this.props.discovery.unselectedCategories} checkBox={this.props.checkBox} />
								</div>
							))}
						</div>
					</div>
					<div className="col-lg-9">
						<SolutionTiles />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		discovery:state.discovery
	}
}

const mapDispatchToProps = dispatch => {
	return {
		listIndustries: () => {
			dispatch(discovery.listIndustries());
		},
		checkBox: (pk, model) => {
			dispatch(discovery.checkBox(pk, model));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Discovery);

class CheckBoxItem extends Component {
	render() {
		return (
			<div className="input-group">
				<div className="input-group-prepend">
					<input type="checkbox" onClick={() => this.props.checkBox(this.props.item.pk, this.props.type)} checked={this.props.checked} />
				</div>
				<h5 className={this.props.type === "industry" ? "font-weight-bold" : ""}>{this.props.item.name}</h5>
			</div>
		)
	}
}

class SubCheckBoxItems extends Component {
	render() {
		return (
			<ul>
				{this.props.items.map(e => (
					<li><CheckBoxItem item={e} checked={this.props.unselected.indexOf(e.pk) > -1 ? false : true} checkBox={this.props.checkBox} type="category" /></li>
				))}
			</ul>
		)
	}
}