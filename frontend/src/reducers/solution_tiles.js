import * as helpers from "../helpers/index";

const initialState = {
	solutionData: [],

}

export default function solution_tiles(state = initialState, action) {
	switch (action.type) {
		case "FETCH_SOLUTION_DATA":
			console.log(action.data);
			return {...state, solutionData: [...state.solutionData, ...action.data]}
		default:
			return state;
		}
	}