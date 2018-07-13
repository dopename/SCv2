import { combineReducers } from "redux";

import discovery from "./discovery";
import solution_tiles from "./solution_tiles";
import main from "./main";

const scApp = combineReducers({
	discovery,
	solution_tiles,
	main
})

export default scApp;