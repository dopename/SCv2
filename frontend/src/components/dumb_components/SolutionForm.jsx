import React, { Component } from "react";

export default class SolutionForm extends Component {
	constructor(props) {
		super(props)
		//All of the fields in the solution table (that can be changed)
		//Props should include: submit() - this is run on form submit, industries - for listing out industries select box
		//and categories - for listing out categories select box
		this.state = {
			category:-1,
			how:"",
			industry:-1,
			integration:"",
			main_image:"",
			name:"",
			provider:this.props.providerPK,
			opportunity:"",
			status:"",
			status_date:"",
			tags:[],
			what:"",
			why:"",
		}

		this.handleChange = this.handleChange.bind(this);
		this.fileHandleChange = this.fileHandleChange.bind(this);
		this.handleSelectChange = this.handleSelectChange.bind(this);
		this.cleanData = this.cleanData.bind(this);
		this.handleTagSelect = this.handleTagSelect.bind(this);
		this.loadImageFromUrl = this.loadImageFromUrl.bind(this);
	}

	componentDidMount() {
		if (this.props.existingSolution) {
			//Copy prop into new variable so I don't edit the prop
			var solutionData = {...this.props.existingSolution}
			delete solutionData.pk;
			delete solutionData.views;
			solutionData.tags = solutionData.tags.map(t => t.pk.toString());
			solutionData.industry = solutionData.industry.toString();
			// solutionData.category = solutionData.category[0].toString();
			this.loadImageFromUrl(solutionData.main_image)
			.then(data => { 
				console.log(data);
				this.setState({...solutionData, main_image:data})
			})
			//Set information to the solution being edited
		}
	}

	loadImageFromUrl(url) {
		var filename = url.split('/')[url.split('/').length - 1]
		var fileType = filename.split('.')[1]
		return fetch(url)
			.then(res => res.arrayBuffer())
			.then(buf => new File([buf], filename, {type:'image/'+fileType}))
	}

	//Default change handler
	handleChange(e) {
		this.setState({[e.target.name]:e.target.value});
	}

	handleSelectChange(e) {
		console.log(e.target, this.state);
		this.setState({[e.target.name]:e.target.value});
	}

	//Need to add the file to state
	fileHandleChange(e) {
		this.setState({main_image:e.target.files[0]});
	}

	handleTagSelect(e) {
		var options = e.target.options;
		var value = [];
		for (var i = 0, l = options.length; i < l; i++) {
			if (options[i].selected) {
				value.push(options[i].value);
			}
		}
		console.log("new tags value" , value);
		this.setState({tags:value});
	}

	cleanData(e) {
		e.preventDefault();
		var category = [];
		var tags = [];

		this.state.tags.map(t => {
			tags.push(t);
		})
		category.push(this.state.category);

		var data = {...this.state, category:category, tags:tags}
		this.props.submit(data)
	}

	render() {
		console.log(this.props, this.state);
		const industrySelect = 	(<select name="industry" className="form-control" value={this.state.industry} onChange={this.handleSelectChange}>
									<option disabled selected value> -- select an option -- </option>
									{this.props.industries.map((i) =>
										<option key={"industry_"+i.pk} value={i.pk}>{i.name}</option>
									)}
								</select>)

		const statusSelect = 	(<select name="status" className="form-control" value={this.state.status} onChange={this.handleSelectChange}>
									<option disabled selected value> -- select an option -- </option>
									<option value="Emerging soon" key="SO_1">Emerging soon:</option>
									<option value="Available since" key="SO_2">Available since:</option>
								</select>)


		const categorySelect = 	(<select name="category" className="form-control" value={this.state.category} onChange={this.handleSelectChange}>
									<option disabled selected value> -- select an option -- </option>
									{this.props.categories.map((c) => {
										if (c.industry.toString() === this.state.industry) {
											return (<option key={"category_" + c.pk} value={c.pk}>{c.name}</option>)
										}}
									)}
								</select>)

		const tagSelect = 		(<select multiple="multiple" className="form-control" value={this.state.tags} onChange={this.handleTagSelect}>
									{this.props.allTags.map((tag) => 
										// tagOptions.push({ value:tag.pk, label:tag.name});
										<option key={"tag_" + tag.pk} value={tag.pk}>{tag.name}</option>
									)}
								</select>)

		return (
			<form onSubmit={this.cleanData}>
				<div className="container-fluid">
					<h1 className="text-left">{this.props.title} Soution</h1>
				  	<div className="row my-2">
						<div className="col-lg-4">
							<label for="name">Name</label>
							<input className="form-control" name="name" type="text" onChange={this.handleChange} value={this.state.name} />
						</div>
						<div className="col-lg-4">
							<label for="industry">Industry</label>
							{ industrySelect }
						</div>
						<div className="col-lg-4">
							<label for="category">Category</label>
							{ categorySelect }
						</div>
					</div>
				  	<div className="row my-2">
						<div className="col-lg-4">
							<label for="tags">Tags</label>
							{ tagSelect }
							<p className="text-primary text-center"><small>Hold CTRL to select multiple</small></p>
						</div>
						<div className="col-lg-4">
							<label for="status">Status</label>
							{ statusSelect }
						</div>
						<div className="col-lg-4">
							<label for="status_date">Status Date</label>
							<input className="form-control" name="status_date" type="text" onChange={this.handleChange} value={this.state.status_date} />
						</div>
					</div>
				  	<div className="row my-2">
						<div className="col-lg-12">
							<label for="what">What</label>
							<input className="form-control" name="what" type="text" onChange={this.handleChange} value={this.state.what} />
						</div>
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
				  			<label for="main_image">Main Image</label>
				  			<p className="text-primary">{this.state.main_image.name ? "Current: " + this.state.main_image.name : null}</p>
				  			<input className="form-control" type="file" onChange={this.fileHandleChange} name="main_image" />
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