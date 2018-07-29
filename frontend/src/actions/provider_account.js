import * as helpers from "../helpers/index";

export const retrieveProviderAccount = (providerAccountPK) => {
	return dispatch => {
		dispatch({type:"PROVIDER_LOADING"});

		return helpers.retrieveAPICall("provideraccount", providerAccountPK)
			.then(res => res.json())
			.then(providerAccountData => {
				return dispatch({
					type: "PROVIDER_LOADED",
					providerAccountData
				})
			})
	}
}

export const createSolution = (data) => {
	return (dispatch, getState) => {

		const token = getState().auth.token;

		return helpers.createAPICall("solution", data, token, true)
			.then(res => {
				if (res.status < 500) {
					return res.json().then(data => {
						return {status: res.status, data}
					})
				}
				else {
					console.log("Internal server error");
					throw res;
				}
			})
			.then(res => {
				if (res.status === 200) {
					dispatch({type: "SOLUTION_CREATED", newSolutionData :res.data});
					return res.data;
				}
				else {
					dispatch({type:"ERROR_CREATING_SOLUTION", data: res.data});
					throw res.data;
				}
			})
			
	}
}

export const updateSolution = (data, pk) => {
	return (dispatch, getState) => {

		const token = getState().auth.token;

		return helpers.updateAPICall("solution", pk, data, token, false, true)
			.then(res => {
				if (res.status < 500) {
					return res.json().then(data => {
						return {status: res.status, data}
					})
				}
				else {
					console.log("Internal server error");
					throw res;
				}
			})
			.then(res => {
				if (res.status === 200) {
					dispatch({type: "SOLUTION_UPDATED"});
					return res.data;
				}
				else {
					dispatch({type:"ERROR_UPDATING_SOLUTION", data: res.data});
					throw res.data;
				}
			})
	}
}

export const listTags = () => {
	return dispatch => {
		return helpers.fetchListAPICall("tag")
			.then(res => res.json())
			.then(tags => {
				return dispatch({
					type: "TAGS_LOADED",
					tags
				})
			})
	}
}

