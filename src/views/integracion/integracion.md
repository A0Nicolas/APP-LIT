# Integración con el componente de otro equipo

## 1. Datos

| Campo | Valor |
|---|---|
| Equipo | Equipo 1 · Grupo 1 · Gestión de clientes |
| Equipo externo | Equipo 2 · Grupo 2 · Inventario |
| Repositorio externo | https://github.com/DaniAleG/app-lit |
| Archivo externo | `src/views/inventario/form-inventario.js` → copiado en `src/externos/equipo-2/form-inventario.js` |
| Commit usado | `1c8417f` |

## 2. Componentes y roles

| Componente | Archivo | Origen | Rol |
|---|---|---|---|
| `<wc-integracion>` | `src/views/integracion/integracion.js` | Nuestro equipo | **Padre**. Dueño del estado `lista`. |
| `<wc-form-inventario>` | `src/externos/equipo-2/form-inventario.js` | Equipo 2 | **Hijo**. Emite el evento `producto-registrado`. |
| `<wc-cliente-tabla>` | `src/components/clientes/cliente-tabla.js` | Nuestro equipo | **Hijo**. Recibe la lista por la propiedad `list`. |

## 3. Flujo de comunicación

```mermaid
flowchart TB
  PADRE["&lt;wc-integracion&gt;<br/>estado: lista"]
  FORM["&lt;wc-form-inventario&gt;<br/>equipo 2"]
  TABLA["&lt;wc-cliente-tabla&gt;<br/>nuestro equipo"]
  FORM -. "EVENTO (sube)<br/>producto-registrado<br/>detail: {codigo, nombre, categoria, cantidad, precio}" .-> PADRE
  PADRE -- "PROPIEDAD (baja)<br/>.list" --> TABLA
```

Los datos bajan por propiedades y los eventos suben. El formulario del Equipo 2 no conoce la tabla; solo avisa con un evento y `<wc-integracion>` decide qué hacer con el dato.

## 4. Adaptador

El formulario del Equipo 2 emite un producto con `{codigo, nombre, categoria, cantidad, precio}`; nuestra tabla espera un cliente con `{name, lastName, email, age}`. Como no se puede modificar el componente externo ni conviene cambiar la tabla, el adaptador vive en `<wc-integracion>`, en el método `agregar`.

```js
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
```

| Campo del producto (Equipo 2) | Columna de la tabla (nuestro equipo) | Transformación |
|---|---|---|
| `nombre` | Nombre (`name`) | `String` |
| `categoria` | Apellido (`lastName`) | `String` |
| `codigo` y `precio` | Correo (`email`) | Texto `Código: … \| Precio: …` |
| `cantidad` | Edad (`age`) | `Number` |

Decisiones del adaptador:

- **Nueva lista en cada registro.** Se usa `[...this.lista, fila]` y no `push`, porque Lit solo vuelve a renderizar cuando cambia la referencia de la propiedad.
- **Valores por defecto.** `?? ""` y `?? 0` evitan que un dato ausente rompa la tabla con `undefined`.
- **Código del Equipo 2 intacto.** `src/externos/equipo-2/form-inventario.js` se copió sin cambios; el adaptador no depende de su interior, solo del evento público `producto-registrado`.
- **Limitación.** Se reutilizan las columnas de clientes, por lo que los encabezados de la tabla (Nombre, Apellido, Correo, Edad) no corresponden al significado real de los datos de inventario.

## 5. Uso de IA

| Herramienta | Quién la usó | Para qué | Qué cambiamos nosotros |
|---|---|---|---|
| Claude (Anthropic) | Estéfano Ramírez | Guía del flujo de Git (ramas, commits, pull requests), borradores de esta documentación y dudas o problemas durante el taller | Estéfano revisó y corrigió los textos y probó el código en su equipo |
| Gemini y Claude | Nicolas García y Solange Villegas | Flujo de los componentes, estilos de los componentes y dudas o problemas durante el taller | Revisaron y adaptaron el código al proyecto; el adaptador de `integracion.js` quedó con valores por defecto, conversión de tipos y una lista nueva en cada registro |
| Gemini | Leonel Aguirre | Consultar por qué fallaban los comandos de prueba escritos en la consola (F12) y cómo corregirlos | Corrigió los comandos agregando la lectura de `shadowRoot` para enviar los datos al componente y obtener la captura de evidencia |

## 6. Dificultades

**Dificultad 1 (Leonel Aguirre): error al probar la robustez desde la consola**

- **Síntoma:** al probar la robustez en la consola (F12) aparecía `Cannot set properties of null`.
- **Causa:** `<wc-form-inventario>` está dentro del Shadow DOM de `<wc-integracion>`, por lo que un `document.querySelector` normal no lo encuentra.
- **Solución:** usar `padre.shadowRoot.querySelector("wc-form-inventario")` en la consola para atravesar el Shadow DOM y pasarle los datos de prueba.

**Dificultad 2 (Leonel Aguirre): `package-lock.json` a punto de subirse por accidente**

- **Síntoma:** `package-lock.json` aparecía entre los cambios listos para commit.
- **Causa:** al ejecutar `npm install` en el IDE, se actualizó automáticamente el árbol de dependencias.
- **Solución:** desmarcar ese archivo en la pestaña *Changes* de GitHub Desktop antes de hacer el commit, para subir solo `evaluacion.md`.

**Dificultad 3 (Estéfano Ramírez): la página de integración mostraba la app de clientes**

- **Síntoma:** en `localhost:5173/integracion.html` se veía «Gestión de clientes» y no el formulario de inventario.
- **Causa:** la dirección tenía un punto al final (`integracion.html.`), y el servidor de Vite devolvió `index.html` por defecto.
- **Solución:** escribir la dirección sin el punto final.
