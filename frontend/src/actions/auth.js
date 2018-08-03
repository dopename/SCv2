import * as helpers from "../helpers/index";

export const loadUser = () => {
  return (dispatch, getState) => {
    dispatch({type: "USER_LOADING"});

    const token = getState().auth.token;

    let headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }
    return fetch("/api/auth/user/", {headers, })
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'USER_LOADED', user: res.data });
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}

export const login = (username, password) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({username, password});

    return fetch("/api/auth/login/", {headers, body, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          dispatch({type: 'LOGIN_SUCCESSFUL', data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        } else {
          dispatch({type: "LOGIN_FAILED", data: res.data});
          throw res.data;
        }
      })
  }
}

export const register = (username, password) => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};
    let body = JSON.stringify({username, password});

    return fetch("/api/auth/register/", {headers, body, method: "POST"})
      .then(res => {
        if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 200) {
          dispatch({type: 'REGISTRATION_SUCCESSFUL', data: res.data });
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        } else {
          dispatch({type: "REGISTRATION_FAILED", data: res.data});
          throw res.data;
        }
      })
  }
}

export const logout = () => {
  return (dispatch, getState) => {
    let headers = {"Content-Type": "application/json"};

    const token = getState().auth.token;

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch("/api/auth/logout/", {headers, body: "", method: "POST"})
      .then(res => {
        if (res.status === 204) {
          return {status: res.status, data: {}};
        } else if (res.status < 500) {
          return res.json().then(data => {
            return {status: res.status, data};
          })
        } else {
          console.log("Server Error!");
          throw res;
        }
      })
      .then(res => {
        if (res.status === 204) {
          dispatch({type: 'LOGOUT_SUCCESSFUL'});
          return res.data;
        } else if (res.status === 403 || res.status === 401) {
          dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
          throw res.data;
        }
      })
  }
}

//////////// Seeker Account Actions Below //////////////////////////

// export const updateSeeker = (pk, seekerData, token) => {
//   return dispatch => {
//     return helpers.updateAPICall("seekeraccount", pk, seekerData, token, true)
//       .then(res => {
//         if (res.ok) {
//           return res.json()
//         }
//       })
//       .then(() => {
//         return dispatch({
//           type: "SEEKER_UPDATED",
//         })
//       })
//   }
// }

// ////////////// Provider Account Actions Below //////////////////////


// export const updateSolution = (data, pk) => {
//   return (dispatch, getState) => {

//     const token = getState().auth.token;

//     return helpers.updateAPICall("solution", pk, data, token, true, true)
//       .then(res => {
//         if (res.status < 500) {
//           return res.json().then(data => {
//             return {status: res.status, data}
//           })
//         }
//         else {
//           console.log("Internal server error");
//           throw res;
//         }
//       })
//       .then(res => {
//         if (res.status === 200) {
//           dispatch({type: "SOLUTION_UPDATED"});
//           return res.data;
//         }
//         else {
//           dispatch({type:"ERROR_UPDATING_SOLUTION", data: res.data});
//           throw res.data;
//         }
//       })
//   }
// }

// export const deleteSolution = (pk) => {
//   return (dispatch, getState) => {

//     const token = getState().auth.token;

//     return helpers.deleteAPICall("solution", pk, token)
//       .then(res => {
//         if (res.status < 500) {
//           return res.json().then(data => {
//             return {status: res.status, data}
//           })
//         }
//         else {
//           console.log("Internal server error");
//           throw res;
//         }
//       })
//       .then(res => {
//         if (res.status === 200) {
//           dispatch({type: "SOLUTION_DELETED"});
//           return res.data;
//         }
//         else {
//           dispatch({type:"ERROR_DELETING_SOLUTION", data: res.data});
//           throw res.data;
//         }
//       })
//   }
// }

// export const createSolution = (data) => {
//   return (dispatch, getState) => {

//     const token = getState().auth.token;

//     return helpers.createAPICall("solution", data, token, true)
//       .then(res => {
//         if (res.status < 500) {
//           return res.json().then(data => {
//             return {status: res.status, data}
//           })
//         }
//         else {
//           console.log("Internal server error");
//           throw res;
//         }
//       })
//       .then(res => {
//         if (res.status === 200) {
//           dispatch({type: "SOLUTION_CREATED", newSolutionData :res.data});
//           return res.data;
//         }
//         else {
//           dispatch({type:"ERROR_CREATING_SOLUTION", data: res.data});
//           throw res.data;
//         }
//       })
      
//   }
// }