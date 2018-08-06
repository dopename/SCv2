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
		var selectedCategories = this.props.seeker.categories.map(c => c.pk); //PK of categories returned by seeker are selected
		var allCategories = [].concat.apply([], this.props.industries.map(i => i.categories.map(c => c.pk))); //Get all categories (they're returned in Industries endpoint)
		var unselectedCategories = allCategories.filter(x => !selectedCategories.includes(x)); //Unselected is all of the categories that aren't selected
		var selectedTags = this.props.seeker.tags.map(t => t.pk); //Need less logic with this one (no parent relationship) - just copy tags from seeker
		this.setState({selectedCategories:selectedCategories, unselectedCategories:unselectedCategories, selectedTags:selectedTags});
	}

	//Function for managing which Categories are checked.
	//Filterting only goes by Category - function makes sure that if parent is clicked, it checks its children (same with uncheck)
	checkBox(pk, type) {
		var newSelectedCategories = this.state.selectedCategories; //copy state into new variables - not editing directly
		var newUnselectedCategories = this.state.unselectedCategories;

		if (type === "industry") {
			let categories = this.props.industries[this.props.industries.map(i => i.pk).indexOf(pk)].categories.map(c => c.pk); //Get all the categories for the industry
			let numCategories = categories.length; //Get the count of categories
			let matches = 0;
			categories.map(c => {
				if (this.state.selectedCategories.includes(c)) {
					matches += 1; //Increment matches if theres a match..
				}
			})

			if (matches === numCategories) { //If all of them are checked..
				categories.map(c => {
					newSelectedCategories.splice(newSelectedCategories.indexOf(c), 1); //Cut them out of "Selected Categories"
					newUnselectedCategories.push(c); //Append them to Unselected
				})
			}
			else {
				categories.map(c => {
					if (newUnselectedCategories.indexOf(c) > -1) { //Do the opposite if not checked
						newUnselectedCategories.splice(newUnselectedCategories.indexOf(c), 1);
						newSelectedCategories.push(c);
					}
				})
			}
			this.setState({selectedCategories:newSelectedCategories, unselectedCategories:newUnselectedCategories});
		}
		else { //If its a childe element, more simple logic.
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

	//Managing which Identity tags are currently checked.
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