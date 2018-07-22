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
			seeker: action.seekerAccountData,
			isLoading: false,
			isLoaded: true
			}
		case "LIST_ALL_SOLUTIONS":
			return {...state, allSolutions: action.allSolutions}
		case "SEEKER_UPDATED":
			var newSeeker = state.seeker
			newSeeker.tags = seekerAccountData.tags
			newSeeker.categories = seekerAccountData.categories
			return {...state, seeker:newSeeker}
		default:
			return state
	}
}