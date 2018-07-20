import * as helpers from "../helpers/index";

export const retrieveSeekerAccount = (seekerAccountPK) => {
	return dispatch => {
		return helpers.retrieveAPICall("seekeraccount", seekerAccountPK)
			.then(res => res.json())
			.then(seeker => {
				return dispatch({
					type: "FETCH_SEEKER_ACCOUNT",
					seekerAccountData
				})
			})
	}
}