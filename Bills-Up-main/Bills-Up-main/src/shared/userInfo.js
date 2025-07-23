export function getCurrentUserInfo() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

export function addCurrentUserInfo(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

export function logOut() {
  localStorage.removeItem("currentUser");
}
