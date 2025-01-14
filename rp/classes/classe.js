
const isLoggedIn = localStorage.getItem("isLoggedIn");
const content=document.getElementById("content")
const entete=document.getElementById("entete")
const anneeEnCours=document.getElementById("anneeEnCours")
const table=document.getElementById("table")

if (!isLoggedIn) {
    window.location.href = "../login/login.html";
}
let cours=[]
anneeEnCours.classList="flex text-2xl justify-end p-4"
const annee=document.createElement("h1")
annee.innerText="Année Scolaire : 2025 - 2026"
anneeEnCours.appendChild(annee)
content.classList = "flex flex-col space-y-2 w-full h-screen";
entete.classList =
  "flex justify-between items-center bg-gray-50 w-full h-24 p-4";
const titreListe = document.createElement("h1");
titreListe.textContent = "Liste des classes";
titreListe.classList = "text-3xl";
const select = document.getElementById("select");
select.classList = "w-1/3 items-center";
entete.appendChild(titreListe);
entete.appendChild(select);
content.append(anneeEnCours,entete,table)
listerClasses();
async function listerClasses() {
    const classes=await fetch("http://localhost:3000/classes")
    const classeList=await classes.json();
    cours=classeList

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
  th3.textContent = "Filière";
  th3.classList = "w-1/3 text-center p-4";

  const th4 = document.createElement("th");
  th4.textContent = "Niveau";
  th4.classList = "w-1/3 text-center p-4";

  const th5 = document.createElement("th");
  th5.textContent = "Liste etudiants";
  th5.classList = "w-1/3 text-right p-4";
  tr.append(th1,th2,th3,th4,th5);
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
    td2.textContent = cours[i].libelle;
    td2.classList = "w-1/3 text-center p-4";

    const td3 = document.createElement("td");
    td3.textContent = cours[i].filiere;
    td3.classList = "w-1/3 text-center p-4";

    const td4 = document.createElement("td");
    td4.textContent = cours[i].niveau;
    td4.classList = "w-1/3 text-center p-4";

    const td5 = document.createElement("td");
    const icon = document.createElement("i");
    icon.classList =
      "nav-icon fas fa-eye text-2xl mr-2 text-blue-500 cursor-pointer";
    td5.appendChild(icon);
    td5.classList = "w-1/3 text-right pr-8 p-4";
    td5.addEventListener("click", () => {
      const seances = cours[i].etudiants;
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
    tr.append(td1,td2,td3,td4,td5);
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  console.log("Cours et séances associés :", cours);
}
