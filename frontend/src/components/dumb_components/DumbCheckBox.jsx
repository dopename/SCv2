import React, { Component } from "react";

//checkbox with a title/description. Pass whether it is checked, and what to do onClick
export class DumbCheckBox extends Component {
	render() {
		return (
			<div className={"input-group" + (this.props.center ? " text-center" : "")}>
				<div className="input-group-prepend">
					<input className="mt-1" type="checkbox" onClick={() => this.props.checkBox(this.props.item.pk, this.props.type)} checked={this.props.checked} />
				</div>
				<p className={"mb-0 ml-1" + (this.props.type === "industry" ? " font-weight-bold" : "")}>{this.props.item.name}</p>
			</div>
		)
	}
}

//Creates an unordered list of DumbCheckBoxes. 
export class DumbSubCheckBox extends Component {
	render() {
		return (
			<ul className={"mb-0" + (this.props.center ? " text-center" : "")}>
				{this.props.items.map(e => (
					<li><DumbCheckBox item={e} checked={this.props.unselected.indexOf(e.pk) > -1 ? false : true} checkBox={this.props.checkBox} type="category" /></li>
				))}
			</ul>
		)
	}
}

