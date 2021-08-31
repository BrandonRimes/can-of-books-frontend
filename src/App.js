import React from 'react';
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

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
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

  render() {
    return (
      <>
        <Router>
          <nav>
            <h1>Can of Bøøks</h1>
            <NavLink exact to="/">Home</NavLink>
            <NavLink to="/Profile">Profile</NavLink>
            <NavLink to="/CreateBook">Create</NavLink>
          </nav>
          <Header user={this.state.user} onLogout={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
              <BestBooks />
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
            </Route>
            <Route path="/Profile">
              <Profile />
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            </Route>
            <Route path="/CreateBook">
              <CreateBook />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
