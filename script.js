// ==========================================
// CONFIGURACIÓN Y VARIABLES GLOBALES
// ==========================================
const PRODUCT_API_URL = "https://fakestoreapi.com/products";
const DOLAR_API_URL = "https://dolarapi.com/v1/dolares/tarjeta"; 

let productos = []; // Almacenará los productos obtenidos de la API
let carrito = JSON.parse(localStorage.getItem("techstyle_cart")) || []; // Carga el carrito guardado
let tipoCambio = 1450; // Valor de respaldo por si falla la API

// Diccionario de traducción para categorías
const traduccionesCategorias = {
    "electronics": "Electrónica",
    "jewelery": "Joyería",
    "men's clothing": "Ropa de Hombre",
    "women's clothing": "Ropa de Mujer"
};

// Diccionario de traducción para títulos
const traduccionesProductos = {
    "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops": "Mochila Fjallraven - Foldsack No. 1 (Portátil 15\")",
    "Mens Casual Premium Slim Fit T-Shirts": "Remera Entallada Premium Casual para Hombre",
    "Mens Cotton Jacket": "Campera de Algodón para Hombre",
    "Mens Casual Slim Fit": "Pantalón Casual Slim Fit para Hombre",
    "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet": "Pulsera de Dragón de Oro y Plata - John Hardy",
    "Solid Gold Petite Micropave": "Anillo de Oro Sólido Petite Micropave",
    "White Gold Plated Princess": "Anillo de Princesa Bañado en Oro Blanco",
    "Pierced Owl Rose Gold Plated Stainless Steel Double": "Aros de Acero Inoxidable Bañados en Oro Rosa",
    "WD 2TB Elements Portable External Hard Drive - USB 3.0": "Disco Duro Externo Portátil WD 2TB - USB 3.0",
    "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s": "Disco Estado Sólido Interno SanDisk SSD PLUS 1TB",
    "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5": "Disco SSD Silicon Power 256GB SATA III",
    "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive": "Disco Externo WD 4TB para PlayStation 4",
    "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin": "Monitor Acer 21.5\" Full HD IPS Ultra Delgado",
    "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED": "Monitor Gamer Curvo Samsung 49\" QLED Súper Ultrawide",
    "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats": "Campera de Nieve 3 en 1 para Mujer BIYLACLESEN",
    "Lock and Love Women's Removable Hooded Casual Leather Jacket": "Campera de Cuero Sintético con Capucha Desmontable para Mujer",
    "Rain Jacket Women Windbreaker Striped Climbing Raincoats": "Campera Rompevientos Impermeable para Mujer",
    "MBJ Women's Solid Short Sleeve Boat Neck V ": "Remera de Manga Corta Cuello Bote para Mujer",
    "Opna Women's Short Sleeve Moisture Wicking Athletic": "Remera Deportiva de Manga Corta para Mujer",
    "DANVOUY Womens T Shirt Casual Cotton Short Sleeve": "Remera Casual de Algodón para Mujer DANVOUY"
};

