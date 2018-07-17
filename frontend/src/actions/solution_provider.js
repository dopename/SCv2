import * as helpers from "../helpers/index";

export const retrieveProviderData = (providerPK) => {
	return dispatch => {
		return helpers.retrieveAPICall("provider", providerPK)
			.then(res => res.json())
			.then(provider => {
				console.log('RETURN DATA', provider);

				return dispatch({
					type: "FETCH_PROVIDER",
					provider
				})
			})
	}
}