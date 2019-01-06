import React, { Component } from "react";
import Input from "./common/input";
import { Redirect } from "react-router-dom";
import * as userService from "../services/userService";
import auth from "../services/authService";
class CreateForm extends Component {
  state = {
    account: {
      username: "",
      password: "",
      email: "",
      isAdmin: true
    },
    error: {}
  };
  componentDidMount() {}
  validate = () => {
    const error = {};
    const { username, password, email } = this.state.account;
    if (username.trim() === "") error.username = "Username Required";
    if (password.trim() === "") error.password = "Password Required";
    if (email.trim() === "") error.email = "Email Required";
    return Object.keys(error).length == 0 ? null : error;
  };
  handleSubmit = async e => {
    e.preventDefault();
    const error = this.validate();
    this.setState({ error: error || {} });
    if (error) return;
    console.log("Submit");
    try {
      const response = await userService.register(this.state.account);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      window.location = "/";
      alert("User Registered");
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
    const { username, password, email } = this.state.account;
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <h1>Create Account Page</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={username}
            label="Username"
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
          <Input
            name="email"
            value={email}
            label="Email"
            onChange={this.handleInputChange}
            error={this.state.error.email}
          />
          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    );
  }
}

export default CreateForm;
