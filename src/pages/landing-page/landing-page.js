import { redirectTo } from "../../routes";

export function landingPageSetup() {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const goLoginButton = document.getElementById("go-login-btn");
  const goRegisterButton = document.getElementById("go-register-btn");
  const mobileLoginButton = document.getElementById("go-login-movil");
  const mobileRegisterButton = document.getElementById("go-register-movil");
  const startFreeButton = document.getElementById("start-free-btn");
  const viewCourse1Button = document.getElementById("view-course1-btn");
  const viewCourse2Button = document.getElementById("view-course2-btn");

  mobileMenuButton.addEventListener("click", () => {
    const mobileMenu = document.getElementById("mobile-menu");
    const isHidden = mobileMenu.classList.contains("hidden");

    if (isHidden) {
      mobileMenu.classList.remove("hidden");
    } else {
      mobileMenu.classList.add("hidden");
    }
  });

  goLoginButton.addEventListener("click", () => {
    redirectTo("/login");
  });

  goRegisterButton.addEventListener("click", () => {
    redirectTo("/register");
  });

  mobileLoginButton.addEventListener("click", () => {
    redirectTo("/login");
  });

  mobileRegisterButton.addEventListener("click", () => {
    redirectTo("/register");
  });

  startFreeButton.addEventListener("click", () => {
    redirectTo("/register");
  });

  viewCourse1Button.addEventListener("click", () => {
    redirectTo("/login");
  });

  viewCourse2Button.addEventListener("click", () => {
    redirectTo("/login");
  });
}
