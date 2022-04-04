import { FC, FormEvent, useRef } from "react";
import { v4 as uuid } from "uuid";
import { Form, Modal, Button } from "react-bootstrap";
import { useBudget } from "../context/BudgetContext";

interface Props {
  show: boolean;
  handleClose: () => void;
}

const AddBudget: FC<Props> = ({ show, handleClose }) => {
  const nameRef = useRef<HTMLInputElement>(null!);
  const maxRef = useRef<HTMLInputElement>(null!);

  const { addBudget } = useBudget();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addBudget({
      id: uuid(),
      name: nameRef.current?.value,
      max: parseFloat(maxRef.current.value),
    });
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control ref={nameRef} type="text" required />
          </Form.Group>
          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control ref={maxRef} type="number" required min={0} step={0.01} />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default AddBudget;
