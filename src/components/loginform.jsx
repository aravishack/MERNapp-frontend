import React, { Component } from "react";
import Input from "./common/input";
import { Redirect } from "react-router-dom";
import auth from "../services/authService";
class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: ""
    },
    error: {}
  };
  componentDidMount() {}
  validate = () => {
    const error = {};
    const { username, password } = this.state.account;
    if (username.trim() === "") error.username = "Username Required";
    if (password.trim() === "") error.password = "Password Required";
    return Object.keys(error).length == 0 ? null : error;
  };
  handleSubmit = async e => {
    e.preventDefault();
    const error = this.validate();
    this.setState({ error: error || {} });
    if (error) return;
    console.log("Submit");
    try {
      const { username, password } = this.state.account;
      await auth.login(username, password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const error = { ...this.state.errors };
        error.username = ex.response.data;
        this.setState({ error });
      }
    }
  };
  handleInputChange = ({ currentTarget: input }) => {
    const act = { ...this.state.account };
    act[input.name] = input.value;
    this.setState({
      account: act
    });
  };
  render() {
    const { username, password } = this.state.account;
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Login Page</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={username}
            label="Email"
            onChange={this.handleInputChange}
            error={this.state.error.username}
          />
          <Input
            name="password"
            value={password}
            label="Password"
            onChange={this.handleInputChange}
            error={this.state.error.password}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
