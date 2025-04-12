
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


// Générer la Référence à partir du Libellé et de la Catégorie saisis
const libelleInput = document.getElementById('libelle');
const selectCategorie = document.getElementById('categorie');
const refSpan = document.getElementById('ref-produit');

function genererReference() {
    const libelle = libelleInput.value.trim();
    const category = selectCategorie.options[selectCategorie.selectedIndex].text;

    if (libelle && category) {
        const lib = libelle.substring(0, 3); // ex: Baz
        const code = String(Math.floor(1000 + Math.random() * 9000)); // ex: 3456

        refSpan.textContent = `${lib}-${category}-${code}`;
    } else {
        refSpan.textContent = '';
    }
}

libelleInput.addEventListener('input', genererReference);
selectCategorie.addEventListener('change', genererReference);