import { redirectTo } from "../../../routes";
import { Alert } from "../../../shared/alerts";
import { addCurrentUserInfo } from "../../../shared/userInfo";

const url = "http://localhost:3000";

//Function to validate if some user is registered
export async function login(email, password) {
  try {
    const res = await fetch(`${url}/users?email=${email}`);
    const data = await res.json();
    const user = data[0];

    if (!user || user.password != password) {
      Alert.warning("Credenciales inválidas");
      return;
    }

    Alert.success(`Bienvenido/a ${user.username}`);
    addCurrentUserInfo(user);
    redirectTo("/dashboard");
  } catch (error) {
    Alert.error("Error en la solicitud:");
  }
}
