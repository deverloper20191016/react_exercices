import { Button, Modal } from "react-bootstrap";
import Aux from "../../../core/hoc/Auxiliary";
import "../ModalStyles.css";

const errorModal = (props) => {
  return (
    <Aux>
      <Modal show={props.show} backdrop="static">
        <Modal.Header>{props.modalHeaderText}</Modal.Header>
        <Modal.Body>
          <p>{props.modalBodyText}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={props.closeModal}>
            {props.okButtonText}
          </Button>
        </Modal.Footer>
      </Modal>
    </Aux>
  );
};

export default errorModal;
