const apiUrl = 'http://localhost:3000';

async function fetchData(endpoint) {
    const response = await fetch(`${apiUrl}/${endpoint}`);
    return await response.json();
}

// Lister les produits existants
async function afficherProduits() {
    const [produits, categories, fournisseurs, unites] = await Promise.all([
        fetchData('produits'),
        fetchData('categories'),
        fetchData('fournisseurs'),
        fetchData('unites')
    ]);

    const tbody = document.getElementById('produits');
    tbody.innerHTML = '';

    produits.forEach(produit => {
        const categorie = categories.find(c => c.id === produit.categoryId);
        const unite = unites.find(u => u.id === produit.unityId);
        const fournisseur = fournisseurs.find(f => f.id === produit.fournisseurId);

        const tr = document.createElement('tr');
        tr.className = "border-t";

        tr.innerHTML = `
          <td class="px-4 py-2">${produit.libelle}</td>
          <td class="px-4 py-2">${categorie?.libelle || ''}</td>
          <td class="px-4 py-2">${produit.quantity}</td>
          <td class="px-4 py-2">${unite?.libelle || ''}</td>
          <td class="px-4 py-2">${produit.prix}</td>
          <td class="px-4 py-2">${fournisseur ? `${fournisseur.prenom} ${fournisseur.nom}` : ''}</td>
          <td class="p-2 space-x-2">
            <button id="edit" class="text-blue-500 hover:text-blue-700">✏️</button>
            <button id="delete" class="text-red-500 hover:text-red-700">🗑️</button>
          </td>
        `;

        tbody.appendChild(tr);
    });
}


// Remplir les champs de type select
async function champsSelect() {
    const [categories, unites, fournisseurs] = await Promise.all([
        fetchData('categories'),
        fetchData('unites'),
        fetchData('fournisseurs')
    ])
    const remplissage = (id, data, label) => {
        const select = document.getElementById(id)
        select.innerHTML = data.map(d => ` <option value="${d.id}"> ${label(d)} </option> `).join(' ');
    }
    remplissage('categorie', categories, c => c.libelle);
    remplissage('unity', unites, u => u.libelle);
    remplissage('fournisseur', fournisseurs, f => `${f.prenom} ${f.nom}`);
}


// Ajout d'un produit
const form = document.getElementById('produit-form');
form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('image');
    const notifText = document.getElementById('notif');
    const file = fileInput.files[0];

    // Si aucune image n'est sélectionnée
    if (!file) {
        notifText.classList.remove('hidden');
        notifText.classList.add('text-red-600');
        notifText.textContent = "Veuillez sélectionner une image !";
        return;
    }

    // Quand on change l'image (upload)
    fileInput.addEventListener('change', function () {
        if (fileInput.files.length > 0) {
            notifText.classList.add('hidden');
            notifText.textContent = '';
        }
    });

    const reader = new FileReader();

    reader.onload = async function () {
        const base64Image = reader.result;

        const newProduit = {
            libelle: document.getElementById('libelle').value,
            categoryId: parseInt(document.getElementById('categorie').value),
            quantity: parseInt(document.getElementById('qte').value),
            prix: parseFloat(document.getElementById('prix').value),
            fournisseurId: parseInt(document.getElementById('fournisseur').value),
            unityId: parseInt(document.getElementById('unity').value),
            image: base64Image,
            reference: document.getElementById('ref-produit').value
        }

        try {
            const response = await fetch(`${apiUrl}/produits`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduit)
            });

            if (response.ok) {
                form.reset();
                afficherProduits();
                notifText.classList.add('text-green-600');
                notifText.innerText = 'Produit ajouté avec succès ✅';
            } else {
                notifText.classList.add('text-red-600');
                notifText.innerText = 'Erreur lors de l’ajout';
            }
        } catch (error) {
            console.error(error);
            notifText.classList.add('text-red-600');
            notifText.innerText = 'Erreur de connexion';
        }
    }

    reader.readAsDataURL(file);
})


// Appel initial
champsSelect();
afficherProduits();
