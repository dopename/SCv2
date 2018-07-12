import * as helpers from "../helpers/index";

const initialState = {
	allIndustry:[],
	activeSolutions:[],

}

export default function discovery(state = initialState, action) {
	switch (action.type) {
		case "FETCH_ALL_INDUSTRY":
			let returnData = helpers.fetchListAPICall("industry");
			let newState = state;
			newState.allIndustry = [...newState.allIndustry, ...returnData]
			return newState
		default:
			return state;
	}
}