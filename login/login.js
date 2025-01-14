document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const username = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      if (username && password) {
        try {
          const response = await fetch("http://localhost:3000/etudiants");

          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données.");
          }
          const etudiants = await response.json();
          // Trouver l'étudiant correspondant
          const etudiant = etudiants.find(
            (e) => e.email === username && e.password === password
          );
          if (etudiant) {
            console.log(
              "Connexion réussie :",
              `email: ${etudiant.email}, password: ${etudiant.password}`
            );
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("etudiant", JSON.stringify(etudiant));
            window.location.href = "../navBar/nav.html";
          } else {
            alert("Nom d'utilisateur ou mot de passe incorrect.");
          }
        } catch (error) {
          console.error("Erreur :", error);
          alert("Impossible de se connecter au serveur.");
        }
      } else {
        alert("Veuillez entrer un nom d'utilisateur et un mot de passe.");
      }
    });
  } else {
    console.error("Formulaire introuvable !");
  }
});
