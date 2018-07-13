const initialState = {
	screen_width: false,
	screen_height: false,
}

export default function main(state = initialState, action) {
	switch (action.type) {
		case "SCREEN_DIMENSIONS":
			return {...state, screen_height: action.screen_height, screen_width: action.screen_width}
		default:
			return state;
		}
	}