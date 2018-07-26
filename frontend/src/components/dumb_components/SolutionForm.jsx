import React, { Component } from "react";

export default class SolutionForm extends Component {
	constructor(props) {
		super(props)
		//All of the fields in the solution table (that can be changed)
		this.state = {
			category:-1,
			how:"",
			industry:-1,
			integration:"",
			main_image:"",
			name:"",
			opportunity:"",
			status:"",
			status_date:"",
			tags:[],
			what:"",
			why:"",
		}
	}

	//Default change handler
	handleChange(e) {
		this.setState({[e.target.name]:e.target.value});
	}

	//Need to add the file to state
	fileHandleChange(e) {
		this.setState({main_image:e.target.files[0]});
	}

	render() {
		const industrySelect = 	(<select name="industry" className="form-control" value={this.state.industry} onChange={this.handleChange}>
									<option disabled selected value> -- select an option -- </option>
									{this.props.industries.map((i) =>
										<option key={"industry_"+i.pk} value={i.pk}>{i.name}</option>
									)}
								</select>)

		const statusSelect = 	(<select name="status" className="form-control" value={this.state.status} onChange={this.handleChange}>
									<option disabled selected value> -- select an option -- </option>
									<option value="Emerging soon:" key="SO_1">Emerging soon:</option>
									<option value="Available since:" key="SO_2">Available since:</option>
								</select>)


		const categorySelect = 	(<select name="category" className="form-control" value={this.state.category} onChange={this.handleChange}>
									<option disabled selected value> -- select an option -- </option>
									{this.props.categories.map((c) =>
										<option key={"category_" + c.pk} value={c.pk}>{c.name}</option>
									)}
								</select>)

		return (
			<form onSubmit={this.props.submit}>
				<div className="container-fluid">
				  	<div className="row my-2">
						<div className="col-lg-4">
							<label for="name">Name</label>
							<input className="form-control" name="name" type="text" onChange={this.handleChange} value={this.state.name} />
						</div>
						<div className="col-lg-4">
							<label for="what">What</label>
							<input className="form-control" name="what" type="text" onChange={this.handleChange} value={this.state.what} />
						</div>
						<div className="col-lg-4">
							<label for="status">Status</label>
							{ statusSelect }
						</div>
					</div>
				  	<div className="row my-2">
						<div className="col-lg-6">
							<label for="industry">Industry</label>
							{ industrySelect }
						</div>
						<div className="col-lg-6">
							<label for="category">Category</label>
							{ categorySelect }
						</div>
					</div>
				  	<div className="row my-2">
				  		<div className="col-lg-12">
				  			<label for="why">Why it exists</label>
				  			<textarea className="form-control" value={this.state.why} onChange={this.handleChange} name="why"></textarea>
				  		</div>
					</div>
				  	<div className="row my-2">
				  		<div className="col-lg-12">
				  			<label for="how">How it works</label>
				  			<textarea className="form-control" value={this.state.how} onChange={this.handleChange} name="how"></textarea>
				  		</div>
				  	</div>
				  	<div className="row my-2">
				  		<div className="col-lg-12">
				  			<label for="opportunity">Opportunity</label>
				  			<textarea className="form-control" value={this.state.opportunity} onChange={this.handleChange} name="opportunity"></textarea>
				  		</div>
					</div>
				  	<div className="row my-2">
				  		<div className="col-lg-12">
				  			<label for="integration">How to integrate</label>
				  			<textarea className="form-control" value={this.state.integration} onChange={this.handleChange} name="integration"></textarea>
				  		</div>
				  	</div>
				  	<div className="row my-2">
				  		<div className="col-lg-6 m-auto">
				  			<label for="main_picture">Main Picture</label>
				  			<input className="form-control" type="file" onChange={this.fileHandleChange} name="main_picture" />
				  		</div>
				  	</div>
				</div>
			</form>

		)
	}
}