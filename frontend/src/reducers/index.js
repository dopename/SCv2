import { combineReducers } from "redux";

import discovery from "./discovery";
import solution_tiles from "./solution_tiles";
import main from "./main";
import solution_provider from "./solution_provider";
import auth from "./auth";
import seeker_account from "./seeker_account";
import provider_account from "./provider_account";

const scApp = combineReducers({
	discovery,
	solution_tiles,
	solution_provider,
	main,
	auth, 
	seeker_account,
	provider_account,
})

export default scApp;