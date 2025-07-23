import { redirectTo, renderRoute } from "./routes.js";

//Use router
document.addEventListener("DOMContentLoaded", renderRoute());

// Set footer current year
document.getElementById("current-year").textContent = new Date().getFullYear();
