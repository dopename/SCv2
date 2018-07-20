import * as helpers from "../helpers/index";

export const retrieveSeekerAccount = (seekerAccountPK) => {
	return dispatch => {
		dispatch({type:"SEEKER_LOADING"});

		return helpers.retrieveAPICall("seekeraccount", seekerAccountPK)
			.then(res => res.json())
			.then(seekerAccountData => {
				return dispatch({
					type: "SEEKER_LOADED",
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