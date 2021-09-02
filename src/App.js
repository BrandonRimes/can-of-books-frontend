import React from 'react';
import axios from "axios";

import BestBooks from './BestBooks';
import Header from './Header';
import Footer from './Footer';
import Profile from './Profile';
import CreateBook from './CreateBook';
import UpdateBook from './UpdateBook';

import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";

// const BOOKSERVER = process.env.REACT_APP_SERVER;
const BOOKSERVER = "http://localhost:3001";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      books: [],
      bookToUpdate: null,
      show: false,
    }
  }

  loginHandler = (user) => {
    this.setState({
      user,
    })
  }

  logoutHandler = () => {
    this.setState({
      user: null,
    })
  }

  handleCreate = async (bookInfo) => {
    const bookReq = `${BOOKSERVER}/books`;
    const bookRes = await axios.post(bookReq, bookInfo);
    const newBook = bookRes.data;
    const books = [...this.state.books, newBook];
    this.setState({ books });
  };

  handleDeleteBook = async (bookToDelete) => {
    try {
      const bookReq = `${BOOKSERVER}/books/${bookToDelete._id}`;
      await axios.delete(bookReq);
      const books = this.state.books.filter(candidate => candidate._id !== bookToDelete._id);

      this.setState({ books });
    } catch (error) {
      console.error(error);
    }
    
  };

  handleUpdateBook = async (bookToUpdate) => {
    try {
      console.log('bookToUpdate', bookToUpdate);
      const bookReq = `${BOOKSERVER}/books/${bookToUpdate._id}`;
      const updatedBook = await axios.put(bookReq, bookToUpdate);
      console.log("updatedBook.data", updatedBook.data);
      const books = this.state.books.map(currentBook => {
        console.log("currentBook.title", currentBook.title);
        return currentBook._id === updatedBook.data._id ? updatedBook.data : currentBook;
      });
      // console.log('books:',books);
      // this.setState({ bookToUpdate });
      this.setState({ books });
      this.setState({ show: false });
    } catch (error) {
      console.error(error);
    }
  }

  handleModal = (bookToUpdate) => {
    if(this.state.show) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true, bookToUpdate});
    }
  }

  componentDidMount() {
    let booksReq = `${BOOKSERVER}/books?email=chris@y.net`;

    try {
      axios.get(booksReq).then((res) => this.setState({ books: res.data }));
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <>
        <Router>
          <nav>
            <h1>Can of Bøøks</h1>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/Profile">Profile</NavLink>
          </nav>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
              <CreateBook onCreate={this.handleCreate}/>
              <UpdateBook show={this.state.show} book={this.state.bookToUpdate} onUpdate={this.handleUpdateBook} handleModal={this.handleModal}/>
              <BestBooks books={this.state.books} onDelete={this.handleDeleteBook} handleModal={this.handleModal} show={this.state.show}/>
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
            </Route>
            <Route path="/Profile">
              <Profile />
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
