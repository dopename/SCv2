var initialState = {
	seekerBookmarks: [],
	seekerTags: [],
	seekerCategories: [],
	allSolutions: [],
	loaded: false,
}

export default function seeker_account(state = initialState, action) {
	switch (action.type) {
		case "FETCH_SEEKER_ACCOUNT":
			return {...state,
			seekerBookmarks: action.seekerAccountData.bookmarks,
			seekerTags: action.seekerAccountData.tags,
			seekerCategories: action.seekerAccountData.categories,
			loaded: true
			}
		case "LIST_ALL_SOLUTIONS":
			return {...state, allSolutions: action.allSolutions}
		default:
			return state
	}
}