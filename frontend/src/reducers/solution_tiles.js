const initialState = {
	solutionData: [],
}

export default function solution_tiles(state = initialState, action) {
	switch (action.type) {
		case "FETCH_SOLUTION_DATA":
			console.log(action.returnData);
			var newData = [];
			action.returnData.map(d => {
				if (!state.solutionData.map(e => e.pk).includes(d.pk)) {
					newData.push(d);
				}
			})
			return {...state, solutionData: [...state.solutionData, ...newData]}
		default:
			return state;
		}
	}