import * as helpers from "../helpers/index";

export const fetchSolutionData = (solutions) => {
	return dispatch => {
		let queries = helpers.fetchAPICall("solution", solutions)

		Promise.all(queries).then(returnData => {
			return dispatch({
				type: "FETCH_SOLUTION_DATA",
				returnData
			})
		})

	}
}