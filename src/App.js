import { Component } from "./core";
import "./components/molecules/InputGroup/InputGroup";
import { todoList } from "./services/todoList/TodoList";
import "./components/molecules/Task/Task"

export class App extends Component {

  constructor() {
    super()
    this.state = {
      tasks: [],
      isLoading: false,
    };

  }


  getTasks() {
    todoList.getTasks().then((data) => {
      this.setState((state) => {
        return {
          ...state,
          tasks: data,
        }
      })
    })
  }

  saveTask = (evt) => {
    todoList.createTask({ ...evt.detail, isCompleted: false })
      .then(() => {
        this.getTasks()
      })
  }

  deleteTask = (id) => {
    todoList.deleteTask(id).then(() => {
        this.getTasks()
      })
  }

  onClick = (evt) => {
    const target = evt.target;
    if (target.closest('.delete-action')) {
      const data = target.dataset
      this.deleteTask(data.id)
    }
  }

  componentDidMount() {
    this.getTasks()
    this.addEventListener('save-task', this.saveTask)
    this.addEventListener('click', this.onClick)
  }


  componentWillUnmount() {
    this.removeEventListener('save-task', this.saveTask)
    this.removeEventListener('click', this.onClick)
  }

  render() {
    return `
         <div class='container mt-5'>
            <my-input-group type="save-task"></my-input-group>
            <ul class="list-group">
              ${this.state.tasks
                .map(
                  (item) => `
                  <my-task
                    id="${item.id}"
                    title="${item.title}"
                    iscompleted="${JSON.stringify(item.isCompleted)}"
                  ></my-task>
              `)
              .join(' ')}
            </ul> 
         </div>
           `;
  }
}

customElements.define("my-app", App);


