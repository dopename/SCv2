const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: true,
  isUpdated: false,
  user: null,
  errors: {},
};


export default function auth(state=initialState, action) {

  switch (action.type) {

    case 'USER_LOADING':
      return {...state, isLoading: true};

    case 'USER_LOADED':
      return {...state, isAuthenticated: true, isLoading: false, user: action.user};

    case 'LOGIN_SUCCESSFUL':
    case 'REGISTRATION_SUCCESSFUL':
      localStorage.setItem("token", action.data.token);
      return {...state, ...action.data, isAuthenticated: true, isLoading: false, errors: null};

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
      return {...state, errors:action.data}

    case "SEEKER_UPDATED":
    case "SOLUTION_UPDATED":
    case "SOLUTION_DELETED":
    case "SOLUTION_CREATED":
      return {...state, isUpdated:true}

    default:
      return state;
  }
}