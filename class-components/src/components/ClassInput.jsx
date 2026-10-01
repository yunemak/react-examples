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
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
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
          {this.state.todos.map((todo) => (
            <div key={todo}>
              <li>{todo}</li>
              <button
                key={todo}
                type="button"
                onClick={() => this.handleDelete(todo)}
              >
                Delete
              </button>
            </div>
          ))}
        </ul>
      </section>
    );
  }
}

export default ClassInput;
