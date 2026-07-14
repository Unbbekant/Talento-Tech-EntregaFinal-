# TechStyle - E-Commerce de Moda y Tecnología 🛒✨

Este es un proyecto de tienda online dinámica (E-Commerce) desarrollado para el programa **Talento Tech**. La aplicación consume datos en tiempo real de APIs externas, gestiona un carrito de compras interactivo, aplica estrategias de precios personalizadas para el mercado local y ofrece una experiencia de usuario fluida y responsiva.

## 🚀 Demo En Vivo

Puedes ver el sitio funcionando en el siguiente enlace:
👉 https://unbbekant.github.io/Talento-Tech-EntregaFinal-/#productos

---

## 🛠️ Características Principales

### 1. Integración con API REST (Fake Store API)
* Consumo de productos de forma asíncrona utilizando `Fetch API` y sintaxis `async/await`.
* Control de errores con estados visuales interactivos en caso de caída del servidor.

### 2. Localización y Traducción en Tiempo Real (I18n)
* Dado que la API devuelve los datos únicamente en inglés, se implementó un **mapeo y diccionario de datos en JavaScript**.
* Las categorías (*Electronics, Jewelery, Clothing*), títulos y descripciones de los productos se traducen de forma dinámica antes de renderizarse en pantalla.

### 3. Conversión de Moneda con Tipo de Cambio Real (Dólar API)
* Consumo en tiempo real de la cotización oficial del **Dólar Tarjeta** en Argentina a través de la integración de [Dólar API](https://dolarapi.com/).
* Mecanismo de contingencia (*Fallback*) con una cotización preestablecida ($1450 ARS) en caso de que el servicio externo experimente caídas, garantizando la continuidad operativa del sitio.
* Formateo numérico regional mediante `.toLocaleString('es-AR')` para mostrar separadores de miles adecuados (ej: `$ 131.940`) y redondeo de decimales.

### 4. Estrategia de Precios: Descuentos y Redondeo Inteligente
* **Descuento Automatizado:** Aplicación de un **30% OFF** automático y exclusivo para todos los artículos de la categoría *Electrónica*. Se visualiza con el precio original tachado en gris, un llamativo distintivo de "30% OFF" y el precio final resaltado en verde.
* **Sistema de Redondeo Inteligente (Psicología de Precios):** Un algoritmo adaptado a la realidad comercial del peso argentino (ARS) procesa los montos para evitar decimales "sucios" y generar números limpios y lógicos para el e-commerce:
  * Montos superiores a $1.000.000 se redondean al $100.000 más cercano *(Ej: de $1.542.000 a $1.500.000)*.
  * Montos entre $100.000 y $1.000.000 se redondean al $10.000 más cercano *(Ej: de $145.300 a $150.000)*.
  * Montos inferiores a $100.000 se redondean al $1.000 más cercano *(Ej: de $12.650 a $13.000)*.

### 5. Carrito de Compras Interactivo y Persistente
* **Funcionalidad completa:** Permite añadir productos, incrementar/disminuir cantidades directamente desde la tabla del carrito y eliminar artículos.
* **Persistencia con LocalStorage:** El estado del carrito se guarda localmente en el navegador, evitando que el usuario pierda su compra al recargar la página.
* **Sincronización de Precios:** Los productos se agregan al carrito arrastrando su precio promocional y redondeado final de manera exacta.

### 6. Formulario de Contacto Validado
* Formulario interactivo con validación de campos nativa de Bootstrap 5 (`was-validated`).
* Envío de datos asíncrono (AJAX) integrado con servicio de mensajería externa, deshabilitando botones dinámicamente para evitar múltiples envíos.

### 7. Interfaz de Usuario Moderna y Responsiva
* Diseñado bajo metodología *Mobile First* utilizando **Bootstrap 5**.
* Componentes dinámicos interactivos: Modales de Bootstrap para el carrito de compras y notificaciones emergentes customizadas (*Toast Notifications*) para un feedback visual inmediato al agregar productos.

---

## 🧰 Tecnologías Utilizadas

* **HTML5** - Estructura semántica.
* **CSS3** - Estilos personalizados y variables de diseño.
* **Bootstrap 5** - Sistema de grillas, diseño responsivo, componentes interactivos y utilidades de espaciado.
* **Vanilla JavaScript (ES6+)** - Manipulación del DOM, lógica del carrito, consumo de APIs (`Fetch`) y persistencia (`LocalStorage`).
* **Integración de APIs externas** - [Fake Store API](https://fakestoreapi.com/) (Catálogo) y [Dólar API](https://dolarapi.com/) (Finanzas).
* **Bootstrap Icons** - Iconografía de la interfaz.

---

## 📁 Estructura del Proyecto

```text
├── index.html          # Estructura principal y maquetado de la web
├── css/
│   └── styles.css      # Estilos personalizados adicionales y customización de componentes
├── js/
│   └── script.js       # Lógica del e-commerce, traducción, conversión y persistencia
└── README.md           # Documentación del proyecto
