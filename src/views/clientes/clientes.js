import { LitElement, html, css } from "lit";
import "../../components/clientes/cliente-form.js";
import "../../components/clientes/cliente-tabla.js";

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
    const { name, lastName, email, age } = evento.detail ?? {};

    const cliente = {
      name: String(name ?? "").trim(),
      lastName: String(lastName ?? "").trim(),
      email: String(email ?? "").trim(),
      age: Number(age),
    };

    if (!cliente.name || !cliente.lastName || !cliente.email || !Number.isInteger(cliente.age) || cliente.age < 0) {
        return;
    }

    this.lista = [...this.lista, cliente];
  }

  render() {
    return html`
      <h1>Gestión de clientes - Grupo 1</h1>
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

if (!customElements.get("wc-clientes")) {
  customElements.define("wc-clientes", Clientes);
}