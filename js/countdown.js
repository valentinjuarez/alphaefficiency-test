// ============================================================
// COUNTDOWN (cuenta regresiva)
// Muestra días, horas, minutos y segundos restantes
// La duración inicial se calcula desde que carga la página
// ============================================================

function initCountdown() {
  // Buscamos los elementos donde se muestran los números
  const daysEl    = document.querySelector("#countdown-dias");
  const hoursEl   = document.querySelector("#countdown-horas");
  const minutesEl = document.querySelector("#countdown-minutos");
  const secondsEl = document.querySelector("#countdown-segundos");

  // Si falta algún elemento, no hacemos nada
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  // Duración del countdown: 16 horas, 29 minutos, 27 segundos (en milisegundos)
  const countdownDurationMs = (((16 * 60) + 29) * 60 + 27) * 1000;

  // Calculamos el momento exacto en que llega a cero
  const targetTime = Date.now() + countdownDurationMs;

  // Referencia al intervalo para poder detenerlo cuando llegue a 0
  let timerId = null;

  // Asegura que los números siempre tengan 2 dígitos (ej: 5 → "05")
  function formatUnit(value) {
    return String(value).padStart(2, "0");
  }

  // Actualiza el HTML con el tiempo restante
  function render(remainingMs) {
    const totalSeconds = Math.floor(remainingMs / 1000);

    const days    = Math.floor(totalSeconds / 86400);          // 86400 = segundos en un día
    const hours   = Math.floor((totalSeconds % 86400) / 3600); // resto del día → horas
    const minutes = Math.floor((totalSeconds % 3600) / 60);    // resto de la hora → minutos
    const seconds = totalSeconds % 60;                         // resto del minuto → segundos

    daysEl.textContent    = formatUnit(days);
    hoursEl.textContent   = formatUnit(hours);
    minutesEl.textContent = formatUnit(minutes);
    secondsEl.textContent = formatUnit(seconds);
  }

  // Se ejecuta cada segundo
  function tick() {
    const remainingMs = targetTime - Date.now();

    // Si llegamos a 0, mostramos ceros y detenemos el intervalo
    if (remainingMs <= 0) {
      render(0);
      clearInterval(timerId);
      return;
    }

    render(remainingMs);
  }

  // Ejecutamos una vez al inicio para que no haya un segundo de retraso
  tick();

  // Repetimos cada 1000ms (1 segundo)
  timerId = setInterval(tick, 1000);
}

// Iniciamos cuando el HTML esté listo
document.addEventListener("DOMContentLoaded", initCountdown);