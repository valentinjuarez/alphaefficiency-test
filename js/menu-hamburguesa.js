// ============================================================
// MENÚ HAMBURGUESA (menú móvil)
// Se encarga de abrir/cerrar el menú en pantallas pequeñas
// ============================================================

function initBurgerMenu() {
  // Buscamos los elementos en el HTML
  const menuButton = document.querySelector(".boton-menu");
  const mobileMenu = document.querySelector(".menu-movil");
  const body = document.body;

  // A partir de este ancho (px) se considera "desktop"
  const desktopBreakpoint = 1024;

  // Si no existen los elementos, no hacemos nada
  if (!menuButton || !mobileMenu) return;

  // Todos los links dentro del menú móvil
  const mobileMenuLinks = mobileMenu.querySelectorAll("a");

  // --- Función para CERRAR el menú ---
  function closeMenu() {
    mobileMenu.classList.remove("abierto");
    body.classList.remove("menu-abierto");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  }

  // --- Función para ABRIR el menú ---
  function openMenu() {
    mobileMenu.classList.add("abierto");
    body.classList.add("menu-abierto");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation menu");
  }

  // Click en el botón hamburguesa → alterna entre abrir/cerrar
  menuButton.addEventListener("click", () => {
    if (mobileMenu.classList.contains("abierto")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Click en cualquier link del menú → cierra el menú
  mobileMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Click fuera del menú y del botón → cierra el menú
  document.addEventListener("click", (event) => {
    // Si el menú está cerrado, no hacemos nada
    if (!mobileMenu.classList.contains("abierto")) return;

    const target = event.target;

    // Si el click fue dentro del menú o en el botón, no cerramos
    if (mobileMenu.contains(target) || menuButton.contains(target)) return;

    closeMenu();
  });

  // Si se agranda la ventana a desktop, cerramos el menú
  window.addEventListener("resize", () => {
    if (window.innerWidth >= desktopBreakpoint) {
      closeMenu();
    }
  });

  // Tecla Escape → cierra el menú
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
}

// Iniciamos cuando el HTML esté listo
document.addEventListener("DOMContentLoaded", initBurgerMenu);