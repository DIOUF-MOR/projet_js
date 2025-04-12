const isLoggedIn = localStorage.getItem("isLoggedIn");
let sessionsContainer = document.getElementById("sessionsContainer");
let loginPage = document.getElementById("login-page");
const form = document.getElementById("tissu-form");
const tableBody = document.getElementById("tissu-table-body");
const modal = document.getElementById("modal");
const openBtn = document.getElementById("openModalBtn");
const cancelBtn = document.getElementById("cancelBtn");
const formFournisseur = document.getElementById("fournisseurForm");
const fournisseurInput = document.getElementById("fournisseur");

const categorieModal = document.getElementById("categorieModal");
const openCategorieModalBtn = document.getElementById("openCategorieModal");
const cancelCategorieBtn = document.getElementById("cancelCategorieBtn");
const categorieForm = document.getElementById("categorieForm");

const select = document.getElementById("mySelect");
document.addEventListener('DOMContentLoaded', function() {
  // Références aux éléments
  const openModalBtn = document.getElementById('openModalUnite');
  const modalOverlay = document.getElementById('modalOverlay');
  const ajouterConversionBtn = document.getElementById('ajouterConversion');
  const libelleUniteInput = document.getElementById('libelleUnite');
  const valeurConversionInput = document.getElementById('valeurConversion');
  const conversionsTable = document.getElementById('conversionsTable');
  const enregistrerBtn = document.getElementById('enregistrerBtn');

  // Exemples de conversions prédéfinies
  const defaultConversions = [
      { libelle: 'Yard', conversion: '0,9144' },
      { libelle: 'Centimetre', conversion: '0,01' }
  ];

  // Fonction pour ouvrir le modal
  openModalBtn.addEventListener('click', function() {
      modalOverlay.classList.remove('hidden');
      
      // Charger les conversions par défaut
      conversionsTable.innerHTML = '';
      defaultConversions.forEach(conv => {
          addConversionToTable(conv.libelle, conv.conversion);
      });
  });

  // Fermer le modal quand on clique en dehors
  modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) {
          modalOverlay.classList.add('hidden');
      }
  });

  // Ajouter une nouvelle conversion
  ajouterConversionBtn.addEventListener('click', function() {
      const libelle = libelleUniteInput.value.trim();
      const valeur = valeurConversionInput.value.trim();
      
      if (libelle && valeur) {
          addConversionToTable(libelle, valeur);
          libelleUniteInput.value = '';
          valeurConversionInput.value = '';
      } else {
          alert('Veuillez remplir les deux champs de conversion');
      }
  });

  // Fonction pour ajouter une conversion au tableau
  function addConversionToTable(libelle, valeur) {
      const newRow = document.createElement('tr');
      newRow.className = 'border-b border-gray-200';
      newRow.innerHTML = `
          <td class="p-3">${libelle}</td>
          <td class="p-3">${valeur}</td>
          <td class="p-3">
              <button class="text-red-500 delete-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
              </button>
          </td>
      `;
      conversionsTable.appendChild(newRow);
      
      // Ajouter un écouteur d'événement pour supprimer la ligne
      const deleteBtn = newRow.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', function() {
          newRow.remove();
      });
  }

  // Enregistrer les unités
  enregistrerBtn.addEventListener('click', function() {
      const nomUnite = document.getElementById('libelleUnite').value.trim();
      const baseUnite = document.getElementById('valeurConversion').value.trim();
      
      if (!nomUnite || !baseUnite) {
          alert('Veuillez remplir tous les champs obligatoires');
          return;
      }
      
      // Récupérer toutes les conversions
      const conversions = [];
      const rows = conversionsTable.querySelectorAll('tr');
      rows.forEach(row => {
          const cells = row.querySelectorAll('td');
          if (cells.length >= 2) {
              conversions.push({
                  libelle: cells[0].textContent,
                  conversion: cells[1].textContent
              });
          }
      });
      
      // Créer l'objet unité
      const unite = {
          conversions: conversions
      };
      
      // Afficher les données (pour démonstration)
      console.log('Unité enregistrée:', unite);
      
      // Fermer le modal
      modalOverlay.classList.add('hidden');
  });
});
async function fetchOptions() {
  try {
    fetch("http://localhost:3000/categories") // adapte l'URL selon ton JSON Server
      .then((response) => response.json())
      .then((data) => {
        // Vider le select
        select.innerHTML =
          "<option disabled selected>Choisir une option</option>";

        data.forEach((item) => {
          const option = document.createElement("option");
          option.value = item.id;
          option.textContent = item.name;
          select.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des options :", error);
        select.innerHTML =
          "<option disabled selected>Erreur de chargement</option>";
      });
  } catch (error) {
    console.error("Erreur de chargement :", error);
  }
}
fetchOptions();

const categorieSelect = document.getElementById("categorie"); // Ce select doit exister dans ton HTML

openCategorieModalBtn.addEventListener("click", () => {
  categorieModal.classList.remove("hidden");
});

cancelCategorieBtn.addEventListener("click", () => {
  categorieModal.classList.add("hidden");
});

categorieForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const libelle = categorieForm.libelle.value.trim();
  const unite = categorieForm.unite.value.trim();
  const valeur = parseFloat(categorieForm.valeur.value);

  const data = {
    libelle,
    unite,
    valeur,
  };

  try {
    const res = await fetch("http://localhost:3000/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const newCategorie = await res.json();

      // Ajouter dans un select (ou autre liste)
      const option = document.createElement("option");
      option.value = newCategorie.id;
      option.textContent = newCategorie.libelle;
      categorieSelect.appendChild(option);
      categorieSelect.value = newCategorie.id;

      // Fermer le modal
      categorieModal.classList.add("hidden");
      categorieForm.reset();
    }
  } catch (err) {
    console.error("Erreur lors de l'ajout de la catégorie", err);
  }
});

