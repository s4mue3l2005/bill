import { redirectTo } from "../../../routes";
import { Alert } from "../../../shared/alerts";

const BASE_URL = "http://localhost:3000";

// Register new user in API
export async function registerUser(username, email, phone, password) {
  // Check if email or username are already registered
  const users = await getUserCount();

  if (
    users.some((user) => user.username.toLowerCase() === username.toLowerCase())
  ) {
    Alert.warning("El nombre de usuario ya está registrado. Intenta con otro.");
    return;
  }

  if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
    Alert.warning("El email ya está registrado. Intenta con otro.");
    return;
  }

  //Build new user info
  const newUser = {
    username: username,
    email: email,
    phone: phone,
    password: password,
    roleId: "0",
    coursesId: [],
  };

  //Send request
  try {
    const res = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (!res.ok) {
      Alert.error("Ups, algo salio mal. Intentalo mas tarde");
      return;
    }

    Alert.success("Usuario creado correctamente!");
    redirectTo("login");
  } catch (error) {
    Alert.error(`Error ${error}, por favor intentelo mas tarde`);
  }
}

// Get all users from API
export async function getUserCount() {
  try {
    const res = await fetch(`${BASE_URL}/users`);
    const data = await res.json();
    return data;
  } catch (error) {
    Alert.error("Error al obtener usuarios");
    return [];
  }
}
