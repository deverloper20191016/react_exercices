import { loginTypes } from "../actions/loginTypes";

let user = JSON.parse(localStorage.getItem(loginTypes.USER_LOGIN));

const initialState = {
  isAuthenticated: user ? true : false,
  user: user || null,
  errorMessage: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case loginTypes.LOGIN_SUCCESS:
      action.history.push("/");
      return {
        ...state,
        isAuthenticated: true,
        user: action.data[0],
        errorMessage: false,
      };

    case loginTypes.LOGIN_FAIL:
      return { ...state, errorMessage: action.errorMessage };

    case loginTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        errorMessage: null,
      };

    default:
      return { ...state };
  }
};

export default reducer;
