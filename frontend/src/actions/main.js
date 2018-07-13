export const getScreenData = (screen) => {
	var screen_height = screen.height;
	var screen_width = screen.width;
	return {
		type: "SCREEN_DIMENSIONS",
		screen_width, 
		screen_height
	}
}