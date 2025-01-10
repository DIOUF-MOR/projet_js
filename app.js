// Script commun à toute l'application
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // Si l'utilisateur est connecté, rediriger depuis index.html
  if (window.location.pathname === "/index.html" && isLoggedIn) {

    window.location.href = "etudiant/etudiant.html";
  }

  // Si l'utilisateur est déconnecté et tente d'accéder à une page protégée
  if (!isLoggedIn && window.location.pathname.includes("/etudiant/")) {
    window.location.href = "../login/login.html";
  }
});
