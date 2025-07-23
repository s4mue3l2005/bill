import { Alert } from "../../../shared/alerts";
import {
  addCurrentUserInfo,
  getCurrentUserInfo,
} from "../../../shared/userInfo";

//Function to update user info into database
export async function updateProfile(
  newUsername,
  newEmail,
  newPhone,
  newPassword
) {
  // Formats
  const usernameRegex = /^[a-zA-Z][a-zA-Z0-9._ ]{2,19}$/;
  const phoneRegex = /^(\+\d{1,3}\s?)?\d{7,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validate username format
  if (!usernameRegex.test(newUsername)) {
    Alert.warning("Nombre de usuario inválido");
    return;
  }

  // Validate phone format (+ and 10 digits)
  if (!phoneRegex.test(newPhone)) {
    Alert.warning("Número de telefono inválido");
    return;
  }

  // Validate email format
  if (!emailRegex.test(newEmail)) {
    Alert.warning("Correo Electrónico inválido");
    return;
  }

  //Take current user info
  const currentUserInfo = getCurrentUserInfo();

  if (!currentUserInfo) return;

  const userEdited = {
    id: currentUserInfo.id,
    username: newUsername || currentUserInfo.username,
    email: newEmail || currentUserInfo.email,
    phone: newPhone || currentUserInfo.phone,
    password: newPassword || currentUserInfo.password,
    roleId: currentUserInfo.roleId,
    coursesId: currentUserInfo.coursesId,
  };

  try {
    const request = await fetch(
      `http://localhost:3000/users/${currentUserInfo.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userEdited),
      }
    );

    if (!request.ok) {
      Alert.error("No se pudo editar el usuario, intentelo más tarde.");
      return;
    }

    addCurrentUserInfo(userEdited);
    setProfileInfo();
    Alert.success("Usuario editado correctamente");
  } catch (error) {
    Alert.error(`Error ${error}, intentelo más tarde`);
  }
}

//Function to set the user info into dashboard
export function setProfileInfo() {
  //Take DOM references
  const asideUserDataContainer = document.getElementById("aside-user-data");
  const cofigUserDataContainer = document.getElementById("config-user-data");
  const configUserDataEmail = document.getElementById("config-user-data-email");

  //Take current user info
  const userInfo = getCurrentUserInfo();

  if (asideUserDataContainer) {
    asideUserDataContainer.innerHTML = `<h1>${userInfo.username}</h1>`;
  }
  if (userInfo.roleId == "0") {
    asideUserDataContainer.innerHTML += `<p class="text-sm">Estudiante</p>`;
  } else if (userInfo.roleId == "1") {
    asideUserDataContainer.innerHTML += `<p class="text-sm">Administrador</p>`;
  }
  if (cofigUserDataContainer) {
    cofigUserDataContainer.innerHTML = `<h3>${userInfo.username}</h3>`;
  }
  if (configUserDataEmail) {
    configUserDataEmail.innerHTML = `<h4>${userInfo.email}</h4>`;
  }
}

//Function to set image profile
export function setProfileImage() {
  const imageContainer = document.getElementById("profile-image");
  const asideUserimage = document.getElementById("profile-image-header");
  const userInfo = getCurrentUserInfo();
  const asideUserInfo = getCurrentUserInfo()



  
  const letterSide= asideUserInfo.username[0].toUpperCase()
  const letter = userInfo.username[0].toUpperCase();

  imageContainer.innerHTML = "";
  imageContainer.innerHTML = `${letter}`;
  asideUserimage.innerHTML = "";  
  asideUserimage.innerHTML= `${letterSide}`
}
