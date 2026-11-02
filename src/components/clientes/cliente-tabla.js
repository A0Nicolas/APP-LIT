import { LitElement, html, css } from "lit";

class ClienteTabla extends LitElement {
  static properties = {
    list: { type: Array },
  };

  static styles = css`
    :host { display: block; font-family: system-ui, sans-serif; }
    h2 { margin-top: 0; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: .65rem; border: 1px solid #aaa; text-align: left; overflow-wrap: anywhere; }
    th { background: #ececec; }
    p { padding: .75rem; border: 1px dashed #aaa; border-radius: 6px; }
  `;

  constructor() {
    super();
    this.list = [];
  }

  render() {
    const clientes = Array.isArray(this.list) ? this.list : [];
    return html`
      <section>
        <h2>Clientes registrados (${clientes.length})</h2>
        ${clientes.length === 0
          ? html`<p>No hay clientes registrados todavía.</p>`
          : html`
              <table>
                <thead>
                  <tr><th>Nombre</th><th>Apellido</th><th>Correo</th><th>Edad</th></tr>
                </thead>
                <tbody>
                  ${clientes.map((cliente) => html`
                    <tr>
                      <td>${cliente.name ?? ""}</td>
                      <td>${cliente.lastName ?? ""}</td>
                      <td>${cliente.email ?? ""}</td>
                      <td>${cliente.age ?? ""}</td>
                    </tr>
                  `)}
                </tbody>
              </table>
            `}
      </section>
    `;
  }
}

if (!customElements.get("wc-cliente-tabla")) {
  customElements.define("wc-cliente-tabla", ClienteTabla);
}