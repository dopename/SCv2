import * as helpers from "../helpers/index";

const initialState = {
	industries: [],
	selectedIndustries: [],
	selectedCategories: [],
	activeSolutions: [],

}

export default function discovery(state = initialState, action) {
	switch (action.type) {
		case "FETCH_ALL_INDUSTRY":
			let categories = []
			let industries = []
			action.industries.map(i => {
				industries.push(i.pk);
				i.categories.map(c => {
					categories.push(c.pk)
				})
			})
			return {...state, industries: action.industries, selectedIndustries: industries, selectedCategories: categories}
		case "CHECK_BOX":
			if (state.selectedIndustries.indexOf(action.pk) > -1) {
				let editedArray = [...state.selectedIndustries]
				editedArray = editedArray.filter(pk => pk !== action.pk)
				return {...state, selectedIndustries: editedArray}
			}
			else {
				return {...state, selectedIndustries: [...state.selectedIndustries, action.pk] }
			}
		default:
			return state;
	}
}