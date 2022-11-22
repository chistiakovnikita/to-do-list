import { Component } from "../../../core";
import { todoList } from '../../../services/todoList/TodoList'
import '../../atoms/Button/Button';
import '../../atoms/Input/Input';
import '../../atoms/Spinner/Spinner'

export class InputGroup extends Component {

    constructor() {
        super();
        this.state = {
            inputValue: '',
            isLoading: false,
            error: '',
        }
    }

    onSave() {
        if(this.state.inputValue) {
            this.setState((state) => {
                return {
                    ...state,
                    isLoading: true,
                }
            })
            todoList.createTask({
                title: this.state.inputValue,
                isCompleted: false
            }).then(() =>{
                this.setState((state) => {
                   return {
                    ...state,
                    inputValue: '',
                   }
                })

            })
            .catch(() => {
                this.setState((state) => {
                    return{
                        ...state,
                        error: 'ошибка',
                    }
                })
            })
            .finally(() => {
                this.setState((state) => {
                    return {
                        ...state,
                        isLoading: false,
                    }
                })
            }) 
        }  
    }

    onInput(evt) {
        this.setState((state) => {
            return {
                ...state,
                inputValue: evt.detail.value
            }
        })
    }

    componentDidMount() {
        this.addEventListener('save-task', this.onSave);
        this.addEventListener('custom-input', this.onInput)
    }

    render() {  
        return  `
            ${
            this.state.isLoading &&
            `
            <my-spinner></my-spinner>
            `
            }
            <div class="input-group mb-3">
                <my-input value="${this.state.inputValue}" placeholder="Add a new task" type="text"></my-input>
             <my-button eventtype='save-task' content="Save" classname="btn btn-outline-primary"></my-button>
            </div>
            <div>${this.state.error}</div>
       `  
    }
}

customElements.define('my-input-group', InputGroup)