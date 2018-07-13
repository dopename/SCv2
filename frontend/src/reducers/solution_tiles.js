import * as helpers from "../helpers/index";

const initialState = {
	solutionData: [],

}

export default function solution_tiles(state = initialState, action) {
	switch (action.type) {
		case "FETCH_SOLUTION_DATA":
			return {...state, solutionData: action.data}
		default:
			return state;
		}
	}