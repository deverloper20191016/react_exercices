import { useEffect, useState } from "react";
import Aux from "../../core/hoc/Auxiliary";
import axios from "../../core/axios/axios-base";
import { Card, Form, Button, Image } from "react-bootstrap";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { useHistory } from "react-router-dom";

import "./ProductForm.css";

const ProductForm = ({ match }) => {
  // Hook
  const [product, setProduct] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [image, setImage] = useState("");
  const [productCategory, setProductCategory] = useState([]);
  const [error, setError] = useState("");

  // params and property
  const { id } = match.params;
  const isAddMode = !id;
  const history = useHistory();

  useEffect(() => {
    loadProductCategory();
    loadProduct();
  }, [image, isSubmit, error]);

  // Validate
  const schema = Yup.object().shape({
    code: Yup.string()
      .required("Code is required")
      .min(3, "Code must have min 3 characters"),

    name: Yup.string().required().min(3, "Name must have min 3 characters"),
    price: Yup.number().min(0).required(),
    status: Yup.boolean(),
    // productCategoryId: Yup.number(),
    image: Yup.string(),
  });

  // Init Form
  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  // Submit Form
  const onSubmit = (data) => {
    setIsSubmit(true);
    let url = "/products/";
    data.image = image;

    if (isAddMode) {
      axios
        .post(url, data)
        .then((response) => {
          history.push("/product-list");
        })
        .catch((error) => {
          setError(error.Error);
        });
    } else {
      url += id;
      axios
        .put(url, data)
        .then((response) => {
          history.push("/product-list");
        })
        .catch((error) => {
          setError(error.Error);
        });
    }
    setIsSubmit(false);
  };

  const loadProduct = () => {
    if (!isAddMode) {
      let url = `/products/${id}`;
      axios
        .get(url)
        .then((response) => {
          setProduct(response.data);
          const fields = [
            "code",
            "name",
            "price",
            "status",
            "productCategoryId",
            "image",
          ];
          fields.forEach((field) => setValue(field, product[field]));
          setImage(product.image);
        })
        .catch((error) => {
        });
    }
  };

  const loadProductCategory = () => {
    let url = "/product-categories";
    axios.get(url).then((response) => {
      setProductCategory(response.data);
    });
  };

  const onChangeImage = (e) => {
    if (e.target.files.length > 0) {
      let file = e.target.files[0];
      let newImage = URL.createObjectURL(file);
      setImage(newImage);
    }
  };

  return (
    <Aux>
      <Card className="card-form">
        <h2 className="text-center">
          {isAddMode ? "Add New Product" : "Update Product"}
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
                placeholder="Product code"
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
                placeholder="Product name"
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
                name="price"
                ref={register}
                defaultValue="0"
              />
              <Form.Text className="text-muted text-danger">
                <p className="text-danger">{errors.price?.message}</p>
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

            <Form.Group controlId="exampleForm.SelectCustom">
              <Form.Label>Custom select</Form.Label>
              <Form.Control
                as="select"
                name="productCategoryId"
                ref={register}
                custom
              >
                {productCategory.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Image
                className="image-product"
                src={image}
                name="image"
                ref={register}
                rounded
              />

              <Form.File id="select-image" onChange={onChangeImage} />
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

export default ProductForm;
