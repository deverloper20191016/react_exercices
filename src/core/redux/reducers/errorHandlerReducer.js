import * as actionTypes from "../actions/actionTypes";
import { USER_LOGIN } from "../../../shared/utils/commonConstant";

const initialState = {
  showErrorModal: false,
  errorMessage: "",
};

const execute401 = (state, action) => {
  localStorage.removeItem(USER_LOGIN);
  action.props.history.push("/login");
  return { ...state };
};

const execute404 = (state, action) => {
  action.props.history.push("/404");
  return { ...state };
};

const execute500 = (state, action) => {
  action.props.history.push("/500");
  return { ...state };
};

const executeOtherError = (state, action) => {
  return {
    ...state,
    showErrorModal: true,
    errorMessage: action.error.response.data,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HTTP_401_ERROR:
      return execute401(state, action);
    case actionTypes.HTTP_404_ERROR:
      return execute404(state, action);
    case actionTypes.HTTP_500_ERROR:
      return execute500(state, action);
    case actionTypes.HTTP_OTHER_ERROR:
      return executeOtherError(state, action);
    default:
      return state;
  }
};

export default reducer;
