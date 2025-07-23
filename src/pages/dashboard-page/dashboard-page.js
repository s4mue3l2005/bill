import { getCurrentUserInfo } from "../../shared/userInfo";
import { setProfileImage, setProfileInfo, updateProfile } from "./services/profileService";

document.addEventListener("DOMContentLoaded", () => {
  setProfileImage()
  //Take DOM refereces
  const configSection = document.getElementById("config-section");
  const progressSection = document.getElementById("progress-section");
  const updateBtn = document.getElementById("update-btn");

  //Set user profile info
  setProfileInfo();

  //Take current user info
  const userInfo = getCurrentUserInfo();

  if (!userInfo) return;

  //Update inputs values
  document.getElementById("username").value = userInfo.username;
  document.getElementById("email").value = userInfo.email;
  document.getElementById("phone").value = userInfo.phone;
  document.getElementById("password").value = userInfo.password;

  updateBtn.addEventListener("click", async (event) => {
    event.preventDefault();

    //Take data
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const phone = document.getElementById("phone").value.trim();
    const password = document.getElementById("password").value;

    await updateProfile(username, email, phone, password);
  });

  document.getElementById("config-btn").addEventListener("click", showConfig);
  document
    .getElementById("progress-btn")
    .addEventListener("click", showProgreso);

  function showConfig() {
    progressSection.classList.toggle("hidden");
    configSection.classList.toggle("hidden");
  }

  function showProgreso() {
    configSection.classList.toggle("hidden");
    progressSection.classList.toggle("hidden");
  }
});
