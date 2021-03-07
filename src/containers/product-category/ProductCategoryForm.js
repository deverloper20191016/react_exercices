import { useEffect, useState } from "react";
import Aux from "../../core/hoc/Auxiliary";
import axios from "../../core/axios/axios-base";
import { Card, Form, Button, Image } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useHistory } from "react-router-dom";

import "./ProductCategoryForm.css";

const ProductCategoryForm = ({ match }) => {
  // Hook
  const [productCategory, setCategory] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState("");

  // params and property
  const { id } = match.params;
  const isAddMode = !id;
  const history = useHistory();

  useEffect(() => {
    loadForm();
  }, [isSubmit, error]);

  // Validate
  const schema = Yup.object().shape({
    code: Yup.string()
      .required("Code is required")
      .min(3, "Code must have min 3 characters"),

    name: Yup.string().required().min(3, "Name must have min 3 characters"),
    sortOrder: Yup.number().min(0).required(),
    status: Yup.boolean(),
  });

  // Init Form
  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  // Submit Form
  const onSubmit = (data) => {
    setIsSubmit(true);
    let url = "/product-categories/";

    if (isAddMode) {
      axios
        .post(url, data)
        .then((response) => {
          history.push("/product-category-list");
        })
        .catch((error) => {
          setError(error.Error);
        });
    } else {
      url += id;
      axios
        .put(url, data)
        .then((response) => {
          history.push("/product-category-list");
        })
        .catch((error) => {
          setError(error.Error);
        });
    }
    setIsSubmit(false);
  };

  const loadForm = () => {
    if (!isAddMode) {
      let url = `/product-categories/${id}`;
      axios
        .get(url)
        .then((response) => {
          setCategory(response.data);
          const fields = ["code", "name", "sortOrder", "status"];
          fields.forEach((field) => setValue(field, response.data[field]));
        })
        .catch((error) => {
        });
    }
  };

  return (
    <Aux>
      <Card className="card-form">
        <h2 className="text-center">
          {isAddMode ? "Add New Product Category" : "Update Product Category"}
        </h2>
        <Card.Body>
          <p className="text-danger">{error}</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                name="code"
                ref={register}
                placeholder="Product Category Code"
                className={`form-control ${errors.code ? "is-invalid" : ""}`}
              />
              <Form.Text className="text-muted text-danger">
                <p className="text-danger">{errors.code?.message}</p>
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                ref={register}
                placeholder="Product Category Name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
              />
              <Form.Text className="text-muted">
                <p className="text-danger">{errors.name?.message}</p>
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="sortOrder"
                ref={register}
                defaultValue="0"
              />
              <Form.Text className="text-muted text-danger">
                <p className="text-danger">{errors.sortOrder?.message}</p>
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Check
                type="checkbox"
                name="status"
                ref={register}
                label="Status"
              />
            </Form.Group>

            <button
              type="submit"
              disabled={isSubmit}
              className="btn btn-primary mr-1"
            >
              {isAddMode ? "Create" : "Update"}
            </button>
          </form>
        </Card.Body>
      </Card>
    </Aux>
  );
};

export default ProductCategoryForm;
