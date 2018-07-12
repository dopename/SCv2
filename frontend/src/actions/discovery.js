import * as helpers from "../helpers/index";

export const listIndustries = () => {
	return dispatch => {
		return helpers.fetchListAPICall("industry")
			.then(res => res.json())
			.then(industries => {
				console.log('RETURN DATA', industries);

				return dispatch({
					type: "FETCH_ALL_INDUSTRY",
					industries
				})
			})
	}
}

export const checkBox = (pk) => {
	return  {
		type: "CHECK_BOX",
		pk
	}
}