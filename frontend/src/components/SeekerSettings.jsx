import React, { Component } from "react";
import {discovery} from "../actions/index"

class SeekerSettings extends Component {

	componentDidMount() {
		this.props.listIndustries();
	}

	render() {
		console.log(this.props);
		return (
			{this.props.industries.map(i => {
				<div>
					<CheckBoxItem item={i} checked={i.categories.map(c => c.pk).some(r => this.props.discovery.unselectedCategories.includes(r)) ? false : true} checkBox={this.props.checkBox} type="industry" />
					<SubCheckBoxItems items={i.categories} unselected={this.props.discovery.unselectedCategories} checkBox={this.props.checkBox} />
				</div>	
			})}
		)
	}
}

const mapStateToProps = state => {
	return {
		industries:state.discovery.industries
	}
}

const mapDispatchToProps = dispatch => {
	return {
		listIndustries: () => {
			dispatch(discovery.listIndustries());
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SeekerSettings);