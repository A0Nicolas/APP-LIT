import { LitElement, html, css } from "lit";

class ClienteForm extends LitElement {
  static properties = {
    name: { type: String },
    lastName: { type: String },
    email: { type: String },
    age: { type: String },
  };

  static styles = css`
    :host { display: block; font-family: system-ui, sans-serif; }
    form { padding: 1rem; border: 1px solid #aaa; border-radius: 8px; }
    h2 { margin: 0 0 1rem; }
    label { display: block; margin: .6rem 0 .2rem; }
    input { box-sizing: border-box; padding: .55rem; width: 100%; border: 1px solid #aaa; border-radius: 5px; }
    button { margin-top: 1rem; padding: .6rem 1rem; cursor: pointer; }
  `;

  constructor() {
    super();
    this.name = "";
    this.lastName = "";
    this.email = "";
    this.age = "";
  }

  actualizar(campo, evento) {
    this[campo] = evento.target.value;
  }

  registrar(evento) {
    evento.preventDefault();
    const name = this.name.trim();
    const lastName = this.lastName.trim();
    const email = this.email.trim();
    const age = Number(this.age);

    if (!name || !lastName || !email || !Number.isInteger(age) || age < 0 || age > 120) {
      return;
    }

    this.dispatchEvent(new CustomEvent("cliente-registrado", {
      detail: { name, lastName, email, age },
      bubbles: true,
      composed: true,
    }));

    this.name = "";
    this.lastName = "";
    this.email = "";
    this.age = "";
  }

  render() {
    return html`
      <form @submit=${this.registrar}>
        <h2>Registro de clientes</h2>
        <label for="nombre">Nombre</label>
        <input id="nombre" type="text" required .value=${this.name}
          @input=${(e) => this.actualizar("name", e)} />
        <label for="apellido">Apellido</label>
        <input id="apellido" type="text" required .value=${this.lastName}
          @input=${(e) => this.actualizar("lastName", e)} />
        <label for="email">Correo electrónico</label>
        <input id="email" type="email" required .value=${this.email}
          @input=${(e) => this.actualizar("email", e)} />
        <label for="edad">Edad</label>
        <input id="edad" type="number" min="0" max="120" step="1" required .value=${this.age}
          @input=${(e) => this.actualizar("age", e)} />
        <button type="submit">Registrar cliente</button>
      </form>
    `;
  }
}

if (!customElements.get("wc-cliente-form")) {
  customElements.define("wc-cliente-form", ClienteForm);
}