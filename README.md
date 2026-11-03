# APP-LIT · Gestión de clientes

Proyecto del **Grupo 1** de Programación Integrativa de Componentes Web (ESPE), hecho con **Lit** y **Vite**. Los datos bajan a los componentes por propiedades y los avisos suben por eventos.

## Cómo ejecutar

```bash
npm install
npm run dev
```

- Gestión de clientes: http://localhost:5173/
- Taller de integración: http://localhost:5173/integracion.html

## Componentes

| Componente | Archivo | Qué hace |
|---|---|---|
| `<wc-cliente-form>` | `src/components/clientes/cliente-form.js` | Formulario de registro; emite `cliente-registrado` con `{name, lastName, email, age}` |
| `<wc-cliente-tabla>` | `src/components/clientes/cliente-tabla.js` | Tabla de clientes; recibe la lista por la propiedad `.list` |
| `<wc-clientes>` | `src/views/clientes/clientes.js` | Padre: escucha el evento del formulario y pasa la lista a la tabla |
| `<wc-integracion>` | `src/views/integracion/integracion.js` | Padre del taller: conecta el formulario del Grupo 2 con nuestra tabla |

El componente externo del Grupo 2 está copiado sin cambios en `src/externos/equipo-2/`. La documentación del taller está en [`src/views/integracion/integracion.md`](src/views/integracion/integracion.md).

## Equipo

- Estéfano Ramírez
- Leonel Aguirre
- Solange Villegas
- Nicolas Garcia
