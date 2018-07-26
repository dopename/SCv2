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