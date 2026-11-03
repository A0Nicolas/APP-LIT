
import { LitElement, html, css } from "lit";

// Componente externo del Grupo 2: no modificar.
import "../../externos/equipo-2/form-inventario.js";

// Tabla desarrollada por nuestro grupo.
import "../../components/clientes/cliente-tabla.js";

class Integracion extends LitElement {
  static properties = {
    lista: { type: Array },
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

    .aviso {
      color: #475569;
      padding: 12px;
      background: #f1f5f9;
      border-radius: 8px;
    }
  `;

  constructor() {
    super();
    this.lista = [];
  }

  // Adaptador: transforma el producto al formato
  // que requiere nuestra tabla de clientes.
  agregar(evento) {
    const producto = evento.detail ?? {};

    const fila = {
      name: String(producto.nombre ?? ""),
      lastName: String(producto.categoria ?? ""),
      email: `Código: ${producto.codigo ?? ""} | Precio: ${producto.precio ?? 0}`,
      age: Number(producto.cantidad ?? 0),
    };

    this.lista = [...this.lista, fila];
  }

  render() {
    return html`
      <h1>Integración de componentes - Grupo 1</h1>

      <p class="aviso">
        Formulario externo de inventario (Grupo 2)
        conectado con nuestra tabla de clientes.
        Las columnas se reutilizan para mostrar
        los datos del producto mediante un adaptador.
      </p>

      <div class="contenedor">
        <wc-form-inventario
          @producto-registrado=${this.agregar}
        ></wc-form-inventario>

        <wc-cliente-tabla
          .list=${this.lista}
        ></wc-cliente-tabla>
      </div>
    `;
  }
}

if (!customElements.get("wc-integracion")) {
  customElements.define("wc-integracion", Integracion);
}
