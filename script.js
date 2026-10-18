
// =========================================
// 1. VARIABLES GLOBALES
// =========================================
let cantidad = 0;
const precio = 12;
let yaAgrego = false;

// =========================================
// 2. REFERENCIAS AL DOM
// =========================================
const spanCantidad      = document.getElementById("cantidad");
const spanTotal         = document.getElementById("total");
const spanCantidadProd  = document.getElementById("cantidadProductos");
const contadorCarrito   = document.getElementById("contadorCarrito");
const mensaje           = document.getElementById("mensaje");
const formulario        = document.getElementById("formulario");
const btnAgregar        = document.getElementById("btnAgregar");
const btnVerPedido      = document.getElementById("btnVerPedido");

const enlacesVentana = document.querySelectorAll("[data-ventana]");
const ventanas       = document.querySelectorAll(".ventana");

// =========================================
// 3. NAVEGACIÓN ENTRE VENTANAS
// =========================================
function mostrarVentana(destino) {
    const seleccionada = document.getElementById(destino);
    if (!seleccionada) return;

    ventanas.forEach(v => v.classList.remove("activa"));
    seleccionada.classList.add("activa");

    document.querySelectorAll("nav a[data-ventana]").forEach(function (enlace) {
        enlace.classList.toggle("activo", enlace.dataset.ventana === destino);
    });

    window.scrollTo(0, 0);
}

enlacesVentana.forEach(function (enlace) {
    enlace.addEventListener("click", function (evento) {
        evento.preventDefault();
        mostrarVentana(enlace.dataset.ventana);
    });
});

// =========================================
// 4. CARRITO
// =========================================
function agregarProducto() {
    // Sumar 1 unidad
    cantidad++;
    spanCantidad.textContent     = cantidad;
    spanTotal.textContent        = cantidad * precio;
    spanCantidadProd.textContent = cantidad;

    // Limpiar mensaje del formulario
    if (mensaje) mensaje.textContent = "";

    // Mostrar contador del carrito en la tarjeta del producto
    contadorCarrito.classList.remove("oculto");

    // Feedback en el botón
    const textoOriginal = "Agregar al carrito";
    btnAgregar.textContent = "✓ Agregado (" + cantidad + ")";
    setTimeout(() => {
        btnAgregar.textContent = textoOriginal;
    }, 800);

    // Mostrar el botón "Ver mi pedido" la primera vez
    if (!yaAgrego) {
        yaAgrego = true;
        btnVerPedido.classList.remove("oculto");
    }
}

if (btnAgregar) {
    btnAgregar.addEventListener("click", agregarProducto);
}

if (btnVerPedido) {
    btnVerPedido.addEventListener("click", function () {
        mostrarVentana("pedido");
    });
}

// =========================================
// 5. FORMULARIO
// =========================================
if (formulario) {
    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        if (cantidad === 0) {
            mensaje.textContent = "Primero agrega un producto al carrito.";
            return;
        }

        const nombre   = document.getElementById("nombre").value.trim();
        const telefono = document.getElementById("telefono").value.trim();

        if (!nombre || !telefono) {
            mensaje.textContent = "Completa los datos del comprador.";
            return;
        }

        mensaje.textContent =
            "Pedido preparado para " + nombre +
            ". Cantidad: " + cantidad +
            ". Total: Bs " + (cantidad * precio) +
            ". El pedido todavía no se ha enviado al vendedor.";
    });
}

// =========================================
// 6. ACORDEÓN DEL PROCESO
// =========================================
const etapas = document.querySelectorAll("#proceso details");
etapas.forEach(function (etapa) {
    etapa.addEventListener("toggle", function () {
        if (etapa.open) {
            etapas.forEach(function (otraEtapa) {
                if (otraEtapa !== etapa) otraEtapa.open = false;
            });
        }
    });
});

// =========================================
// 7. EFECTO EN LA IMAGEN DE CARACTERÍSTICAS
// =========================================
const caracteristicas = document.querySelectorAll(".caracteristica");
caracteristicas.forEach(function (tarjeta, indice) {
    tarjeta.style.opacity   = "0";
    tarjeta.style.transform = "translateY(15px)";

    setTimeout(function () {
        tarjeta.style.transition = "opacity 0.5s ease, transform 0.5s ease";
        tarjeta.style.opacity    = "1";
        tarjeta.style.transform  = "translateY(0)";
    }, indice * 120);

    tarjeta.style.cursor = "pointer";
    tarjeta.addEventListener("click", function () {
        const titulo      = tarjeta.querySelector("h3");
        const descripcion = tarjeta.querySelector("p");
        if (titulo && descripcion) {
            alert(titulo.textContent + "\n\n" + descripcion.textContent);
        }
    });
});