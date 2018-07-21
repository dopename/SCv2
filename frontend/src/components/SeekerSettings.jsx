import React, { Component } from "react";
import {discovery} from "../actions/index"

import { DumbCheckBox, DumbSubCheckBox } from "./dumb_components/DumbCheckBox";
import { Modal } from "reactstrap";

class SeekerSettings extends Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedCategories: [],
		}
	}

	componentDidMount() {
		this.setState({selectedCategories:this.props.seeker.categories.map(c => c.pk)})
	}

	render() {
		console.log("PROPS", this.props, "STATE", this.state);
		return (
				<Modal size="lg" isOpen={this.props.open} toggle={this.props.toggle}>
					<form onSubmit={this.props.onSubmit}>
						{this.props.industries.map(i => (
							<DumbCheckBox item={i} checked={i.categories.map(c => c.pk).some(r => this.props.seeker.categories.map(c => c.pk).includes(r)) ? false : true} checkBox={this.props.checkBox} type="industry" />
							<DumbSubCheckBox items={i.categories} unselected={this.props.discovery.unselectedCategories} checkBox={this.props.checkBox} />
						))}
						<input type="submit" value="Update" />
					</form>
				</Modal>	
		)
	}
}

export default SeekerSettings;