// Diccionario de traducción para descripciones
const traduccionesDescripciones = {
    1: "Tu mochila perfecta para el uso diario y caminatas de fin de semana. Cuenta con un compartimento acolchado ideal para computadoras portátiles de hasta 15 pulgadas.",
    2: "Remera de estilo entallado con mangas ranglan combinadas. Confeccionada en tela ligera y súper suave que garantiza comodidad, frescura y alta durabilidad.",
    3: "Excelente campera de abrigo para media estación e invierno. Material cortavientos muy confortable, ideal para actividades al aire libre o uso urbano.",
    4: "Pantalón casual de corte clásico y entallado. Versátil, cómodo y fácil de combinar con remeras o camisas para cualquier tipo de evento.",
    5: "De la mítica colección Legends Naga. Esta pulsera artesanal presenta un diseño detallado de dragón en plata pura y eslabones con detalles de oro de 18k.",
    6: "Un anillo de oro clásico, fino y sumamente delicado. Diseñado para lucir elegante en el día a día o complementar otros accesorios.",
    7: "Anillo de estilo princesa bañado en oro blanco con piedras brillantes integradas. El regalo ideal para ocasiones especiales y compromisos.",
    8: "Aros modernos de acero inoxidable con un sofisticado baño de oro rosa. Diseño de doble cara cómodo, liviano y altamente resistente.",
    9: "Almacenamiento portátil de alta capacidad y tamaño compacto. Conexión USB 3.0 de velocidad rápida y compatibilidad plug-and-play directa.",
    10: "La actualización que tu computadora necesita. Logra un arranque en segundos, apagados veloces y una respuesta inmediata en todas tus aplicaciones.",
    11: "Unidad de estado sólido de alto rendimiento con tecnología 3D NAND. Potencia la velocidad de transferencia de datos de tu PC de forma notoria.",
    12: "Disco externo optimizado y diseñado especialmente para consolas PlayStation 4. Lleva toda tu biblioteca de juegos con vos a donde vayas.",
    13: "Pantalla IPS Full HD de 21.5 pulgadas con marco ultra delgado. Ofrece colores vibrantes y excelentes ángulos de visión ideales para trabajar o estudiar.",
    14: "Monitor gamer curvo con pantalla súper ultrawide de 49 pulgadas. Tasa de refresco de 144Hz y tecnología QLED para una inmersión competitiva total.",
    15: "Campera técnica de nieve impermeable 3 en 1. Incluye un forro térmico interno desmontable ideal para soportar climas extremos de invierno.",
    16: "Campera moderna de cuero sintético con capucha de tela desmontable. Perfecta para armar looks urbanos, abrigados y con mucha onda.",
    17: "Rompevientos impermeable y ultraliviano con capucha ajustable. Diseñado especialmente para días de lluvia, caminatas y senderismo.",
    18: "Remera lisa de manga corta con un elegante cuello bote. Confeccionada con un tejido elástico de calidad premium muy suave al tacto.",
    19: "Remera deportiva de alto rendimiento. Su tela tecnológica absorbe y evapora la humedad rápidamente para mantenerte fresco durante el entrenamiento.",
    20: "Remera casual de corte clásico 100% algodón. Una prenda básica indispensable, fresca, cómoda y combinable para el uso diario."
};

// ==========================================
// INICIALIZACIÓN DE LA APLICACIÓN
// ==========================================
document.addEventListener("DOMContentLoaded", async () => {
    await obtenerTipoCambio();
    await cargarProductos();
    actualizarInterfazCarrito();
    inicializarFormulario();
});

// ==========================================
// FUNCIONES DE APIs Y PROCESAMIENTO
// ==========================================

async function obtenerTipoCambio() {
    try {
        const respuesta = await fetch(DOLAR_API_URL);
        if (!respuesta.ok) throw new Error("No se pudo obtener la cotización del dólar.");
        const datos = await respuesta.json();
        
        if (datos.venta) {
            tipoCambio = datos.venta;
            console.log(`💵 Tipo de cambio (Dólar Tarjeta): $${tipoCambio} ARS`);
        }
    } catch (error) {
        console.warn("⚠️ Error al conectar con Dólar API. Usando tipo de cambio por defecto:", tipoCambio);
    }
}

// Función inteligente de redondeo para el mercado argentino
function aplicarRedondeo(valor) {
    if (valor >= 1000000) {
        // Redondea al $100.000 más cercano (Ej: 1.550.000 -> 1.500.000 o 1.540.000 -> 1.500.000)
        return Math.round(valor / 100000) * 100000;
    } else if (valor >= 100000) {
        // Redondea a los $10.000 más cercanos (Ej: 145.300 -> 150.000)
        return Math.round(valor / 10000) * 10000;
    } else {
        // Redondea a los $1.000 más cercanos (Ej: 12.650 -> 13.000)
        return Math.round(valor / 1000) * 1000;
    }
}

