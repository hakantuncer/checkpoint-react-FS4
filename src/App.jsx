import React from "react";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      todo: "",
      id: 1,
    };
  }

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem("list"));

    this.setState({
      list: data.length > 0 ? data : this.state.list,
    });
  }

  componentDidUpdate() {
    localStorage.setItem("list", JSON.stringify(this.state.list));
  }

  handleInput = (event) => {
    const todo = event.target.value;
    this.setState({ todo: todo });
  };

  addToDo = () => {
    const item = this.state.todo;
    const idX = this.state.id;
    const arr = { text: item, id: idX, timestamp: Date.now() };
    this.setState({
      list: [...this.state.list, arr],
      todo: "",
      id: idX + 1,
    });
  };

  handleDelete = (index) => {
    const items = [...this.state.list];
    items.splice(index, 1);
    this.setState({
      list: items,
    });
  };

  handleUpdate = (index) => {
    const idY = this.state.id;
    const list = [...this.state.list];
    const todo = this.state.todo;
    const arr = { text: todo, id: idY, timestamp: Date.now() };
    list.splice(index, 1, arr);

    this.setState({
      list: list,
    });
  };

  handleSortByTime = () => {};

  render() {
    const toDoList = this.state.list.map((element, index) => (
      <div>
        Count: {element.text.length}
        <li key={index}>
          {element.text}
          <button onClick={this.handleDelete}>Delete</button>
          <button onClick={() => this.handleUpdate(index)}>Update</button>
        </li>
      </div>
    ));

    return (
      <div>
        <input
          type="text"
          value={this.state.todo}
          onChange={this.handleInput}
        ></input>
        <button onClick={this.addToDo}>Save</button>
        <div>
          <button onClick={this.handleSortByTime}>Sort by Time</button>
          <button onClick={this.handleSortByText}>Sort by Text</button>
          <h1>ToDo List</h1>
          <ul>{toDoList}</ul>
        </div>
      </div>
    );
  }
}
