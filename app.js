// Script commun à toute l'application
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // Si l'utilisateur est connecté, rediriger depuis index.html
  if (window.location.pathname === "/index.html") {
    if (isLoggedIn) {
      window.location.href = "login/login.html";
    } else {
      window.location.href = "login/login.html";
    }
  }

  // if (window.location.pathname === "/index.html" && isLoggedIn) {
  //   window.location.href = "approvisionnement/approvisionnement.html";
  // }
  // if (!isLoggedIn && window.location.pathname.includes("/approvisionnement")) {
  //   window.location.href = "login/login.html";
  // }
});
