var initialState = {
	provider: null,
	isLoaded: false,
	isLoading: false,
}

export default function provider_account(state = initialState, action) {
	switch (action.type) {
		case "PROVIDER_LOADING":
			return {...state, isLoading:true}
		case "PROVIDER_LOADED":
			return {...state,
			provider: action.providerAccountData,
			isLoading: false,
			isLoaded: true,
			}
		default:
			return state
	}
}