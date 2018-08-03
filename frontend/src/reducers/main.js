const initialState = {
	screen_width: false,
	screen_height: false,
	isMobile: false,
	isTablet: false,
	isDesktop: false,
	settingsOpen: false,
}

export default function main(state = initialState, action) {
	switch (action.type) {
		case "SCREEN_DIMENSIONS":
			if (action.screen_width < 481) {
				return {...state, screen_height: action.screen_height, screen_width: action.screen_width, isMobile:true}
			}
			else if (action.screen_width < 991) {
				return {...state, screen_height: action.screen_height, screen_width: action.screen_width, isTablet:true}
			}
			return {...state, screen_height: action.screen_height, screen_width: action.screen_width, isDesktop:true}
		case "TOGGLE_SETTINGS":
		 	return {...state, settingsOpen: !state.settingsOpen}
		default:
			return state;
		}
	}