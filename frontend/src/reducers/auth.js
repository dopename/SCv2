const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  isUpdated: false,
  user: null,
  errors: {},

  provider: false,

  seeker: false,
};


export default function auth(state=initialState, action) {

  switch (action.type) {

    case 'USER_LOADING':
      return {...state, isLoading: true, isUpdated: false};

    case 'USER_LOADED':
      return {...state, isAuthenticated: true, isUpdated: false, isLoading: false, user: action.user, seeker: action.user.custom_user.seeker_account, provider: action.user.custom_user.provider_account};

    case 'LOGIN_SUCCESSFUL':
    case 'REGISTRATION_SUCCESSFUL':
      localStorage.setItem("token", action.data.token);
      return {...state, ...action.data, isAuthenticated: true, isLoading: false, errors: null, seeker: action.data.user.custom_user.seeker_account, provider: action.data.custom_user.provider_account};

    case 'AUTHENTICATION_ERROR':
    case 'LOGIN_FAILED':
    case 'LOGOUT_SUCCESSFUL':
    case 'REGISTRATION_FAILED':
      localStorage.removeItem("token");
      return {...state, errors: action.data, token: null, user: null,
        isAuthenticated: false, isLoading: false};

    case "ERROR_UPDATING_SOLUTION":
    case "ERROR_DELETING_SOLUTION":
    case "ERROR_CREATING_SOLUTION":
      console.log("Provider action fired");
      return {...state, errors:action.data}

    case "SEEKER_UPDATED":
    case "SOLUTION_UPDATED":
    case "SOLUTION_DELETED":
    case "SOLUTION_CREATED":
      console.log("Seeker action fired");
      return {...state, isUpdated:true}

    default:
      return state;
  }
}