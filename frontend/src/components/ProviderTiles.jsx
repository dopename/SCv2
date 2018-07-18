import React, { Component } from "react";
import {connect} from "react-redux";

import { fetchAPICall } from "../helpers/index";
import DumbTiles from "./dumb_components/DumbTiles";


class ProviderTiles extends Component {

	state = {
		solutions: []
	}

	//Pull in API query from helpers - get solution data
	componentDidMount() {
		if (this.props.solutions) {
			let queries = fetchAPICall(this.props.solutions);

			Promise.all(queries).then(returnData => {
				this.setState({
					solutions:returnData
				})
			})
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.solutions !== prevProps.solutions) {
			let queries = fetchAPICall(this.props.solutions);

			Promise.all(queries).then(returnData => {
				this.setState({
					solutions:returnData
				})
			})
		}
	}

	render() {
		return (
			<div>
				<DumbTiles solutions={this.state.solutions} size="lg" screen_height={this.props.mobile.screen_height} screen_width={this.props.mobile.screen_width} />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		mobile:state.main,
	}
}

export default connect(mapStateToProps)(ProviderTiles);