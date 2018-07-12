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
		case "CHECK_BOX":
			if (state.selectedIndustries.indexOf(action.pk) > -1) {
				return {...state, selectedIndustries: selectedIndustries.splice(state.selectedIndustries.indexOf(action.pk), 1)}
			}
			else {
				return {...state, selectedIndustries: [...selectedIndustries, action.pk] }
			}
		default:
			return state;
	}
}