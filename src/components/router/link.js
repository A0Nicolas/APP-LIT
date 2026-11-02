import {LitElement, html} from 'lit-element';

class Link extends LitElement {
    static get properties() {
        return {
            to: { type: String, attribute: true }, 
            routerName: { type: String, attribute: true },
        };
    }

    _handleClick() {
        let data = {
            to: this.to,
            routerName: this.routerName
        };
        this.dispatchEvent(new CustomEvent("goEvent", data));
    }

    render(){
        return html`
        <div @click="${(this._handleClick)}">
            <slot></slot>
        </div>
        `;
    }
}

window.customElements.define('wc-link', Link);