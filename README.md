🛍️ Catálogo de Productos
¡Bienvenido/a a MiTienda!
Este es un catálogo de productos interactivo con carrito de compras, filtros avanzados y diseño responsive, desarrollado con HTML, CSS y JavaScript puro.
Los productos se obtienen dinámicamente desde AWS (API Gateway + Lambda + DynamoDB).

Ver el sitio en GitHub Pages
https://jonathanfh02.github.io/ProductCatalog/

📦 Características
Catálogo visual: tarjetas con imagen, nombre, precio, categoría y stock.

Filtros avanzados: por categoría y por rango de precio.

Ordenar por precio: ascendente, descendente o por defecto.

Carrito de compras: agregar, eliminar, vaciar y ver resumen de productos.

Persistencia: el carrito se guarda en localStorage.

Validaciones visuales: feedback inmediato en filtros y formularios.

Responsive: diseño mobile-first, se adapta a cualquier dispositivo.

Íconos: uso de FontAwesome para mejorar la interfaz.

Accesibilidad básica: etiquetas y roles para mejor experiencia.

Datos en la nube: integración serverless con AWS.

☁️ Integración con AWS: Productos en la nube
Este catálogo de productos consume datos en tiempo real desde AWS usando una arquitectura serverless moderna:

DynamoDB:
Los productos están almacenados en una tabla DynamoDB (NoSQL, escalable y de alta disponibilidad).

AWS Lambda:
Una función Lambda lee los productos de DynamoDB y responde a las solicitudes.

API Gateway:
Expone un endpoint HTTP seguro para que el frontend obtenga los productos.

Frontend:
El archivo main.js hace un fetch al endpoint de API Gateway y muestra los productos dinámicamente.

🖥️ Tecnologías usadas
HTML5

CSS3 (Flexbox, Grid, variables, media queries)

JavaScript ES6+

FontAwesome (íconos)

Google Fonts (Montserrat, Open Sans)

AWS DynamoDB, Lambda, API Gateway

📋 Estructura del proyecto
text
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
├── README.md
└── ...


📑 Cómo usar
Clona este repositorio:

bash
git clone https://github.com/JonathanFh02/ProductCatalog.git
Abre index.html en tu navegador

¡Listo! Navega, filtra, agrega al carrito y disfruta.

🧑‍💻 Autor
Jonathan Florez Henao
https://github.com/JonathanFh02
