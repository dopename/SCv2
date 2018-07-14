import * as helpers from "../helpers/index";

const initialState = {
	industries: [],
	unselectedCategories: [],
	solutions: [],

}

export default function discovery(state = initialState, action) {
	switch (action.type) {
		case "FETCH_ALL_INDUSTRY":
			var solutions = []
			action.industries.map(industry => {
				industry.categories.map(cat => {
					solutions = [...solutions, ...cat.solutions]
				})
			})
			return {...state, industries: action.industries, solutions: solutions}
		case "CHECK_BOX":
			if ( action.model === "category") {
				if (state.unselectedCategories.indexOf(action.pk) > -1) {
					let editedArray = [...state.unselectedCategories]
					editedArray = editedArray.filter(pk => pk !== action.pk)
					return {...state, unselectedCategories: editedArray}
				}
				else {
					return {...state, unselectedCategories: [...state.unselectedCategories, action.pk] }
				}
			}
			else {
				var obj = {};
				var newData = state.unselectedCategories;
				state.industries.map((i) => {
					obj[i.pk] = i
				})
				if (obj[action.pk].categories.map(c => c.pk).some(r => newData.includes(r))) {
					obj[action.pk].categories.map(c => {
						if (newData.indexOf(c.pk) > -1) {
							newData = newData.filter(pk => pk !== c.pk)
						}
					})
					return {...state, unselectedCategories: newData}
				}
				else {
					obj[action.pk].categories.map(c => {
						if (newData.indexOf(c.pk) < 0) {
							newData = [...newData, c.pk]
						}
					})
					return {...state, unselectedCategories : newData}
				}
			}
		case "RESET_STATE":
			var newState = {...initialState};
			return newState;
		default:
			return state;
	}
}

// function checkEach(categories, against) {
// 	categories.
// }