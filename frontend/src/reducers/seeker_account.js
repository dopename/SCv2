var initialState = {
	seekerAccount: {
		seekerBookmarks: [],
		seekerTags: [],
		seekerCategories: [],
	},
	allSolutions: []
}

export default function seeker_account(state = initialState, action) {
	switch (action.type) {
		case "FETCH_SEEKER_ACCOUNT":
			return {...state, seekerAccount: {...seekerAccount, 
			seekerBookmarks: action.seekerAccountData.bookmarks,
			seekerTags: action.seekerAccountData.tags,
			seekerCategories: action.seekerAccountData.categories}}
		case "LIST_ALL_SOLUTIONS":
			return {...state, allSolutions: [...allSolutions, ...action.allSolutions]}
		default:
			return state
	}
}