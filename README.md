# Motores de plantillas

## Consigna:

1- Utilizando la misma API de productos del proyecto entregable de la clase anterior, construir un web server (no REST) que incorpore:

- Un formulario de carga de productos en la ruta raíz (configurar la ruta '/productos' para recibir el POST, y redirigir al mismo formulario).
- Una vista de los productos cargados (utilizando plantillas de handlebars) en la ruta GET '/productos'.
- Ambas páginas contarán con un botón que redirija a la otra.

2- Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por pug.

3- Manteniendo la misma funcionalidad reemplazar el motor de plantillas handlebars por ejs.

4- Por escrito, indicar cuál de los tres motores de plantillas prefieres para tu proyecto y por qué.

## Resolucion consigna 4:

Al haber usado los 3 motores de plantillas y ante la necesidad de ser usado como herramienta para la entrega del proyecto final de backend elijo EJS para el desarrollo del mismo.

Los motivos son:

- 🔡 Sintaxis muy facil de aprender. No requiere aprender una sintaxis nueva para representar html
- 🟥🟨 La forma de modularizar los diferentes componentes es lo suficientemente intuitivo.
- 🧡 Se puede usar codigo de JS dentro de las template.
- ✅⚙ Menor configuracion necesaria que otros engines para ser funcional con ExpressJs
