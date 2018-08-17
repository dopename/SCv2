import React, { Component } from "react";

export default class MediaForm extends Component {
	constructor(props) {
		super(props)
		//All of the fields in the solution table (that can be changed)
		//Props should include: submit() - this is run on form submit, industries - for listing out industries select box
		//and categories - for listing out categories select box
		this.state = {
			file:"",
			title:"",
			description:"",
			location:"",
			solutionmedia:this.props.solutionmediaPK

			allLocations:[]
		}

		this.handleChange = this.handleChange.bind(this);
		this.fileHandleChange = this.fileHandleChange.bind(this);
		this.cleanData = this.cleanData.bind(this);
		//this.loadImageFromUrl = this.loadImageFromUrl.bind(this);
	}

	componentDidMount() {
		// if (this.props.existingSolution) {
		// 	//Copy prop into new variable so I don't edit the prop
		// 	var solutionData = {...this.props.existingSolution}
		// 	delete solutionData.pk;
		// 	delete solutionData.views;
		// 	solutionData.tags = solutionData.tags.map(t => t.pk.toString());
		// 	solutionData.industry = solutionData.industry.toString();
		// 	// solutionData.category = solutionData.category[0].toString();
		// 	this.loadImageFromUrl(solutionData.main_image)
		// 	.then(data => { 
		// 		console.log(data);
		// 		this.setState({...solutionData, main_image:data})
		// 	})
		// 	//Set information to the solution being edited
		// }
		const url = "api/list/medialocation/"

		fetch(url)
			.then(response => {
				if (response.ok) {
					return response.json()
				}
			})
			.then(json => {
				this.setState({allLocations:json})
			})
	}

	//type either image or video
	// loadFileFromUrl(url, type) {
	// 	var filename = url.split('/')[url.split('/').length - 1]
	// 	var fileType = filename.split('.')[1]
	// 	return fetch(url)
	// 		.then(res => res.arrayBuffer())
	// 		.then(buf => new File([buf], filename, {type:type + "/" + fileType}))
	// }

	//Default change handler
	handleChange(e) {
		this.setState({[e.target.name]:e.target.value});
	}

	//Need to add the file to state
	fileHandleChange(e) {
		this.setState({file:e.target.files[0]});
	}

	cleanData(e) {
		e.preventDefault();

		var data = {...this.state}

		delete data.allLocations;

		this.props.submit(data);
	}

	render() {
		const locationSelect = 		(<select name="location" className="form-control" value={this.state.location} onChange={this.handleChange}>
									{this.state.allLocations.map((l) => 
										<option key={"location_" + l.pk} value={l.pk}>{l.location_name}</option>
									)}
								</select>)

		return (
			<form onSubmit={this.cleanData}>
				<div className="container-fluid">
					<h1 className="text-left">Add Media for {this.props.solution_title}</h1>
				  	<div className="row my-2">
						<div className="col-lg-12">
							<label for="title">Title</label>
							<input className="form-control" name="title" type="text" onChange={this.handleChange} value={this.state.title} />
						</div>
					</div>
				  	<div className="row my-2">
						<div className="col-lg-12">
							<label for="description">Description</label>
							<input className="form-control" name="description" type="text" onChange={this.handleChange} value={this.state.description} />
						</div>
					</div>
				  	<div className="row my-2">
				  		<div className="col-lg-6">
				  			<label for="file">Media File</label>
				  			<p className="text-primary">{this.state.file.name ? "Current: " + this.state.file.name : null}</p>
				  			<input className="form-control" type="file" onChange={this.fileHandleChange} name="file" />
				  		</div>
				  		<div className="col-lg-6">
				  			<label for="location">Location</label>
				  			{ locationSelect }
				  		</div>
					</div>
				  	<div className="col-4 m-auto">
				  		<input type="submit" className="btn btn-block btn-outline-success" value="Submit" />
				  	</div>
				</div>
			</form>

		)
	}
}