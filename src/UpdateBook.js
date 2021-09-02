import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class UpdateBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('handle submit', e.target.formTitle.value);
    this.props.onUpdate({
      _id: this.props.book._id,
      title: e.target.formTitle.value,
      description: e.target.formDescription.value,
      status: e.target.formStatus.checked,
      email: e.target.formEmail.value,
    });
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
    if (!this.props.book) return null;
    return (
      <>
      <Modal show={this.props.show} onHide={this.props.handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update {this.props.book.title}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle" >
            <Form.Control type="text" placeholder="Book Title e.g. The Chronicles of Narnia" defaultValue={this.props.book.title}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Book Description</Form.Label>
            <Form.Control as="textarea" rows={2} defaultValue={this.props.book.description}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formStatus">
            <Form.Check type="checkbox" label="Read" defaultChecked={this.props.book.status}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Control type="email" placeholder="Email Address" defaultValue={this.props.book.email}/>
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

export default UpdateBook;
