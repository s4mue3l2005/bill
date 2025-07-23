import { redirectTo } from "../../routes";

export function notFoundSetup() {
  const backToHomeBtn = document.getElementById("back-to-home");

  backToHomeBtn.addEventListener("click", (event) => {
    event.preventDefault();
    redirectTo("/");
  });
}
