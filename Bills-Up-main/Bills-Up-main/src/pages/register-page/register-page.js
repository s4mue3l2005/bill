import { redirectTo } from "../../routes";
import { Alert } from "../../shared/alerts";
import { isAuthenticated } from "../../shared/guards";
import { registerUser } from "./services/registerService";

export function registerPageSetup() {
  if (isAuthenticated()) {
    redirectTo("/dashboard");
  }

  const goLoginButton = document.getElementById("go-login");
  goLoginButton.addEventListener("click", (event) => {
    event.preventDefault();
    redirectTo("/login");
  });

  // Register form submit event
  document
    .getElementById("register-form")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("email").value.trim().toLowerCase();
      const phone = document.getElementById("phone").value.trim();
      const password1 = document.getElementById("password1").value;
      const password2 = document.getElementById("password2").value;

      if (!username || !email || !phone || !password1 || !password2) {
        Alert.warning("Debes rellenar todos los campos!");
        return;
      }

      // Formats
      const usernameRegex = /^[a-zA-Z][a-zA-Z0-9._ ]{2,19}$/;
      const phoneRegex = /^(\+\d{1,3}\s?)?\d{7,}$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validate username format
      if (!usernameRegex.test(username)) {
        Alert.warning("Nombre de usuario inválido");
        return;
      }

      // Validate phone format (+ and 10 digits)
      if (!phoneRegex.test(phone)) {
        Alert.warning("Número de telefono inválido");
        return;
      }

      // Validate email format
      if (!emailRegex.test(email)) {
        Alert.warning("Correo Electrónico inválido");
        return;
      }

      // Check if passwords match
      if (password1 !== password2) {
        Alert.warning("Las contraseñas no son iguales");
        return;
      }

      await registerUser(username, email, phone, password1);
    });

  // Password visibility toggle
  function setupPasswordToggle(inputId, toggleButtonId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = document.getElementById(toggleButtonId);

    if (passwordInput && toggleButton) {
      const eyeIcon = toggleButton.querySelector(".eye-icon");
      const eyeOffIcon = toggleButton.querySelector(".eye-off-icon");

      toggleButton.addEventListener("click", function () {
        const type =
          passwordInput.getAttribute("type") === "password"
            ? "text"
            : "password";
        passwordInput.setAttribute("type", type);

        if (type === "password") {
          eyeIcon.classList.remove("hidden");
          eyeOffIcon.classList.add("hidden");
        } else {
          eyeIcon.classList.add("hidden");
          eyeOffIcon.classList.remove("hidden");
        }
      });
    }
  }

  // Setup password toggles on DOM load
  document.addEventListener("DOMContentLoaded", function () {
    setupPasswordToggle("password1", "togglePassword");
    setupPasswordToggle("password2", "toggleConfirmPassword");
  });
}
