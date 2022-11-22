import { Component } from "./core";
import "./components/molecules/InputGroup/InputGroup";
import { todoList } from "./services/todoList/TodoList";

export class App extends Component {

  constructor() {
    super()
    this.state = {
      tasks: []
    }
    
  }

  componentDidMount() {
    todoList.getTasks()
    .then((data) =>{
      this.setState((state) => {
        return {
          ...state,
          tasks: data,
        }
      })
    })
    .then (() =>{
      
    })
  }

  render() {
    return `
         <div class='container mt-5'>
            <my-input-group></my-input-group>
            <ul class="list-group">
              ${this.state.tasks.map((item) =>(`
              <li class="list-group-item">
                <div class="form-check d-flex justify-content-between align-items-center">
                <div>
                  <input class="form-check-input" type="checkbox" ${item.isCompleted ? 'cheked' : ''} id="flexCheckDefault">
                  <label class="form-check-label" for="flexCheckDefault">
                    ${item.title}
                  </label>
                </div>
                <div class='d-flex'>
                  <my-button content="Delete" classname="btn btn-danger btn-sm"></my-button>
                  <my-button content="Update" classname="btn btn-sm btn-primary"></my-button>
                </div>
                </div>
              </li>
              `)).join(' ')}
            </ul> 
         </div>
           `;
  }
}

customElements.define("my-app", App);


