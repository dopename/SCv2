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

// export const fetchAllTables = (functionList) => {
// 	return (dispatch, getState) => {

// 		const token = getState().auth.token;

// 		var queries = functionList.map(func => {
// 			return func()
// 		})

// 		Promise.all(queries).then(data => {
// 			return dispatch({
// 				type: "ALL_MAIN_INFO_FETCHED",
// 				data
// 			})
// 		}
// 	}
// }