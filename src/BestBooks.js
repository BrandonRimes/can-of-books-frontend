import React from "react";
import axios from "axios";
import { withAuth0 } from '@auth0/auth0-react';

// import UpdateBook from "./UpdateBook";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";

// const BOOKSERVER = process.env.REACT_APP_SERVER;
const BOOKSERVER = "http://localhost:3001";

class BestBooks extends React.Component {

  componentDidMount() {

    this.props.auth0.getIdTokenClaims()
      .then(async res => {
        const jwt = res.__raw;

        const config = {
          headers: { "Authorization": `Bearer ${jwt}` },
          baseURL: BOOKSERVER,
          url: '/books',
          params: { email: this.props.auth0.user.email },
          method: 'get'
        }
        const booksRes = await axios(config);
        this.setState({ books: booksRes.data });
        this.props.updateState(booksRes.data)
        console.log('booksRes.data',booksRes.data)
      })
      .catch(error => console.error(error));
  }

  render() {

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.props.books ? (
          <Carousel
            style={{
              height: "500px",
              backgroundColor: "red",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {this.props.books.map((book, i) => {
              console.log(book);
              return (
                <Carousel.Item
                  style={{
                    fontSize: "1rem",
                    color: "blue",
                    textAlign: "center",
                  }}
                  key={i}
                >
                  <h3>Book Title: {book.title}</h3>
                  <p>{book.description}</p>
                  <Button onClick={() => this.props.handleModal(book)}>Update Me!</Button>
                  <Button onClick={() => this.props.onDelete(book._id)}>Delete Me!</Button>
                </Carousel.Item>
              );
            })}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    );
  }
}

export default withAuth0(BestBooks);
