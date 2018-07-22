import React, { Component } from "react";
import {discovery} from "../actions/index"

import { DumbCheckBox, DumbSubCheckBox } from "./dumb_components/DumbCheckBox";
import { Modal } from "reactstrap";

class SeekerSettings extends Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedCategories: [],
			unselectedCategories: [],
		}

		this.checkBox = this.checkBox.bind(this);
	}

	componentDidMount() {
		var selectedCategories = this.props.seeker.categories.map(c => c.pk);
		var allCategories = [].concat.apply([], this.props.industries.map(i => i.categories.map(c => c.pk)));
		var unselectedCategories = allCategories.filter(x => !selectedCategories.includes(x));
		this.setState({selectedCategories:selectedCategories, unselectedCategories:unselectedCategories});
	}

	checkBox(pk, type) {
		if (type === "industry") {
			let categories = this.props.industries[this.props.industries.map(i => i.pk).indexOf(pk)].categories.map(c => c.pk);
			let numCategories = categories.length;
			let matches = 0;
			categories.map(c => {
				if (this.state.selectedCategories.includes(c)) {
					matches += 1
				}
			})

			let newSelectedCategories = this.state.selectedCategories;
			let newUnselectedCategories = this.state.unselectedCategories;
			if (matches === numCategories) {
				categories.map(c => {
					newSelectedCategories.splice(newSelectedCategories.indexOf(c), 1);
					newUnselectedCategories.push(c);
				})
			}
			else {
				categories.map(c => {
					if (newUnselectedCategories.indexOf(c) > -1) {
						newUnselectedCategories.splice(newUnselectedCategories.indexOf(c), 1);
						newSelectedCategories.push(c);
					}
				})
			}
			console.log("CATEGORIES", categories, "NEW SELECTED", newSelectedCategories, "NEW UNSELECTED", newUnselectedCategories);
			this.setState({selectedCategories:newSelectedCategories, unselectedCategories:newUnselectedCategories});
		}
		else {
			if (this.state.unselectedCategories.indexOf(pk) < 0) {
				let newData = this.state.selectedCategories.filter(c => c.pk !== pk);
				this.setState({
					unselectedCategories:[...this.state.unselectedCategories, pk],
					selectedCategories:newData
				})
			}
			else {
				let newData = this.state.unselectedCategories.filter(c => c.pk !== pk);
				this.setState({
					selectedCategories:[...this.state.selectedCategories, pk],
					unselectedCategories:newData
				})
			}
		}
	}

	render() {
		console.log("PROPS", this.props, "STATE", this.state);
		return (
				<Modal size="lg" isOpen={this.props.open} toggle={this.props.toggle}>
					<form onSubmit={this.props.onSubmit}>
						{this.props.industries.map(i => (
							<div>
								<DumbCheckBox item={i} checked={i.categories.map(c => c.pk).some(r => this.state.unselectedCategories.includes(r)) ? false : true} checkBox={this.checkBox} type="industry" />
								<DumbSubCheckBox items={i.categories} unselected={this.state.unselectedCategories} checkBox={this.checkBox} />
							</div>
						))}
						<input type="submit" value="Update" />
					</form>
				</Modal>	
		)
	}
}

export default SeekerSettings;