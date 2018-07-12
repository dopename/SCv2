import * as helpers from "../helpers/index";

const initialState = {
	allIndustry:[],
	activeSolutions:[],

}

export default function discovery(state = initialState, action) {
	switch (action.type) {
		case "FETCH_ALL_INDUSTRY":
			let newState = state;
			let returnData = helpers.fetchListAPICall("industry");
			returnData
			.then(response => response.json())
			.then(data => {
				console.log("RETURN DATA", data);
				newState.allIndusty = data
			})
			return newState
		default:
			return state;
	}
}