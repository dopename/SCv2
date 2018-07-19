import { combineReducers } from "redux";

import discovery from "./discovery";
import solution_tiles from "./solution_tiles";
import main from "./main";
import solution_provider from "./solution_provider";
import auth from "./auth";

const scApp = combineReducers({
	discovery,
	solution_tiles,
	solution_provider,
	main,
	auth
})

export default scApp;