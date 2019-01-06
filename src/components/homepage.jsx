import React, { Component } from "react";
import Input from "./common/input";
import ListGroup from "./common/listgroup";
import {
  getLists,
  saveList,
  deleteList,
  getList
} from "../services/listService";
import auth from "../services/authService";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todolist: "",
      error: "",
      todolistObject: { title: "" },
      editFlag: false,
      editList: {}
    };
  }
  async componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
    await this.populateList();
  }
  async populateList() {
    try {
      const { data: listObject } = await getLists();
      this.setState({ todolistObject: listObject });
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  validate = () => {
    let error = "";
    if (this.state.todolist.trim() === "") error = "Required Field";
    return error.length == 0 ? null : error;
  };
  handleSubmit = async e => {
    e.preventDefault();
    let error = this.validate();
    if (error) {
      this.setState({
        error: error
      });
      return;
    } else {
      await saveList({ title: this.state.todolist });
      this.setState({
        error: "",
        todolist: ""
      });
    }
    console.log("Submit");
    await this.populateList();
    this.props.history.push("/home");
  };
  handleInputChange = ({ currentTarget: input }) => {
    let act = input.value;
    this.setState({
      todolist: act
    });
  };
  handleEdit = async data => {
    let list = await getList(data._id);
    console.log(list.data);
    this.setState({
      editFlag: true,
      editList: list.data
    });
  };
  handleEditChange = ({ currentTarget: input }) => {
    this.setState({
      editList: { ...this.state.editList, title: input.value }
    });
  };
  handleEditSubmit = async e => {
    await saveList(this.state.editList);
    this.setState({
      editFlag: false,
      editList: {}
    });
  };
  handleDelete = async data => {
    await deleteList(data._id);
    await this.populateList();
  };
  render() {
    const { todolist, user, editFlag, editList } = this.state;
    return (
      <React.Fragment>
        {user && (
          <React.Fragment>
            <h1>Add to the List</h1>
            <form onSubmit={this.handleSubmit}>
              <Input
                name="addtolist"
                value={todolist}
                label="Add To List"
                onChange={this.handleInputChange}
                error={this.state.error}
              />
              <button className="btn btn-primary">Add</button>
            </form>
            {editFlag && (
              <form onSubmit={this.handleEditSubmit}>
                <Input
                  name="editlist"
                  value={editList.title}
                  label="Edit The List"
                  onChange={this.handleEditChange}
                  error={this.state.error}
                />
                <button className="btn btn-primary">Save</button>
              </form>
            )}
            <div className="items-list">
              <ListGroup
                listitems={this.state.todolistObject}
                onDeleteClick={this.handleDelete}
                onEditClick={this.handleEdit}
              />
            </div>
          </React.Fragment>
        )}
        {!user && <h1>Create account or Login to add item into the list</h1>}
      </React.Fragment>
    );
  }
}

export default Homepage;
