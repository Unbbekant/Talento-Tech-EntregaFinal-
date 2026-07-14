# \# TechStyle - E-Commerce de Moda y Tecnología 🛒✨

# 

# Este es un proyecto de tienda online dinámica (E-Commerce) desarrollado para el programa \*\*Talento Tech\*\*. La aplicación consume datos en tiempo real de una API externa, gestiona un carrito de compras interactivo y ofrece una experiencia de usuario fluida y responsiva.

# 

# \## 🚀 Demo En Vivo

# Puedes ver el sitio funcionando en el siguiente enlace:

# 👉 \*\*\[Tus archivos ya subidos a GitHub Pages](https://tu-usuario.github.io/tu-repositorio/)\*\* \*(¡No te olvides de reemplazar esto por tu link real!)\*

# 

# \---

# 

# \## 🛠️ Características Principales

# 

# \### 1. Integración con API REST (Fake Store API)

# \* Consumo de productos de forma asíncrona utilizando `Fetch API` y sintaxis `async/await`.

# \* Control de errores con estados visuales interactivos en caso de caída del servidor.

# 

# \### 2. Localización y Traducción en Tiempo Real (I18n)

# \* Dado que la API devuelve los datos únicamente en inglés, se implementó un \*\*mapeo y diccionario de datos en JavaScript\*\*.

# \* Las categorías (\*Electronics, Jewelery, Clothing\*), títulos y descripciones de los productos se traducen de forma dinámica antes de renderizarse en pantalla.

# 

# \### 3. Conversión de Moneda Local (ARS)

# \* Los precios originales en dólares (USD) se convierten automáticamente a pesos argentinos (ARS) utilizando un tipo de cambio configurable.

# \* Formateo numérico regional mediante `.toLocaleString('es-AR')` para mostrar separadores de miles adecuados (ej: `$ 131.940`) y redondeo de decimales.

# 

# \### 4. Carrito de Compras Interactivo y Persistente

# \* \*\*Funcionalidad completa:\*\* Permite añadir productos, incrementar/disminuir cantidades directamente desde la tabla del carrito y eliminar artículos.

# \* \*\*Persistencia con LocalStorage:\*\* El estado del carrito se guarda localmente en el navegador, evitando que el usuario pierda su compra al recargar la página.

# \* \*\*Migrador de datos:\*\* Cuenta con un script de migración que detecta si el usuario tenía productos guardados con precios viejos (en USD) y los convierte automáticamente a pesos.

# 

# \### 5. Formulario de Contacto Validado

# \* Formulario interactivo con validación de campos nativa de Bootstrap 5 (`was-validated`).

# \* Envío de datos asíncrono (AJAX) integrado con servicio de mensajería externa, deshabilitando botones dinámicamente para evitar múltiples envíos.

# 

# \### 6. Interfaz de Usuario Moderna y Responsiva

# \* Diseñado bajo metodología \*Mobile First\* utilizando \*\*Bootstrap 5\*\*.

# \* Componentes dinámicos interactivos: Modales de Bootstrap para el carrito de compras y notificaciones emergentes customizadas (\*Toast Notifications\*) para feedback visual inmediato.

# 

# \---

# 

# \## 🧰 Tecnologías Utilizadas

# 

# \* \*\*HTML5\*\* - Estructura semántica.

# \* \*\*CSS3\*\* - Estilos personalizados y variables de diseño.

# \* \*\*Bootstrap 5\*\* - Sistema de grillas, diseño responsivo, componentes interactivos y utilidades de espaciado.

# \* \*\*Vanilla JavaScript (ES6+)\*\* - Manipulación del DOM, lógica del carrito, consumo de APIs (`Fetch`) y persistencia (`LocalStorage`).

# \* \*\*Bootstrap Icons\*\* - Iconografía de la interfaz.

# 

# \---

# 

# \## 📁 Estructura del Proyecto

# 

# ```text

# ├── index.html          # Estructura principal y maquetado de la web

# ├── css/

# │   └── styles.css      # Estilos personalizados adicionales y customización de componentes

# ├── js/

# │   └── script.js       # Lógica del e-commerce, traducción, conversión y persistencia

# └── README.md           # Documentación del proyecto

