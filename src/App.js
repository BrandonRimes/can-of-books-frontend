import React from 'react';
import axios from "axios";
import { withAuth0 } from '@auth0/auth0-react';

import BestBooks from './BestBooks';
import Header from './Header';
import Footer from './Footer';
import Profile from './Profile';
import CreateBook from './CreateBook';
import UpdateBook from './UpdateBook';
import Login from './Login';

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

  updateState = (data) => {
    this.setState({ books: data })
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
    this.props.auth0.getIdTokenClaims()
    .then(async res => {
      const jwt = res.__raw;

      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        data: {
          email: this.props.auth0.user.email,
          title: bookInfo.title,
          description: bookInfo.description,
          status: bookInfo.status,
        },
        baseURL: BOOKSERVER,
        url: '/books',
        method: 'post'
      }

      const bookRes = await axios(config);
      const newBook = bookRes.data;
      const books = [...this.state.books, newBook];
      console.log('test');
      this.setState({ books: books });
    })
    .catch(err => console.error(err));
    // const bookReq = `${BOOKSERVER}/books`;
    // const bookRes = await axios.post(bookReq, bookInfo);
    // const newBook = bookRes.data;
    // const books = [...this.state.books, newBook];
    // this.setState({ books });
  };

  handleDeleteBook = async (id) => {
    // try {
    //   const bookReq = `${BOOKSERVER}/books/${bookToDelete._id}`;
    //   await axios.delete(bookReq);
    //   const books = this.state.books.filter(candidate => candidate._id !== bookToDelete._id);

    //   this.setState({ books });
    // } catch (error) {
    //   console.error(error);
    // }
    this.props.auth0.getIdTokenClaims()
      .then(async res => {
        const jwt = res.__raw;
        // const id = bookToDelete._id;
        let newBooks = this.state.books;
        newBooks = newBooks.filter((book) => book._id !== id);
        this.setState({ books: newBooks });

        const config = {
          params: { email: this.props.auth0.user.email },
          headers: { "Authorization": `Bearer ${jwt}` },
          method: 'delete',
          baseURL: BOOKSERVER,
          url: `/books/${id}`
        }

        await axios(config);
      })
      .catch(error => console.error(error));
  };

  handleUpdateBook = async (bookToUpdate) => {
    this.props.auth0.getIdTokenClaims()
    .then(async res => {
      const jwt = res.__raw;

      const config = {
        headers: { "Authorization": `Bearer ${jwt}` },
        data: {
          email: this.props.auth0.user.email,
          title: bookToUpdate.title,
          description: bookToUpdate.description,
          status: bookToUpdate.status,
        },
        method: 'put',
        baseURL: BOOKSERVER,
        url: `/books/${bookToUpdate._id}`
      }

      const updatedBook = await axios(config);
      const books = this.state.books.map(currentBook => {
        return currentBook._id === updatedBook.data._id ? updatedBook.data : currentBook;
      });
      this.setState({ bookToUpdate });
      this.setState({ books });
      this.setState({ show: false });
    })
    .catch(error => console.error(error));
    // try {
    //   const bookReq = `${BOOKSERVER}/books/${bookToUpdate._id}`;
    //   const updatedBook = await axios.put(bookReq, bookToUpdate);
    //   const books = this.state.books.map(currentBook => {
    //     return currentBook._id === updatedBook.data._id ? updatedBook.data : currentBook;
    //   });
    //   // this.setState({ bookToUpdate });
    //   this.setState({ books });
    //   this.setState({ show: false });
    // } catch (error) {
    //   console.error(error);
    // }
  }

  handleModal = (bookToUpdate) => {
    if(this.state.show) {
      this.setState({ show: false });
    } else {
      this.setState({ show: true, bookToUpdate});
    }
  }

  // componentDidMount() {
  //   // let booksReq = `${BOOKSERVER}/books?email=chris@y.net`;

  //   // try {
  //   //   axios.get(booksReq).then((res) => this.setState({ books: res.data }));
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  //   this.props.auth0.getIdTokenClaims()
  //     .then(async res => {
  //       const jwt = res.__raw;

  //       const config = {
  //         headers: { "Authorization": `Bearer ${jwt}` },
  //         baseURL: BOOKSERVER,
  //         url: '/books',
  //         params: { email: this.props.auth0.user.email },
  //         method: 'get'
  //       }
  //       const booksRes = await axios(config);
  //       this.setState({ books: booksRes.data });
  //       console.log('booksRes.data',booksRes.data)
  //     })
  //     .catch(error => console.error(error));
  // }

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
              {this.props.auth0.isAuthenticated ?
              <>
                <CreateBook onCreate={this.handleCreate}/>
                <UpdateBook show={this.state.show} book={this.state.bookToUpdate} onUpdate={this.handleUpdateBook} handleModal={this.handleModal}/>
                <BestBooks books={this.state.books} onDelete={this.handleDeleteBook} handleModal={this.handleModal} show={this.state.show} updateState={this.updateState}/>
              </>
              : <Login />}
            </Route>
            <Route path="/Profile">
              <Profile />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
