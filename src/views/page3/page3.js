import {LitElement, html, css} from 'lit-element';

class Page3 extends LitElement {
    render(){
        return html`
        <h1>Hola desde la Pagina 3</h1>
        `;
    }
}

window.customElements.define('wc-page3', Page3);