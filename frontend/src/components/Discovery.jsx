import React, { Component } from "react";
import {connect} from "react-redux";

import {discovery} from "../actions/index"
//import SolutionTiles from "./SolutionTiles"
import DiscoveryTiles from "./DiscoveryTiles"
import "./Discovery.css"
import { DumbCheckBox, DumbSubCheckBox } from "./dumb_components/DumbCheckBox";
import {Button, Modal} from "reactstrap";

class Discovery extends Component {
	constructor(props) {
		super(props)

		this.state = {
			modalOpen:false
		}

		this.toggleModal = this.toggleModal.bind(this);
	}


	componentDidMount() {
		this.props.listIndustries();
	}

	toggleModal() {
		this.setState({modalOpen:!this.state.modalOpen})
	}

	render() {
		console.log("PROPS", this.props);
		//document.body.classList.add("noscroll");
		return (
			<div className="container-fluid h-100">
				<div className="row h-100">
					{!this.props.mobile.isMobile ? 
						(
							<RefineResults discovery={this.props.discovery} checkBox={this.props.checkBox} />
						)
						:
						(
							<Button outline color="info" size="md" onClick={() => this.toggleModal()}>Refine Results</Button>
							<Modal isOpen={this.state.modalOpen} toggle={this.toggleModal}>
								<RefineResults discovery={this.props.discovery} checkBox={this.props.checkBox} />
							</Modal>
						)
					}
					<div className="col-lg-9">
						<div className="row">
							<div className="col-12">
								<h2 className="text-left"><i className="fa fa-globe text-success"></i> Explore Solutions</h2>
							</div>
						</div>
						<DiscoveryTiles auth={this.props.auth}/>
					</div>
				</div>
			</div>
		)
	}
}


const mapStateToProps = state => {
	return {
		discovery:state.discovery,
		mobile:state.main,
		auth:state.auth,
	}
}

const mapDispatchToProps = dispatch => {
	return {
		listIndustries: () => {
			dispatch(discovery.listIndustries());
		},
		checkBox: (pk, model) => {
			dispatch(discovery.checkBox(pk, model));
		},
		resetState: () => {
			dispatch(discovery.resetState());
		},
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Discovery);

class RefineResults extends Component {
	render() {
		return (
			<div className="col-lg-3 text-center discovery-sidebar border border-info">
				<h3 className="mt-2"><i className="fa fa-search"></i> Refine Results</h3>
				<input className="form-control mb-2" type="text" placeholder="What would you like to find?" />
				<div className="text-left discovery-area">
					<div className="text-center discovery-header">
						<h4>Solution Categories</h4>
					</div>
					<div className="discovery-body p-1">
						{this.props.discovery.industries.map(i => (
							<div>
								<DumbCheckBox item={i} checked={i.categories.map(c => c.pk).some(r => this.props.discovery.unselectedCategories.includes(r)) ? false : true} checkBox={this.props.checkBox} type="industry" />
								<DumbSubCheckBox items={i.categories} unselected={this.props.discovery.unselectedCategories} checkBox={this.props.checkBox} />
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}
}