
const isLoggedIn = localStorage.getItem("isLoggedIn");
let sessionsContainer = document.getElementById("sessionsContainer");
let paginationControls = document.getElementById("paginationControls");
// let loginPage = document.getElementById("login-page");

if (!isLoggedIn) {
  window.location.href = "../login/login.html";
}
login();
async function login() {
  const coursResponse = await fetch("http://localhost:3000/coursAvecSeances");
  const coursList = await coursResponse.json();
  const etudiant = localStorage.getItem("etudiant");
  const etud = JSON.parse(etudiant);
  const etudiantCours = coursList.filter((c) =>
    etud.cours.includes(parseInt(c.id))
  );
  let cours = etudiantCours.map((crs) => ({
    ...crs,
  }));
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
        paginationControls.innerHTML = "";
        const totalPages = Math.ceil(seances.length / itemsPerPage);
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
const contentData = document.querySelector(".contentData");
contentData.classList = "flex flex-col space-y-2 w-full h-screen";
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
contentData.appendChild(entete);

