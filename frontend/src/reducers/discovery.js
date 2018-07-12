import * as helpers from "../helpers/index";

const initialState = {
	allIndustry:[],
	activeSolutions:[],

}

export default function discovery(state = initialState, action) {
	switch (action.type) {
		case "FETCH_ALL_INDUSTRY":
			let newState = state;
			newState.allIndustry = action.allIndustry;
			console.log("EDITED STATE", newState);
			return newState
		default:
			return state;
	}
}