// Ouvrir la modale
openBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// Fermer la modale
cancelBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Soumission du formulaire
formFournisseur.addEventListener("submit", async (e) => {
  e.preventDefault();
  const prenom = formFournisseur.prenom.value.trim();
  const nom = formFournisseur.nom.value.trim();

  const data = {
    prenom,
    nom,
    telephone: formFournisseur.telephone.value.trim(),
    adresse: formFournisseur.adresse.value.trim(),
  };

  try {
    const res = await fetch("http://localhost:3000/fournisseurs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const newFournisseur = await res.json();

      fournisseurInput.value = `${newFournisseur.prenom} ${newFournisseur.nom}`;

      modal.classList.add("hidden");
      formFournisseur.reset();
    }
  } catch (error) {
    console.error("Erreur ajout fournisseur :", error);
  }
});

if (!isLoggedIn) {
  window.location.href = "login/login.html";
}
login();

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const data = Object.fromEntries(new FormData(form).entries());

  const newRow = `
    <tr class="border-t">
      <td class="px-4 py-2">${data.libelle}</td>
      <td class="px-4 py-2">Tissu</td>
      <td class="px-4 py-2">${data.quantite}</td>
      <td class="px-4 py-2">${data.prix}</td>
      <td class="px-4 py-2">${data.fournisseur}</td>
      <td class="px-4 py-2">mètre</td>
      <td class="px-4 py-2 space-x-2">
        <button class="text-blue-600">✏️</button>
        <button class="text-red-600">🗑️</button>
      </td>
    </tr>
  `;

  tableBody.insertAdjacentHTML("beforeend", newRow);
  form.reset();
});

async function login() {
    console.log(isLoggedIn);
    
  try {
    const [tissusRes, fournisseursRes, categorieRes] = await Promise.all([
      fetch("http://localhost:3000/tissus"),
      fetch("http://localhost:3000/fournisseurs"),
      fetch("http://localhost:3000/categories"),
    ]);

    const tissus = await tissusRes.json();
    const fournisseurs = await fournisseursRes.json();
    const categories = await categorieRes.json();

    displayTable(tissus, fournisseurs, categories);
  } catch (error) {
    console.error("Erreur de chargement :", error);
  }
}

// Affiche les données dans un tableau
function displayTable(tissus, fournisseurs, categories) {
  tableBody.innerHTML = "";

  tissus.forEach((tissu) => {
    const fournisseurId = tissu.fournisseur;
    const fournisseur = fournisseurs.find((f) => f.id === fournisseurId);
    const nomFournisseur = fournisseur
      ? `${fournisseur.prenom} ${fournisseur.nom}`
      : "Non trouvé";

    const categorieId = tissu.categories;
    const categorie = categories.find((f) => f.id === categorieId);
    const nomCategorie = categorie ? `${categorie.libelle}` : "Non trouvé";

    const row = `
        <tr class="border-t">
          <td class="px-4 py-2">${tissu.libelle}</td>
          <td class="px-4 py-2">Catégorie ${nomCategorie}</td>
          <td class="px-4 py-2">${tissu.quantite}</td>
          <td class="px-4 py-2">${tissu.prix}</td>
          <td class="px-4 py-2 font-medium">${nomFournisseur}</td>
          <td class="px-4 py-2">${tissu.unites.join(", ")}</td>
          <td class="px-4 py-2">
            <button class="text-blue-600">✏️</button>
            <button class="text-red-600">🗑️</button>
          </td>
        </tr>
      `;
    tableBody.insertAdjacentHTML("beforeend", row);
  });
}

// Appel initial
