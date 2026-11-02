import {LitElement, html, css} from 'lit-element';

class Router extends LitElement {
    static get properties() {
        return {
            name: {
                type: String,
                attribute: true,
            }
        }
    }
    constructor(){
        super();
    }

    connectedCallback(){
        this.viewportList = this.querySelectorAll("wc-viewport");
    }

    _listenerGoEvent(event){
        let {to, routerName} = event.data;
        if(routerName === undefined || routerName === this.name){
            this.querySelector('wc-viewport').forEach((viewport) => {
                viewport.renderView(to);
            });
            event.stopPropagation();
        }
    }

    render(){
        return html`
        `;
    }
}

window.customElements.define('wc-router', Router);