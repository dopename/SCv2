import React, { Component } from "react";
import {discovery} from "../actions/index"

import { DumbCheckBox, DumbSubCheckBox } from "./dumb_components/DumbCheckBox";
import { Modal } from "reactstrap";

class SeekerSettings extends Component {

	render() {
		console.log(this.props);
		return (
				<Modal size="lg" isOpen={this.props.modal} toggle={this.props.toggle}>
					<form onSubmit={this.props.submit}>
						{this.props.industries.map(i => (
							<CheckBoxItem item={i} checked={i.categories.map(c => c.pk).some(r => this.props.seeker.categories.map(c => c.pk).includes(r)) ? false : true} checkBox={this.props.checkBox} type="industry" />
							<SubCheckBoxItems items={i.categories} unselected={this.props.discovery.unselectedCategories} checkBox={this.props.checkBox} />
						))}
					</form>
				</Modal>	
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