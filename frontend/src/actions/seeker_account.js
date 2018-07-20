import * as helpers from "../helpers/index";

export const retrieveSeekerAccount = (seekerAccountPK) => {
	return dispatch => {
		return helpers.retrieveAPICall("seekeraccount", seekerAccountPK)
			.then(res => res.json())
			.then(seekerAccountData => {
				return dispatch({
					type: "FETCH_SEEKER_ACCOUNT",
					seekerAccountData
				})
			})
	}
}

export const listSolutions = () => {
	return dispatch => {
		return helpers.fetchListAPICall("solution")
			.then(res => res.json())
			.then(allSolutions => {
				return dispatch({
					type: "LIST_ALL_SOLUTIONS",
					allSolutions
				})
			})
	}
}