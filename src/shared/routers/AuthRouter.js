import { Redirect, Route } from "react-router-dom";
import { USER_LOGIN } from "../utils/commonConstant";

const AuthRoute = (props) => {
  let token = localStorage.getItem(USER_LOGIN);

  if (token) {
    return <Route {...props} />;
  } else {
    return (
      <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }
};

export default AuthRoute;
