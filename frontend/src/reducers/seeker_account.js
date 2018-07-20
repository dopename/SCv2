var initialState = {
	seekerBookmarks: [],
	seekerTags: [],
	seekerCategories: [],
}

export default function seeker_account(state = initialState, action) {
	switch (action.type) {
		case "FETCH_SEEKER_ACCOUNT":
			return {...state,
			seekerBookmarks: action.seekerAccountData.bookmarks,
			seekerTags: action.seekerAccountData.tags,
			seekerCategories: action.seekerAccountData.categories}
		default:
			return state
	}
}