import axios from "../../axios/axios-base";
import { loginTypes } from "./loginTypes";
import * as errorHandlerActions from "./errorHandlerActions";

const loginSuccess = (data, props) => {
  return {
    type: loginTypes.LOGIN_SUCCESS,
    data, // data: data
    history: props.history,
  };
};

const loginFail = (errorMessage) => {
  return {
    type: loginTypes.LOGIN_FAIL,
    errorMessage,
  };
};

export const login = (url, props) => {
  return (dispatch) => {
    axios
      .get(url)
      .then((response) => {
        if (response.data.length == 0) {
          dispatch(loginFail("Không tìm thấy tài khoản hoặc mật khẩu"));
        } else {
          localStorage.setItem(
            loginTypes.USER_LOGIN,
            JSON.stringify(response.data)
          );
          dispatch(loginSuccess(response.data, props));
        }
      })
      .catch((error) => {
        dispatch(errorHandlerActions.handleHTTPError(error, props));
      });
  };
};

export const logout = () => {
  localStorage.removeItem(loginTypes.USER_LOGIN);
  return {
    type: loginTypes.LOGOUT,
  };
};
