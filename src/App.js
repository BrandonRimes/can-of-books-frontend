import React from 'react';
import axios from "axios";

import BestBooks from './BestBooks';
import Header from './Header';
import Footer from './Footer';
import Profile from './Profile';
import CreateBook from './CreateBook';

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
              <BestBooks books={this.state.books}/>
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
