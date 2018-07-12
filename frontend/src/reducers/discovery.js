import * as helpers from "../helpers/index";

const initialState = {
	industries: [],
	selectedIndustries: [],
	activeSolutions: [],

}

export default function discovery(state = initialState, action) {
	switch (action.type) {
		case "FETCH_ALL_INDUSTRY":
			return {...state, industries: action.industries, selectedIndustries: action.industries.map(e => e.pk)}
		default:
			return state;
	}
}