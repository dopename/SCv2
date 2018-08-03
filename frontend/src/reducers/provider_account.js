var initialState = {
	provider: null,
	errors: false,
	isLoaded: false,
	isLoading: false,
	isUpdated: false,
	allTags:[],
}

export default function provider_account(state = initialState, action) {
	switch (action.type) {
		// case "ERROR_CREATING_SOLUTION":
		// case "ERROR_UPDATING_SOLUTION":
		// case "ERROR_DELETING_SOLUTION":
		// 	return {...state, errors:action.data}
		// case "PROVIDER_LOADING":
		// 	return {...state, isLoading:true}
		// case "PROVIDER_LOADED":
		// 	return {...state,
		// 	provider: action.providerAccountData,
		// 	isLoading: false,
		// 	isLoaded: true,
		// 	isUpdated: false,
		// 	}
		// case "SOLUTION_CREATED":
		// case "SOLUTION_UPDATED":
		// case "SOLUTION_DELETED":
		// 	return {...state, isUpdated: true}
		case "TAGS_LOADED":
			return {...state, allTags: action.tags}
		default:
			return state
	}
}