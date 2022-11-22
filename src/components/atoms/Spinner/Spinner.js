import { Component } from "../../../core";

export class Spinner extends Component {

    render() {
        return  `
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        `
    }

}

customElements.define('my-spinner', Spinner)