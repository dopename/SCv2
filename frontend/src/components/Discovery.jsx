import React, { Component } from "react";
import {connect} from "react-redux";

import {discovery} from "../actions/index"

class Discovery extends Component {

	componentDidMount() {
		this.props.listIndustries();
	}

	render() {
		console.log("PROPS", this.props);

		return (
			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-3 text-center">
						<h3>Starter Nav</h3>
						<div className="text-left">
							{this.props.discovery.industries.map(i => (
								<div className="input-group">
									<div className="input-group-prepend">
										<input type="checkbox" checked={this.props.discovery.selectedIndustries.indexOf(i.pk) > -1 ? {true} : {false}} />
									</div>
									<h3>{i.name}</h3>
								</div>
							))}
						</div>
						<DiscoveryNavigation industries={this.props.discovery.industries} />
					</div>
					<div className="col-lg-9">
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		discovery:state.discovery
	}
}

const mapDispatchToProps = dispatch => {
	return {
		listIndustries: () => {
			dispatch(discovery.listIndustries());
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Discovery);

