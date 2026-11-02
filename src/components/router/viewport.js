import {LitElement, html} from 'lit-element';

class Viewport extends LitElement {
    constructor() {
        super();
        this.viewDefault = "/home";
    } 
    connectedCallback() {
        this.viewListComponent = this.querySelectorAll("wc-route");
        renderView(this.viewDefault);
    }
    renderView(path){
        this.innerHTML = '';
        this.shadowRoot.innerHTML = "";
        let view = Array.from(this.viewListComponent).find((node)=> {node.getAttribute("path") === path});

        !!view && this.shadowRoot.appendChild(view);
        this.viewDefault = path;
    }
}

window.customElements.define('wc-viewport', Viewport);