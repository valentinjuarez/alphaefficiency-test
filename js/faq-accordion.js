// ============================================================
// FAQ ACCORDION (preguntas frecuentes desplegables)
// Abre y cierra cada respuesta al hacer click en la pregunta
// Solo permite tener una respuesta abierta a la vez
// ============================================================

function initFaqAccordion() {
  // Buscamos todos los items de FAQ en el HTML
  const faqItems = document.querySelectorAll(".item-faq");

  // Si no hay ninguno, no hacemos nada
  if (faqItems.length === 0) return;

  faqItems.forEach((item, index) => {
    const button = item.querySelector(".pregunta-faq");
    if (!button) return;

    // Buscamos la respuesta, o creamos una de ejemplo si no existe
    let answer = item.querySelector(".respuesta-faq");
    if (!answer) {
      answer = document.createElement("div");
      answer.className = "respuesta-faq";
      answer.innerHTML = "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>";
      item.appendChild(answer);
    }

    // Asignamos un ID único a cada respuesta para accesibilidad
    const answerId = `faq-answer-${index + 1}`;
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", answerId);
    answer.setAttribute("id", answerId);
    answer.setAttribute("aria-hidden", "true");

    // Empezamos con la respuesta cerrada (altura 0)
    answer.style.maxHeight = "0px";

    // Click en la pregunta → abre esa respuesta y cierra las demás
    button.addEventListener("click", () => {
      // Guardamos si este item ya estaba abierto antes de cerrar todo
      const isOpen = item.classList.contains("abierto");

      // Cerramos TODOS los items
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("abierto");

        const otherButton = otherItem.querySelector(".pregunta-faq");
        const otherAnswer = otherItem.querySelector(".respuesta-faq");

        if (otherButton) otherButton.setAttribute("aria-expanded", "false");
        if (otherAnswer) {
          otherAnswer.setAttribute("aria-hidden", "true");
          otherAnswer.style.maxHeight = "0px";
        }
      });

      // Si este item estaba cerrado, lo abrimos
      if (!isOpen) {
        item.classList.add("abierto");
        button.setAttribute("aria-expanded", "true");
        answer.setAttribute("aria-hidden", "false");
        // scrollHeight es la altura real del contenido
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });
}

// Iniciamos cuando el HTML esté listo
document.addEventListener("DOMContentLoaded", initFaqAccordion);