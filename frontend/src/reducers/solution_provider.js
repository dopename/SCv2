import * as helpers from "../helpers/index";

const initialState = {
	providerData: false
}

export default function solution_provider(state = initialState, action) {
	switch (action.type) {
		case "FETCH_PROVIDER":
			console.log(action.provider);
			return {...state, providerData: action.provider}
		default:
			return state;
		}
	}