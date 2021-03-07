import React from "react";
import { Container, Row } from "react-bootstrap";
import MainRouter from "../routers/MainRouter";
import Navigation from "./Navigation";
import * as authenticationAction from "../../core/redux/actions/authenticationAction";
import { connect } from "react-redux";

const layout = (props) => {
  console.log(props);
  return (
    <Container>
      {props.isAuthenticated && (
        <Row>
          <Navigation {...props} />
        </Row>
      )}

      <MainRouter />
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(authenticationAction.logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(layout);
