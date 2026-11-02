import {LitElement, html} from 'lit-element';

class Route extends LitElement {
    render(){
        return html`
        <slot></slot>
        `;
    }
}

window.customElements.define('wc-route', Route);