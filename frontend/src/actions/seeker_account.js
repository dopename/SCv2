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

export const updateSeeker = (pk, seekerData, token) => {
	return dispatch => {
		return helpers.updateAPICall("seekeraccount", pk, seekerData, token, true)
			.then(res => {
				if (res.ok) {
					return res.json()
				}
			})
			.then(() => {
				return dispatch({
					type: "SEEKER_UPDATED",
				})
			})
	}
}