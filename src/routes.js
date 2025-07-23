import { notFoundSetup } from "./pages/404-page/404-page";
import { landingPageSetup } from "./pages/landing-page/landing-page";
import { loginPageSetup } from "./pages/login-page/login-page";
import { registerPageSetup } from "./pages/register-page/register-page";

const dashboardSetup = () => {
  console.log("Dashboard page setup");
};
const courseSetup = () => {
  console.log("Course page setup");
};

const routes = {
  "/": {
    path: "/src/pages/landing-page/landing-page.html",
    setup: landingPageSetup,
  },
  "/register": {
    path: "/src/pages/register-page/register-page.html",
    setup: registerPageSetup,
  },
  "/login": {
    path: "/src/pages/login-page/login-page.html",
    setup: loginPageSetup,
  },
  "/dashboard": {
    path: "",
    setup: dashboardSetup,
  },

  "/course": {
    path: "",
    setup: courseSetup,
  },

  "/notFound": {
    path: "/src/pages/404-page/404-page.html",
    setup: notFoundSetup,
  },
};

export async function renderRoute() {
  const app = document.getElementById("app-root");

  //Take pathname and see if it has a route
  const path = window.location.pathname;
  const route = routes[path] || routes["/notFound"];

  try {
    //Take html
    const file = await fetch(route.path);
    const content = await file.text();

    //Load html in document
    app.innerHTML = content;

    //Load component JS
    if (route.setup) {
      route.setup();
    }
  } catch (error) {
    redirectTo("/notFound");
  }
}

export function redirectTo(path) {
  window.history.pushState({}, "", `${path}`);
  return renderRoute();
}

window.addEventListener("popstate", renderRoute);
