import React, { Component } from "react";
import { Table, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Aux from "../../core/hoc/Auxiliary";

import { connect } from "react-redux";
import * as repositoryActions from "../../core/redux/actions/repositoryActions";
import * as errorHandlerActions from "../../core/redux/actions/errorHandlerActions";

import ProductItem from "../../components/product/ProductItem";
import ErrorModal from "../../shared/custom-modal/error-modal/ErrorModal";
import ConfirmModal from "../../shared/custom-modal/confirm-modal/ConfirmModal";
import SuccessModal from "../../shared/custom-modal/success-modal/SuccessModal";

class ProductList extends Component {
  state = {
    isShowConfirm: false,
    itemToDelete: null,
  };

  hideConfirmModal = () => {
    this.setState({
      isShowConfirm: false,
      itemToDelete: null,
    });
  };

  showConfirmModal = (product) => {
    this.setState({
      isShowConfirm: true,
      itemToDelete: product,
    });
  };

  closeSuccessModal = () => {
    this.props.onCloseSuccessModal("", { ...this.props });
    this.getData();
  };

  deleteProduct = () => {
    let url = `/products/${this.state.itemToDelete.id}`;
    this.hideConfirmModal();
    this.props.onDeleteProduct(url, { ...this.props });
  };

  getData = () => {
    let url = "/products";
    this.props.onGetData(url, { ...this.props });
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    let products = [];
    if (this.props.data && this.props.data.length > 0) {
      products = this.props.data.map((product) => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            {...this.props}
            onDeleteProduct={() => this.showConfirmModal(product)}
          />
        );
      });
    }
    return (
      <Aux>
        <Row>
          <Col md={{ span: 2, offset: 10 }}>
            <Link className="btn btn-primary mt-10" to="/product/add">
              Add Product
            </Link>
          </Col>
        </Row>
        <br />
        <Row>
          <Col md={12}>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Category</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>{products}</tbody>
            </Table>
          </Col>
        </Row>

        <SuccessModal
          show={this.props.showSuccessModal}
          modalHeaderText={"Delete Success"}
          modalBodyText={"Action completed successfully"}
          okButtonText={"OK"}
          successClick={this.closeSuccessModal}
        />

        <ErrorModal
          show={this.props.showErrorModal}
          modalHeaderText={"Error message"}
          modalBodyText={this.props.errorMessage}
          okButtonText={"OK"}
          closeModal={this.props.onCloseErrorModal}
        />

        <ConfirmModal
          onHide={this.hideConfirmModal}
          animation={false}
          show={this.state.isShowConfirm}
          modalHeaderText={"Thông Báo"}
          modalBodyText={`Bạn có muốn xóa bản ghi: ${
            this.state.itemToDelete ? this.state.itemToDelete.name : ""
          } ?`}
          okButtonText={"OK"}
          successClick={this.deleteProduct}
          cancelButtonText={"Cancel"}
          cancelClick={this.hideConfirmModal}
        />
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.repository.data,
    showSuccessModal: state.repository.showSuccessModal,
    showErrorModal: state.errorHandler.showErrorModal,
    errorMessage: state.errorHandler.errorMessage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetData: (url, props) => dispatch(repositoryActions.getData(url, props)),
    onCloseSuccessModal: (url, props) =>
      dispatch(repositoryActions.closeSuccessModal(props, url)),
    onCloseErrorModal: () => dispatch(errorHandlerActions.closeErrorModal()),
    onDeleteProduct: (url, props) => {
      dispatch(repositoryActions.deleteData(url, props));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
