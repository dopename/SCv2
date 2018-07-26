import React, { Component } from "react";
import {connect} from "react-redux";

import { fetchAPICall } from "../helpers/index";
import DumbTiles from "./dumb_components/DumbTiles";


class ProviderTiles extends Component {
	constructor(props) {
		super(props)

		this.state = {
			solutions: []
		}
	}

	//Pull in API query from helpers - get solution data
	componentDidMount() {
		let queries = fetchAPICall("solution", this.props.solutions);

		Promise.all(queries).then(returnData => {
			this.setState({
				solutions:returnData
			})
		})
	}

	componentDidUpdate(prevProps) {
		if (this.props.solutions !== prevProps.solutions) {
			let queries = fetchAPICall("solution", this.props.solutions);

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
				<DumbTiles solutions={this.state.solutions} size="md" screen_height={this.props.mobile.screen_height} screen_width={this.props.mobile.screen_width} env="provider" />
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