async function cargarProductos() {
    const contenedor = document.getElementById("products-container");
    
    try {
        const respuesta = await fetch(PRODUCT_API_URL);
        if (!respuesta.ok) throw new Error("Error al cargar los productos.");
        const datosOriginales = await respuesta.json();
        
        // Procesamos los precios, descuentos y redondeos antes de renderizar
        productos = datosOriginales.map(producto => {
            const precioBaseARS = producto.price * tipoCambio;
            const tieneDescuento = producto.category.toLowerCase() === "electronics";
            
            // Calculamos precio final considerando descuento
            const precioCalculado = tieneDescuento ? (precioBaseARS * 0.7) : precioBaseARS;

            // Guardamos las propiedades calculadas y redondeadas en el objeto del producto
            return {
                ...producto,
                precioOriginalARS: aplicarRedondeo(precioBaseARS),
                precioARS: aplicarRedondeo(precioCalculado),
                tieneDescuento: tieneDescuento
            };
        });
        
        contenedor.innerHTML = "";
        
        productos.forEach(producto => {
            const categoriaTraducida = traduccionesCategorias[producto.category.toLowerCase()] || producto.category;
            const tituloTraducido = traduccionesProductos[producto.title] || producto.title;
            const descripcionTraducida = traduccionesDescripciones[producto.id] || producto.description;

            // Generamos la estructura de precios (con o sin descuento visualmente)
            let seccionPrecioHTML = "";
            let badgeDescuentoHTML = "";

            if (producto.tieneDescuento) {
                badgeDescuentoHTML = `<span class="badge bg-danger position-absolute top-0 end-0 m-3">30% OFF</span>`;
                seccionPrecioHTML = `
                    <div class="mb-3">
                        <span class="text-decoration-line-through text-muted small d-block">${formatearMoneda(producto.precioOriginalARS)}</span>
                        <span class="fs-4 fw-bold text-success">${formatearMoneda(producto.precioARS)}</span>
                    </div>
                `;
            } else {
                seccionPrecioHTML = `
                    <div class="fs-4 fw-bold text-primary mb-3">${formatearMoneda(producto.precioARS)}</div>
                `;
            }

            const tarjetaHTML = `
                <div class="col-12 col-md-6 col-lg-4 d-flex align-items-stretch">
                    <div class="card h-100 w-100 shadow-sm d-flex flex-column justify-content-between p-3 position-relative">
                        <span class="badge bg-secondary position-absolute top-0 start-0 m-3">${categoriaTraducida}</span>
                        ${badgeDescuentoHTML}
                        <div class="d-flex align-items-center justify-content-center my-3" style="height: 200px;">
                            <img src="${producto.image}" class="card-img-top img-fluid" alt="${tituloTraducido}" style="max-height: 100%; max-width: 100%; object-fit: contain;">
                        </div>
                        <div class="card-body p-0 d-flex flex-column justify-content-between">
                            <div>
                                <h5 class="card-title fw-bold fs-6 limit-lines" title="${tituloTraducido}">${tituloTraducido}</h5>
                                <p class="card-text text-muted small limit-description">${descripcionTraducida}</p>
                            </div>
                            <div class="mt-3">
                                ${seccionPrecioHTML}
                                <button class="btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2" onclick="agregarAlCarrito(${producto.id})">
                                    <i class="bi bi-cart-plus"></i> Agregar al Carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            contenedor.innerHTML += tarjetaHTML;
        });
        
    } catch (error) {
        console.error(error);
        contenedor.innerHTML = `
            <div class="col-12 text-center my-5">
                <i class="bi bi-exclamation-triangle display-1 text-danger"></i>
                <h3 class="mt-3 fw-bold">¡Ups! Hubo un problemita al cargar los productos</h3>
                <p class="text-muted">Por favor, intenta recargar la página más tarde.</p>
            </div>
        `;
    }
}

// ==========================================
// LÓGICA DEL CARRITO DE COMPRAS
// ==========================================

function agregarAlCarrito(idProducto) {
    const productoOriginal = productos.find(p => p.id === idProducto);
    if (!productoOriginal) return;

    const itemExistente = carrito.find(item => item.id === idProducto);

    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            id: productoOriginal.id,
            titulo: traduccionesProductos[productoOriginal.title] || productoOriginal.title,
            precioARS: productoOriginal.precioARS, // Ya trae el precio final procesado y redondeado
            imagen: productoOriginal.image,
            cantidad: 1
        });
    }

    guardarCarrito();
    actualizarInterfazCarrito();
    mostrarNotificacion(`${traduccionesProductos[productoOriginal.title] || productoOriginal.title} agregado al carrito.`);
}

function modificarCantidad(idProducto, cambio) {
    const item = carrito.find(item => item.id === idProducto);
    if (!item) return;

    item.cantidad += cambio;

    if (item.cantidad <= 0) {
        eliminarDelCarrito(idProducto);
    } else {
        guardarCarrito();
        actualizarInterfazCarrito();
    }
}

function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    guardarCarrito();
    actualizarInterfazCarrito();
}

function guardarCarrito() {
    localStorage.setItem("techstyle_cart", JSON.stringify(carrito));
}

function actualizarInterfazCarrito() {
    const badge = document.getElementById("cart-badge");
    const container = document.getElementById("cart-items-container");
    const emptyMessage = document.getElementById("cart-empty-message");
    const footer = document.getElementById("cart-footer");
    const totalPriceSpan = document.getElementById("cart-total-price");

    const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    badge.textContent = totalItems;

    if (carrito.length === 0) {
        container.innerHTML = "";
        emptyMessage.classList.remove("d-none");
        footer.classList.add("d-none");
        return;
    }

    emptyMessage.classList.add("d-none");
    footer.classList.remove("d-none");

    let htmlTabla = `
        <table class="table align-middle">
            <thead>
                <tr>
                    <th scope="col">Producto</th>
                    <th scope="col" class="text-center">Cantidad</th>
                    <th scope="col" class="text-end">Subtotal</th>
                    <th scope="col" class="text-center">Quitar</th>
                </tr>
            </thead>
            <tbody>
    `;

    let totalCompra = 0;

    carrito.forEach(item => {
        const subtotal = item.precioARS * item.cantidad;
        totalCompra += subtotal;

        htmlTabla += `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${item.imagen}" alt="${item.titulo}" class="img-thumbnail me-3" style="width: 50px; height: 50px; object-fit: contain;">
                        <div>
                            <h6 class="mb-0 fw-bold fs-6 text-truncate" style="max-width: 200px;">${item.titulo}</h6>
                            <small class="text-muted">${formatearMoneda(item.precioARS)} c/u</small>
                        </div>
                    </div>
                </td>
                <td class="text-center">
                    <div class="d-flex align-items-center justify-content-center gap-2">
                        <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="modificarCantidad(${item.id}, -1)">-</button>
                        <span class="fw-bold">${item.cantidad}</span>
                        <button class="btn btn-sm btn-outline-secondary py-0 px-2" onclick="modificarCantidad(${item.id}, 1)">+</button>
                    </div>
                </td>
                <td class="text-end fw-bold">${formatearMoneda(subtotal)}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-danger" onclick="eliminarDelCarrito(${item.id})" aria-label="Eliminar item">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    htmlTabla += `
            </tbody>
        </table>
    `;

    container.innerHTML = htmlTabla;
    totalPriceSpan.textContent = totalCompra.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });

    const btnCheckout = document.getElementById("btn-checkout");
    if (btnCheckout) {
        btnCheckout.onclick = () => {
            alert(`¡Gracias por tu compra simulada!\nEl total a pagar es de: ${formatearMoneda(totalCompra)}`);
            carrito = [];
            guardarCarrito();
            actualizarInterfazCarrito();
            
            const modalElement = document.getElementById('cartModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            if (modal) modal.hide();
        };
    }
}

// ==========================================
// FORMULARIO DE CONTACTO
// ==========================================
function inicializarFormulario() {
    const form = document.getElementById("contactForm");
    if (!form) return;

    form.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        if (!form.checkValidity()) {
            evento.stopPropagation();
            form.classList.add("was-validated");
            return;
        }

        const btnSubmit = form.querySelector('button[type="submit"]');
        btnSubmit.disabled = true;
        btnSubmit.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...`;

        const datos = new FormData(form);

        try {
            const respuesta = await fetch(form.action, {
                method: form.method,
                body: datos,
                headers: { 'Accept': 'application/json' }
            });

            if (respuesta.ok) {
                form.reset();
                form.classList.remove("was-validated");
                mostrarEstadoFormulario("¡Tu mensaje fue enviado con éxito! Nos contactaremos a la brevedad.", "alert-success");
            } else {
                throw new Error();
            }
        } catch (error) {
            mostrarEstadoFormulario("Ocurrió un error al enviar el mensaje. Por favor intenta de nuevo.", "alert-danger");
        } finally {
            btnSubmit.disabled = false;
            btnSubmit.innerHTML = "Enviar Mensaje";
        }
    });
}

function mostrarEstadoFormulario(mensaje, claseBootstrap) {
    const status = document.getElementById("formStatus");
    status.className = `mt-3 alert ${claseBootstrap}`;
    status.textContent = mensaje;
    status.classList.remove("d-none");
    
    setTimeout(() => {
        status.classList.add("d-none");
    }, 5000);
}

// ==========================================
// FUNCIONES AUXILIARES / UTILIDADES
// ==========================================

function formatearMoneda(valor) {
    return valor.toLocaleString('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0
    });
}

function mostrarNotificacion(mensaje) {
    const toastDiv = document.createElement("div");
    toastDiv.className = "position-fixed bottom-0 end-0 m-3 p-3 bg-success text-white rounded shadow-lg";
    toastDiv.style.zIndex = "1050";
    toastDiv.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i> ${mensaje}`;
    
    document.body.appendChild(toastDiv);
    
    setTimeout(() => {
        toastDiv.remove();
    }, 2500);
}