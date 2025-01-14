data = [
  {
    role: "ROLE_ETUDIANT",
    icone: "nav-icon fas fa-book text-4xl mr-2 text-white",
    titre: "Mes cours",
    link: "../etudiant/cours/cours.html",
  },
  {
    role: "ROLE_ETUDIANT",
    icone: "fas fa-calendar-times text-4xl mr-2 text-white",
    titre: "Mes absences",
    link: "../etudiant/absences/absence.html",
  },
  {
    role: "ROLE_RP",
    icone: "fas fa-calendar-times text-4xl mr-2 text-white",
    titre: "Classes",
    link: "../classes/classe.html",
  },
  {
    role: "ROLE_RP",
    icone: "fas fa-calendar-times text-4xl mr-2 text-white",
    titre: "Annee Scolaire",
    link: "../anneeScolaires/anneeScolaire.html",
  },
  {
    role: "ROLE_RP",
    icone: "fas fa-calendar-times text-4xl mr-2 text-white",
    titre: "Modules",
    link: "../modules/module.html",
  },
  {
    role: "ROLE_RP",
    icone: "fas fa-calendar-times text-4xl mr-2 text-white",
    titre: "Professeurs",
    link: "../professeurs/professeur.html",
  },
  {
    role: "ROLE_RP",
    icone: "fas fa-calendar-times text-4xl mr-2 text-white",
    titre: "Etudiants",
    link: "../etudiants/etudiant.html",
  },
  {
    role: "ROLE_RP",
    icone: "fas fa-calendar-times text-4xl mr-2 text-white",
    titre: "Inscriptions",
    link: "../Inscriptions/Inscription.html",
  },
  {
    role: "ROLE_RP",
    icone: "fas fa-calendar-times text-4xl mr-2 text-white",
    titre: "Reinscriptions",
    link: "../Reinscriptions/Reinscription.html",
  },
];
document.addEventListener("DOMContentLoaded", () => {
  let dashboard = document.getElementById("dashboard");
  const content = document.getElementById("content");

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    window.location.href = "../login/login.html";
  }

  const etudiant = localStorage.getItem("etudiant");
  const etud = JSON.parse(etudiant);
  let role = etud.role;
if (role==="ROLE_ETUDIANT") {
    loadContent("../etudiant/cours/cours.html")
}else if (role==="ROLE_RP") {
    loadContent("../rp/classes/classe.html")
    
}
  const nav = document.querySelector(".nav");
  nav.classList = "justify-center bg-blue-500 p-2  w-80 h-full";
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

  // Charger dynamiquement le contenu
  async function loadContent(url) {
    const response = await fetch(url);
    const html = await response.text();
    content.innerHTML = html;
    const scriptTag = document.createElement("script");
    scriptTag.src = url.replace(".html", ".js");
    scriptTag.defer = true;
    content.appendChild(scriptTag);
  }
  data.forEach((item) => {
    if (item.role === role) {
      const listItem = document.createElement("div");
      listItem.className =
        "flex items-center space-x-3 p-3 rounded cursor-pointer";
      const icon = document.createElement("i");
      icon.className = item.icone;

      const title = document.createElement("span");
      title.textContent = item.titre;
      title.className = "text-2xl font-bold";

      listItem.appendChild(icon);
      listItem.appendChild(title);

      parentListe.appendChild(listItem);
      listItem.addEventListener("click", function () {
        item.classList="bg-transparent"
        
        loadContent(item.link);
      });
    }
  });

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

  let userDecoonnection = document.createElement("div");
  let buttunDeconect = document.createElement("button");
  let annulDeconnect = document.createElement("button");
  userImage.addEventListener("click", function () {
    userDecoonnection.classList =
      "absolute top-20 right-10 bg-white p-4 rounded-md shadow-lg flex flex-col ";
    userDecoonnection.innerHTML = `<p class="text-gray-600">Vous etes sur le point de se connecté !</p>`;
    buttunDeconect.classList =
      "bg-blue-500 text-white px-4 py-2 rounded-md mt-4";
    annulDeconnect.classList =
      "bg-red-500 text-white px-4 py-2 rounded-md mr-4 mt-4";
    buttunDeconect.innerHTML = "Oui";
    annulDeconnect.innerHTML = "Non";
    const contentBtn = document.createElement("div");
    contentBtn.classList = "flex justify-between items-center";
    contentBtn.append(annulDeconnect, buttunDeconect);
    userDecoonnection.appendChild(contentBtn);
    header.appendChild(userDecoonnection);
  });
  buttunDeconect.addEventListener("click", function () {
    localStorage.clear();
    window.location.href = "../login/login.html";
  });
  annulDeconnect.addEventListener("click", function () {
    userDecoonnection.classList.add("hidden");
  });
  iconMenu.addEventListener("click", function () {
    nav.classList.toggle("w-80");
    for (let i = 0; i < data.length; i++) {
      if (parentListe.children[i]) {
        let button = parentListe.children[i];
        let text = button.lastChild?.innerText;
        if (!button.dataset.tooltipInitialized) {
          showTooltip(button, text);
          button.dataset.tooltipInitialized = "true";
        }
        button.lastChild.classList.toggle("hidden");
        button.classList.toggle("justify-center");
      }
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
