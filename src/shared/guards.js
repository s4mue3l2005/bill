import { getCurrentUserInfo } from "./userInfo";

export function isAuthenticated() {
  return !!getCurrentUserInfo();
}

export function isAdmin() {
  return getCurrentUserInfo().roleId == "1";
}
