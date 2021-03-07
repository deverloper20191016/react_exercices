import { Button, Modal } from "react-bootstrap";
import Aux from "../../../core/hoc/Auxiliary";
import "../ModalStyles.css";

const confirmModal = (props) => {
  return (
    <Aux>
      <Modal show={props.show} onHide={props.onHide}>
        <Modal.Header>{props.modalHeaderText}</Modal.Header>
        <Modal.Body>
          <p>{props.modalBodyText}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={props.successClick}>
            {props.okButtonText}
          </Button>
          <Button variant="danger" onClick={props.cancelClick}>
            {props.cancelButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </Aux>
  );
};

export default confirmModal;
