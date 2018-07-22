var initialState = {
	seeker: null,
	allSolutions: [],
	isLoaded: false,
	isLoading: false,
	isUpdated: false,
}

export default function seeker_account(state = initialState, action) {
	switch (action.type) {
		case "SEEKER_LOADING":
			return {...state, isLoading:true}
		case "SEEKER_LOADED":
			return {...state,
			seeker: action.seekerAccountData,
			isLoading: false,
			isLoaded: true,
			isUpdated: false
			}
		case "LIST_ALL_SOLUTIONS":
			return {...state, allSolutions: action.allSolutions}
		case "SEEKER_UPDATED":
			return {...state, isUpdated:true}
		default:
			return state
	}
}