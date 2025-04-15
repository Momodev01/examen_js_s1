
import {closePopupBtn, fermeturePopup, openPopup} from "./utils/popupUtils.js";

// Uploading et affichage de l'image
const inputImage = document.getElementById('image');
const selectedImage = document.getElementById('selected-image');
const placeholder = document.getElementById('place-holder');

inputImage.addEventListener('change', function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            selectedImage.src = e.target.result;
            selectedImage.classList.remove('hidden');
            placeholder.classList.add('hidden');
        };

        reader.readAsDataURL(file);
    } else {
        selectedImage.classList.add('hidden');
        selectedImage.src = '';
        placeholder.classList.remove('hidden');
    }
});


// Générer la Référence à partir du Libellé saisi et de la Catégorie selectionnée
const libelleInput = document.getElementById('libelle');
const selectCategorie = document.getElementById('categorie');
const refSpan = document.getElementById('ref-produit');

function genererReference() {
    const libelle = libelleInput.value.trim();
    const category = selectCategorie.options[selectCategorie.selectedIndex].text;

    if (libelle && category) {
        const lib = libelle.substring(0, 3);
        const code = String(Math.floor(1000 + Math.random() * 9000));

        refSpan.textContent = `${lib}-${category}-${code}`;
    } else {
        refSpan.textContent = '';
    }
}
libelleInput.addEventListener('input', genererReference);
selectCategorie.addEventListener('change', genererReference);


openPopup('ouvrir-fournisseur', 'popup-fournisseur');
fermeturePopup('popup-fournisseur', 'popup-content-fournisseur');
closePopupBtn('annuler-fournisseur', 'popup-fournisseur')

openPopup('ouvrir-categorie', 'popup-categorie');
fermeturePopup('popup-categorie', 'popup-content-categorie');
closePopupBtn('annuler-categorie', 'popup-categorie');

openPopup('ouvrir-unite', 'popup-unite');
fermeturePopup('popup-unite', 'popup-content-unite');
closePopupBtn('annuler-unite', 'popup-unite');

