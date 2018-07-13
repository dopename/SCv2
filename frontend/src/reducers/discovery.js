import * as helpers from "../helpers/index";

const initialState = {
	industries: {},
	selectedIndustries: [],
	selectedCategories: [],
	activeSolutions: [],

}

export default function discovery(state = initialState, action) {
	switch (action.type) {
		case "FETCH_ALL_INDUSTRY":
			let arr = {}
			action.industries.map(i => {
				var iarr = [];
				i.categories.map(c => {
					iarr.push(c.pk)
				})
				arr[i.pk] = iarr
			})
			return {...state, industries: arr}
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

