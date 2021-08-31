import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';


const BOOKSERVER = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    let booksReq = `${BOOKSERVER}/books`;

    // if (this.state.books) {
    //   // booksReq += `?email=${this.state.title}`;
    // }

    try {
      const response = axios.get(booksReq);
      this.setState({ books: response.data });
      console.log(this.state.books);
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    // {this.state.books.length &&
    //   const carousel = this.state.books.map((book, i) => {
    //   let carouselItem = `
    //     <Carousel.Item key=${i}>
    //       <Carousel.Caption>
    //         <h3>${book.title}</h3>
    //         <p>${book.description}</p>
    //       </Carousel.Caption>
    //     </Carousel.Item>
    //     `
    //   return carouselItem;
    // })}
    

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {/* {this.state.books.length ? (
          <Carousel fade>
            {this.state.books.map((book, i) => {
              return (
                <Carousel.Item key={i}>
                  <Carousel.Caption>
                    <h3>{book.title}</h3>
                    <p>{book.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>)
            })}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )} */}
      </>
    )
  }
}

export default BestBooks;
