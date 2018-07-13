import React, { Component } from "react";
import {connect} from "react-redux";

import {discovery} from "../actions/index"

class Discovery extends Component {

	componentDidMount() {
		this.props.listIndustries();
	}

	render() {
		console.log("PROPS", this.props);

		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-3 text-center">
						<h3>Starter Nav</h3>
						<div className="text-left">
							{this.props.discovery.industries.map(i => (
								<div>
									<CheckBoxItem item={i} checked={i.categories.map(c => c.pk).some(r => this.props.discovery.unselectedCategories.includes(r)) ? false : true} checkBox={this.props.checkBox} type="industry" />
									<SubCheckBoxItems items={i.categories} unselected={this.props.discovery.unselectedCategories} />
								</div>
							))}
						</div>
					</div>
					<div className="col-lg-9">
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
		checkBox: (pk, type) => {
			dispatch(discovery.checkBox(pk, type));
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
				<h3>{this.props.item.name}</h3>
			</div>
		)
	}
}

class SubCheckBoxItems extends Component {
	render() {
		return (
			<ul className="list-group list-group-flush">
				{this.props.items.map(e => (
					<li className="list-group-item"><CheckBoxItem item={e} checked={this.props.unselected.indexOf(e.pk) > -1 ? true : false} checkBox={null} type="category" /></li>
				))}
			</ul>
		)
	}
}