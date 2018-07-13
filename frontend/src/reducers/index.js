import { combineReducers } from "redux";

import discovery from "./discovery";
import solution_tiles from "./solution_tiles";

const scApp = combineReducers({
	discovery,
	solution_tiles,
})

export default scApp;