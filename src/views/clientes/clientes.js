import { LitElement, html, css } from "lit";

import "./cliente-form.js";
import "./cliente-tabla.js";

class Clientes extends LitElement {
  static properties = {
    lista: { state: true },
  };

  static styles = css`
    :host {
      display: block;
      max-width: 950px;
      margin: 30px auto;
      padding: 20px;
      font-family: system-ui, sans-serif;
    }

    h1 {
      text-align: center;
    }

    .contenedor {
      display: grid;
      gap: 24px;
    }
  `;

  constructor() {
    super();
    this.lista = [];
  }

  agregarCliente(evento) {
    const { name, lastName, email, age } = evento.detail;

    const cliente = {
      name: String(name).trim(),
      lastName: String(lastName).trim(),
      email: String(email).trim(),
      age: Number(age),
    };

    this.lista = [...this.lista, cliente];
  }

  render() {
    return html`
      <h1>Gestión de clientes - Grupo 3</h1>

      <div class="contenedor">
        <wc-cliente-form
          @cliente-registrado=${this.agregarCliente}
        ></wc-cliente-form>

        <wc-cliente-tabla
          .list=${this.lista}
        ></wc-cliente-tabla>
      </div>
    `;
  }
}

customElements.define("wc-clientes", Clientes);