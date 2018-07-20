var initialState = {
	seeker: null,
	allSolutions: [],
	isLoaded: false,
	isLoading: false,
}

export default function seeker_account(state = initialState, action) {
	switch (action.type) {
		case "SEEKER_LOADING":
			return {...state, isLoading:true}
		case "SEEKER_LOADED":
			return {...state,
			seekerBookmarks: action.seekerAccountData,
			isLoading: false,
			isLoaded: true
			}
		case "LIST_ALL_SOLUTIONS":
			return {...state, allSolutions: action.allSolutions}
		default:
			return state
	}
}