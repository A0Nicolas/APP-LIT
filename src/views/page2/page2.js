import {LitElement, html, css} from 'lit-element';

class Page2 extends LitElement {
    render(){
        return html`
        <h1>Hola desde la Pagina 2</h1>
        `;
    }
}

window.customElements.define('wc-page2', Page2);