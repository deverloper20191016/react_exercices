import React, { useEffect, useState } from "react";
import "./Login.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import * as authenticationAction from "../../core/redux/actions/authenticationAction";
import Aux from "../../core/hoc/Auxiliary";
import { Card, Form } from "react-bootstrap";

const Login = (props) => {
  const history = useHistory();
  useEffect(() => {
    if (props.isAuthenticated) {
      history.push("/");
    }
  });

  const [isSubmit, setIsSubmit] = useState(false);

  // Validate
  const schema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(3, "Username must have min 3 characters")
      .max(50, "Username have max 50 characters"),
    password: Yup.string().required("Password is required"),
  });

  // Init Form
  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  // Submit Form
  const onSubmit = (data) => {
    let url = `/users?username=${data.username}&password=${data.password}`;
    props.onLogin(url, { ...props });
  };

  return props.isAuthenticated ? (
    ""
  ) : (
    <Aux>
      <Card className="card-form">
        <h2 className="text-center">Login Form</h2>
        <Card.Body>
          <p className="text-danger">{props.errorMessage}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                name="username"
                ref={register}
                placeholder="Username"
                className={`form-control ${
                  errors.username ? "is-invalid" : ""
                }`}
              />
              <Form.Text className="text-muted text-danger">
                <p className="text-danger">{errors.username?.message}</p>
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                ref={register}
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
              />
              <Form.Text className="text-muted">
                <p className="text-danger">{errors.password?.message}</p>
              </Form.Text>
            </Form.Group>

            <button
              type="submit"
              disabled={isSubmit}
              className="btn btn-primary"
            >
              Login
            </button>
          </form>
        </Card.Body>
      </Card>
    </Aux>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authentication.isAuthenticated,
    errorMessage: state.authentication.errorMessage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (url, props) => {
      return dispatch(authenticationAction.login(url, props));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
