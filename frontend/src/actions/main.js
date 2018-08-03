export const getScreenData = (width, height) => {
	var screen_width = width;
	var screen_height = height;
	return {
		type: "SCREEN_DIMENSIONS",
		screen_width, 
		screen_height
	}
}

export const toggleSettings = () => {
	return {
		type: "TOGGLE_SETTINGS",
	}
}