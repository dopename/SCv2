import * as helpers from "../helpers/index";

const initialState = {
	industries: [],
	activeSolutions: [],

}

export default function discovery(state = initialState, action) {
	switch (action.type) {
		case "FETCH_ALL_INDUSTRY":
			let newState = state;
			newState.industries = action.industries;
			return newState
		default:
			return state;
	}
}