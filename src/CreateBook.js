import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class CreateBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const bookInfo = {
      title: e.target.formTitle.value,
      description: e.target.formDescription.value,
      status: e.target.formStatus.checked,
      email: e.target.formEmail.value,
    }
    console.log('bookInfo', bookInfo);
    this.props.onCreate(bookInfo);
    this.handleModal();
  }

  handleModal = () => {
    if(this.state.showModal) {
      this.setState({ showModal: false });
    } else {
      this.setState({ showModal: true });
    }
  }

  render() {
    return (
      <>
      <Button onClick={this.handleModal}><h1>Create A Book!</h1></Button>
      <Modal show={this.state.showModal} onHide={this.handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create A Book</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle" >
            <Form.Control type="text" placeholder="Book Title e.g. The Chronicles of Narnia" required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Book Description</Form.Label>
            <Form.Control as="textarea" rows={2} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Check type="checkbox" label="Read" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Control type="email" placeholder="Email Address" required/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal>
      </>  
    );
  }
}

export default CreateBook;
