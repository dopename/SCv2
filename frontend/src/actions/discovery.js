import * as helpers from "../helpers/index";

export const listIndustries = () => {
	return dispatch => {
		return helpers.fetchListAPICall("industry")
			.then(res => res.json())
			.then(allIndustry => {
				return dispatch({
					type: 'FETCH_ALL_INDUSTRY',
					allIndustry
				})
			})
	}
}