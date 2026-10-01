import { Component } from 'react';

class Count extends Component {
  render() {
    return <p>Total Todos: {this.props.count}</p>;
  }
}

class ClassInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: ['Just some demo tasks', 'As an example'],
      inputVal: '',
      editingTodo: null,
      editValue: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
    this.handleResubmit = this.handleResubmit.bind(this);
  }

  handleInputChange(e) {
    this.setState((state) => ({
      ...state,
      inputVal: e.target.value,
    }));
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState((state) => ({
      todos: state.todos.concat(state.inputVal),
      inputVal: '',
    }));
  }

  handleDelete(todoToBeDeleted) {
    this.setState((state) => ({
      todos: state.todos.filter((todo) => todo !== todoToBeDeleted),
    }));
  }

  handleEdit(todoToBeEditted) {
    this.setState({ editingTodo: todoToBeEditted, editValue: todoToBeEditted });
  }

  handleEditChange(e) {
    this.setState({
      editValue: e.target.value,
    });
  }

  handleResubmit() {
    this.setState((state) => ({
      todos: state.todos.map((todo) =>
        todo === state.editingTodo ? state.editValue : todo,
      ),
      editingTodo: null,
      editValue: '',
    }));
  }

  render() {
    return (
      <section>
        <h3>{this.props.name}</h3>
        {/* The input field to enter To-Do's */}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="task-entry">Enter a task: </label>
          <input
            type="text"
            name="task-entry"
            value={this.state.inputVal}
            onChange={this.handleInputChange}
          />
          <button type="submit">Submit</button>
        </form>
        <h4>All the tasks!</h4>
        {/* The list of all the To-Do's, displayed */}
        <Count count={this.state.todos.length} />
        <ul>
          {this.state.todos.map((todo, index) => (
            <div key={index}>
              {this.state.editingTodo === todo ? (
                <input
                  type="text"
                  value={this.state.editValue}
                  onChange={this.handleEditChange}
                />
              ) : (
                <li>{todo}</li>
              )}
              <button type="button" onClick={() => this.handleDelete(todo)}>
                Delete
              </button>
              {this.state.editingTodo === todo ? (
                <button type="button" onClick={this.handleResubmit}>
                  Resubmit
                </button>
              ) : (
                <button type="button" onClick={() => this.handleEdit(todo)}>
                  Edit
                </button>
              )}
            </div>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
