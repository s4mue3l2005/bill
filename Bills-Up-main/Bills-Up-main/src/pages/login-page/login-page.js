import { redirectTo } from "../../routes.js";
import { Alert } from "../../shared/alerts.js";
import { isAuthenticated } from "../../shared/guards.js";
import { login } from "./services/loginService.js";

//The ID are identified through the DOM
export function loginPageSetup() {
  if (isAuthenticated()) {
    redirectTo("/dashboard");
  }

  const form = document.getElementById("form");
  const passwordInput = document.getElementById("password-login");
  const emailInput = document.getElementById("email-login");
  const goRegisterButton = document.getElementById("go-register");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    // validate that the fields are not empty
    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    if (!email || !password) {
      Alert.warning("Debes rellenar todos los campos");
      return;
    }

    await login(email, password);
  });

  goRegisterButton.addEventListener("click", (event) => {
    event.preventDefault();
    redirectTo("/register");
  });
}
