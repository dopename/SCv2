import React, { Component } from "react";

export class DumbCheckBox extends Component {
	render() {
		return (
			<div className="input-group">
				<div className="input-group-prepend">
					<input className="mt-1" type="checkbox" onClick={() => this.props.checkBox(this.props.item.pk, this.props.type)} checked={this.props.checked} />
				</div>
				<h5 className={"mb-1" + this.props.type === "industry" ? " font-weight-bold" : ""}>{this.props.item.name}</h5>
			</div>
		)
	}
}

export class DumbSubCheckBox extends Component {
	render() {
		return (
			<ul className="mb-0">
				{this.props.items.map(e => (
					<li><DumbCheckBox item={e} checked={this.props.unselected.indexOf(e.pk) > -1 ? false : true} checkBox={this.props.checkBox} type="category" /></li>
				))}
			</ul>
		)
	}
}

