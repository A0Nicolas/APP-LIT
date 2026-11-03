# Evaluación del componente externo (Leonel)

| Aspecto | Nota (0-5) | Evidencia |
|---|---|---|
| API clara | 4 | `static get properties` declara 6 propiedades claras, pero falta documentación JSDoc y separar el estado interno como `error` (líneas 4-13). |
| Evento bien construido | 5 | El comando `findstr` confirma el uso de `new CustomEvent` enviando los datos en el `detail` con `bubbles: true` y `composed: true` (líneas 86-89). |
| Robustez | 4 | Al inyectar `undefined` y `null` vía consola usando `padre.shadowRoot.querySelector` el componente sobrevive sin errores rojos, pero silencia los arreglos con `String([])` (líneas 55-68). |
| Encapsulamiento | 5 | El inspector de elementos (F12) confirma que `<wc-form-inventario>` crea su propio `#shadow-root (open)`, aislando sus estilos del resto de la página. |
| Reutilización | 5 | La línea 1 del archivo demuestra que la única dependencia es `lit`, sin importar archivos locales de su proyecto original. |

Issue abierto: https://github.com/DaniAleG/app-lit/issues/5