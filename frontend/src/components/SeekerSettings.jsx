import React, { Component } from "react";
import {discovery} from "../actions/index"

import { DumbCheckBox, DumbSubCheckBox } from "./dumb_components/DumbCheckBox";
import { Modal } from "reactstrap";
//import CSRFtToken from './csrftoken';

class SeekerSettings extends Component {
	constructor(props) {
		super(props)

		this.state = {
			selectedCategories: [],
			unselectedCategories: [],
			selectedTags: [],
		}

		this.checkBox = this.checkBox.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.tagCheck = this.tagCheck.bind(this);
	}

	componentDidMount() {
		var selectedCategories = this.props.seeker.categories.map(c => c.pk);
		var allCategories = [].concat.apply([], this.props.industries.map(i => i.categories.map(c => c.pk)));
		var unselectedCategories = allCategories.filter(x => !selectedCategories.includes(x));
		var selectedTags = this.props.seeker.tags.map(t => t.pk);
		this.setState({selectedCategories:selectedCategories, unselectedCategories:unselectedCategories, selectedTags:selectedTags});
	}

	checkBox(pk, type) {
		var newSelectedCategories = this.state.selectedCategories;
		var newUnselectedCategories = this.state.unselectedCategories;
		if (type === "industry") {
			let categories = this.props.industries[this.props.industries.map(i => i.pk).indexOf(pk)].categories.map(c => c.pk);
			let numCategories = categories.length;
			let matches = 0;
			categories.map(c => {
				if (this.state.selectedCategories.includes(c)) {
					matches += 1
				}
			})

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
			this.setState({selectedCategories:newSelectedCategories, unselectedCategories:newUnselectedCategories});
		}
		else {
			if (this.state.unselectedCategories.indexOf(pk) < 0) {
				newSelectedCategories.splice(newSelectedCategories.indexOf(pk), 1);
				this.setState({
					unselectedCategories:[...this.state.unselectedCategories, pk],
					selectedCategories: newSelectedCategories
				})
			}
			else {
				newUnselectedCategories.splice(newUnselectedCategories.indexOf(pk), 1);
				this.setState({
					selectedCategories:[...this.state.selectedCategories, pk],
					unselectedCategories: newUnselectedCategories
				})
			}
		}
	}

	tagCheck(pk) {
		var newTags = this.state.selectedTags;
		if (this.state.selectedTags.indexOf(pk) > -1) {
			var newTags = newTags.splice(newTags.indexOf(pk), 1)
		}
		else {
			newTags.push(pk)
		}
		this.setState({newTags:newTags});
	}

	onSubmit(e) {
		e.preventDefault();
		var data = {categories:this.state.selectedCategories, tags:this.state.selectedTags}

		this.props.onSubmit(this.props.seeker.pk, data, this.props.token);
		this.props.toggle();
	}

	render() {
		var cols = [];
		var numPerRow = 3;
		var rows = [];

		var tagCol = [];
		var tagRow = [];

		this.props.industries.map((i, index) => {
			cols.push(
				<div className="col-md-4">
					<DumbCheckBox item={i} checked={i.categories.map(c => c.pk).some(r => this.state.unselectedCategories.includes(r)) ? false : true} center={true} checkBox={this.checkBox} type="industry" />
					<DumbSubCheckBox items={i.categories} unselected={this.state.unselectedCategories} checkBox={this.checkBox} center={true} />
				</div>
			)
		    // if (((index + 1) % numPerRow === 0) || (index + 1 === this.props.industries.length))
		      //}
		  })
		  rows.push(
		    <div className="d-flex flex-wrap flex-row mb-2">
		        {cols}
		    </div>
		   )

		 if (this.props.tags) {
		 	this.props.tags.map(t => {
		 		tagCol.push(
		 			<div className="col-md-4">
		 				<DumbCheckBox item={t} checked={this.state.selectedTags.indexOf(t.pk) < 0 ? false : true} checkBox={this.tagCheck} center={true} />
		 			</div>
		 			)
		 	})
		 }

		 tagRow.push(
		    <div className="d-flex flex-wrap flex-row mb-2">
		        {tagCol}
		    </div>
		 	)

		console.log("PROPS", this.props, "STATE", this.state);
		return (
				<Modal size={this.props.mobile.screen_width > 540 ? "lg" : "md"} isOpen={this.props.open} toggle={this.props.toggle}>
				<h4><i className="fa fa-window-close mx-1 float-right pointer-hand" title="Close" onClick={() => {  this.props.toggle() }}></i></h4>
					<div className="container">
						<h1 className="text-left">What are your interests?</h1>
					</div>
					<form onSubmit={this.onSubmit}>
						<div className="container text-center">
							{rows}
							<h1 className="text-left">Identity Tags</h1>
							{tagRow}
							<input className="btn btn-outline-success btn-lg" type="submit" value="Update" />
						</div>
					</form>
				</Modal>	
		)
	}
}

export default SeekerSettings;