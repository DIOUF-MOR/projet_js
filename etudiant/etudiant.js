data = [
  {
    icone: "nav-icon fas fa-book text-4xl mr-2 text-white",
    titre: "Mes cours",
  },
  {
    icone: "fas fa-calendar-times text-4xl mr-2 text-white",
    titre: "Mes absences",
  },
];

// Vérifie si l'utilisateur est connecté
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  let sessionsContainer = document.getElementById("sessionsContainer");
  let paginationControls = document.getElementById("paginationControls");

  let dashboard = document.getElementById("dashboard");
  let loginPage = document.getElementById("login-page");

  if (!isLoggedIn) {
    window.location.href = "../login/login.html";
  }
  login();
  async function login() {
      const coursResponse = await fetch(
        "http://localhost:3000/coursAvecSeances"
      );
      const coursList = await coursResponse.json();

      const etudiant = localStorage.getItem("etudiant");
      const etud = JSON.parse(etudiant);

      const etudiantCours = coursList.filter((c) =>
        etud.cours.includes(c.id)
      );

      const seancesResponse = coursResponse.seances;

      let coursAvecSeances = etudiantCours.map((cours) => ({
        ...cours,
      }));
      let cours = coursAvecSeances;

      let table = document.querySelector(".table");
      table.classList = "flex flex-col w-full h-full p-4 shadow-md";
      const thead = document.createElement("thead");
      thead.classList = "w-full text-white ";
      const tr = document.createElement("tr");
      tr.classList = "flex w-full bg-blue-500 space-x-4 h-15 rounded-t-md";
      const th1 = document.createElement("th");
      th1.textContent = "N°";
      th1.classList = "w-1/3 text-left p-4";
      const th2 = document.createElement("th");
      th2.textContent = "Nom";
      th2.classList = "w-1/3 text-center p-4";
      const th3 = document.createElement("th");
      th3.textContent = "Voir sceances";
      th3.classList = "w-1/3 text-right p-4";

      tr.appendChild(th1);
      tr.appendChild(th2);
      tr.appendChild(th3);
      thead.appendChild(tr);
      table.appendChild(thead);

      const tbody = document.createElement("tbody");
      tbody.classList = "w-full flex flex-col bg-white";

      for (let i = 0; i < cours.length; i++) {
        const tr = document.createElement("tr");
        tr.classList = "flex w-full border-b space-x-4 h-15";
        const td1 = document.createElement("td");
        td1.textContent = cours[i].id;
        td1.classList = "w-1/3 text-left p-4";
        const td2 = document.createElement("td");
        td2.textContent = cours[i].nom;
        td2.classList = "w-1/3 text-center p-4";
        const td3 = document.createElement("td");
        const icon = document.createElement("i");
        icon.classList =
          "nav-icon fas fa-eye text-2xl mr-2 text-blue-500 cursor-pointer";
        td3.appendChild(icon);
        td3.classList = "w-1/3 text-right pr-8 p-4";

        td3.addEventListener("click", () => {
          const seances = cours[i].seances;

          const itemsPerPage = 8; // Nombre d'éléments par page
          let currentPage = 1;
          function displaySessions() {
            sessionsContainer.innerHTML = "";
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const currentSessions = seances.slice(startIndex, endIndex);
            currentSessions.forEach((session) => {
              const card = document.createElement("div");
              card.className = "bg-gray-100 border rounded-lg p-4 shadow mb-4";
              card.innerHTML = `
                      <h3 class="font-semibold text-lg">${session.sujet}</h3>
                      <p class="text-gray-600">Date: ${session.date}</p>
                    `;
              sessionsContainer.appendChild(card);
            });
          }
          function createPaginationControls() {
            paginationControls.innerHTML = ""; // Effacer les contrôles existants

            const totalPages = Math.ceil(seances.length / itemsPerPage);

            // Bouton "Précédent"
            const prevButton = document.createElement("button");
            prevButton.textContent = "Précédent";
            prevButton.className =
              "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50";
            prevButton.disabled = currentPage === 1;
            prevButton.addEventListener("click", () => {
              currentPage--;
              updatePagination();
            });
            paginationControls.appendChild(prevButton);

            // Boutons pour chaque page
            for (let i = 1; i <= totalPages; i++) {
              const pageButton = document.createElement("button");
              pageButton.textContent = i;
              pageButton.className = `px-4 py-2 rounded ${
                currentPage === i
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
              }`;
              pageButton.addEventListener("click", () => {
                currentPage = i;
                updatePagination();
              });
              paginationControls.appendChild(pageButton);
            }

            // Bouton "Suivant"
            const nextButton = document.createElement("button");
            nextButton.textContent = "Suivant";
            nextButton.className =
              "px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50";
            nextButton.disabled = currentPage === totalPages;
            nextButton.addEventListener("click", () => {
              currentPage++;
              updatePagination();
            });
            paginationControls.appendChild(nextButton);
          }
          function updatePagination() {
            displaySessions();
            createPaginationControls();
          }

          // Initialisation
          updatePagination();

          dialog.classList.remove("hidden");
        });

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tbody.appendChild(tr);
      }

      table.appendChild(tbody);
      contentData.appendChild(table);
      console.log("Cours et séances associés :", cours);
      dashboard.classList.remove("hidden");

   
  }

  const closeDialogButton = document.getElementById("closeDialog");
  closeDialogButton.addEventListener("click", () => {
    dialog.classList.add("hidden");
    dashboard.classList.remove("hidden");
  });

  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      dialog.classList.add("hidden");
      dashboard.classList.remove("hidden");
    }
  });

  const conteneurPrincipal = document.querySelector(".conteneurPrincipal");
  conteneurPrincipal.classList = "justify-center bg-blue-500 p-2  w-80 h-full";

  const parentLogo = document.querySelector(".parentlogo");
  parentLogo.classList =
    "flex justify-center items-center px-2 border-b-2 border-gray-200 pb-2";

  const logoContent = document.createElement("span");
  const logo = document.createElement("img");
  logo.classList = "w-20 h-20 rounded-full";
  logo.src = "../assets/images.png";
  logoContent.appendChild(logo);
  parentLogo.appendChild(logoContent);

  const parentListe = document.querySelector(".navigator");
  parentListe.classList = "flex flex-col justify-center pt-4 w-full";

  data.forEach((item) => {
    const listItem = document.createElement("div");
    listItem.className =
      "flex items-center space-x-3 p-3 rounded hover:bg-gray-500 cursor-pointer";

    const icon = document.createElement("i");
    icon.className = item.icone;

    const title = document.createElement("span");
    title.textContent = item.titre;
    title.className = "text-2xl font-bold";

    listItem.appendChild(icon);
    listItem.appendChild(title);

    parentListe.appendChild(listItem);
  });

  const contentData = document.querySelector(".contentData");
  contentData.classList = "flex flex-col space-y-2 w-full h-screen";

  let header = document.querySelector(".header");
  header.classList =
    "flex justify-between items-center w-full h-24 shadow-md border-b p-6";
  const iconMenu = document.createElement("i");
  iconMenu.classList = "fa-solid fa-bars text-4xl cursor-pointer";

  const userImage = document.createElement("img");
  userImage.classList = "w-20 h-20 rounded-full cursor-pointer";
  userImage.src = "../assets/user.png";
  header.appendChild(iconMenu);
  header.appendChild(userImage);

  const entete = document.querySelector(".entete");
  entete.classList =
    "flex justify-between items-center bg-gray-50 w-full h-24 p-4";

  const titreListe = document.createElement("h1");
  titreListe.textContent = "Liste des cours";
  titreListe.classList = "text-3xl";

  const select = document.getElementById("select");
  select.classList = "w-1/3 items-center  pr-1";

  entete.appendChild(titreListe);
  entete.appendChild(select);

  contentData.appendChild(header);
  contentData.appendChild(entete);

  let userDecoonnection = document.createElement("div");
  let buttunDeconect = document.createElement("button");

  userImage.addEventListener("click", function () {
    userDecoonnection.classList =
      "absolute top-20 right-10 bg-white p-4 rounded-md shadow-lg flex flex-col justify-center items-center";
    userDecoonnection.innerHTML = `<p class="text-gray-600">Vous etes sur le point de se connecté !</p>`;
    buttunDeconect.classList =
      "bg-blue-500 text-white px-4 py-2 rounded-md mt-4";
    buttunDeconect.innerHTML = "Deconnexion";
    userDecoonnection.appendChild(buttunDeconect);
    header.appendChild(userDecoonnection);
  });
  buttunDeconect.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "../login/login.html";
  });
  entete.addEventListener("click", function () {
    userDecoonnection.classList.add("hidden");
  });
  iconMenu.addEventListener("click", function () {
    conteneurPrincipal.classList.toggle("w-80");

    for (let i = 0; i < data.length; i++) {
      let button = parentListe.children[i];
      let text = button.lastChild.innerText;

      if (!button.dataset.tooltipInitialized) {
        showTooltip(button, text);
        button.dataset.tooltipInitialized = "true";
      }

      button.lastChild.classList.toggle("hidden");
      button.classList.toggle("justify-center");
    }
  });

  function showTooltip(button, text) {
    let tooltip = document.getElementById("tooltip");
    if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.id = "tooltip";
      tooltip.className =
        "absolute hidden bg-gray-800 text-white text-sm rounded py-1 px-2 shadow-md z-50";
      document.body.appendChild(tooltip);
    }

    button.addEventListener("mouseover", () => {
      tooltip.innerText = text;
      const rect = button.getBoundingClientRect();
      tooltip.style.left = `${rect.right + 30}px`;
      tooltip.style.top = `${rect.top + 55}px`;

      tooltip.classList.remove("hidden");
    });

    button.addEventListener("mouseout", () => {
      tooltip.classList.add("hidden");
    });
  }
});
