import { Button } from "react-bootstrap";
import Aux from "../../core/hoc/Auxiliary";

const redirectToUpdate = (id, history) => {
  history.push(`/product-category/${id}/edit`);
};

const productCategoryItem = (props) => {
  let { productCategory, onDeleteProductCategory } = props;
  return (
    <Aux>
      <tr>
        <td>{productCategory.code}</td>
        <td>{productCategory.name}</td>
        <td>{productCategory.sortOrder}</td>

        <td>
          <Button
            variant="success"
            onClick={() => redirectToUpdate(productCategory.id, props.history)}
          >
            Update
          </Button>
        </td>
        <td>
          <Button variant="danger" onClick={onDeleteProductCategory}>
            Delete
          </Button>
        </td>
      </tr>
    </Aux>
  );
};

export default productCategoryItem;
