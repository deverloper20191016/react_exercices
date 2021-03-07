import { Button } from "react-bootstrap";
import Aux from "../../core/hoc/Auxiliary";

const redirectToUpdate = (id, history) => {
  history.push(`/product/${id}/edit`);
};

const productItem = (props) => {
  let { product, onDeleteProduct } = props;
  return (
    <Aux>
      <tr>
        <td>{product.code}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>
          <img
            src={product.image}
            width="50"
            className="rounded img-fluid"
            alt={product.name}
          />
        </td>

        <td>{product.productCategoryId}</td>

        <td>
          <Button
            variant="success"
            onClick={() => redirectToUpdate(product.id, props.history)}
          >
            Update
          </Button>
        </td>
        <td>
          <Button variant="danger" onClick={onDeleteProduct}>Delete</Button>
        </td>
      </tr>
    </Aux>
  );
};

export default productItem;
