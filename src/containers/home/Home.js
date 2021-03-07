import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";

export default class Home extends Component {
  render() {
    return (
      <Row>
        <Col md={12}>
          <div className={"homeText"}>
            "WELCOME TO ACCOUNT-OWNER APPLICATION"
          </div>
        </Col>
      </Row>
    );
  }
}
