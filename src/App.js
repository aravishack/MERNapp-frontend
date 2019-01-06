import React, { Component } from "react";
import "./App.css";
import { Route, Redirect, Switch } from "react-router-dom";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import LoginForm from "./components/loginform";
import Homepage from "./components/homepage";
import CreateForm from "./components/createform";
import Logout from "./components/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";

class App extends Component {
  state = {};
  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
  render() {
    const { user } = this.state;
    return (
      <div className="App">
        <NavBar user={user} />
        <Switch>
          <Route path="/home" component={Homepage} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/create" component={CreateForm} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" to="/home" exact />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    );
  }
}

export default App;
