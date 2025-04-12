document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();
      const username = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      if (username && password) {
        try {
          const response = await fetch("http://localhost:3000/tissus");
          const usersResponse = await fetch("http://localhost:3000/users");

          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données.");
          }
          const users = await usersResponse.json();
          users.forEach((user) => {
            console.log(user.email, user.password);
            
          })
          const user = users.find(
            (e) => e.email === username && e.password === password
          );
          if (user) {
            console.log(
              "Connexion réussie :",
              `email: ${user.email}, password: ${user.password}`
            );
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("user", JSON.stringify(user));
            window.location.href = "../approvisionnement/approvisionnement.html";
          } else {
            alert("Nom d'utilisateur ou mot de passe incorrect.");
          }
        } catch (error) {
          console.error("Erreur :", error);
          alert("Impossible de se connecter au serveur.");
        }
      } else {
        username.classList.add("border", "bg-red-500");

        password.classList.add("border", "border-red-500");
        // alert("Veuillez entrer un nom d'utilisateur et un mot de passe.");
      }
    });
  } else {
    console.error("Formulaire introuvable !");
  }
});
