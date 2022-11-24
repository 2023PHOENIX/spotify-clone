import './style.css'

document.addEventListener("DOMContentLoaded", () => {
  console.log("hello world")
  if (localStorage.getItem("accessToken")) {
    window.location.href = "dashboard/dashboard.html";
  } else {
    window.location.href = "login/login.html";
  }
});
