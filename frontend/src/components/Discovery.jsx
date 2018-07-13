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
						</div>
					</div>
					<div className="col-lg-9">
					</div>
				</div>
			</div>
		)
	}
}

							// {this.props.discovery.industries.map(i => (
							// 	<div>
							// 		<CheckBoxItem item={i} checked={this.props.discovery.selectedIndustries.indexOf(i.pk) > -1 ? true : false} checkBox={this.props.checkBox} />
							// 		<SubCheckBoxItems items={i.categories} checked={this.props.discovery.selectedCategories} />
							// 	</div>
							// ))}

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
		checkBox: (pk) => {
			dispatch(discovery.checkBox(pk));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Discovery);

class CheckBoxItem extends Component {
	render() {
		return (
			<div className="input-group">
				<div className="input-group-prepend">
					<input type="checkbox" onClick={() => this.props.checkBox(this.props.item.pk)} checked={this.props.checked} />
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
					<li className="list-group-item"><CheckBoxItem item={e} checked={this.props.checked.indexOf(e.pk) > -1 ? true : false} checkBox={null} /></li>
				))}
			</ul>
		)
	}
}