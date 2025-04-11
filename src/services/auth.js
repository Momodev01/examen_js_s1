// login.js
const form = document.getElementById('login-form');
const errorMsg = document.getElementById('error-msg');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = form.username.value;
    const password = form.password.value;

    if (username === '' || password === '') {
        errorMsg.textContent = 'Veuillez remplir tous les champs.';
        errorMsg.classList.remove('hidden');
        return;
    }

    try {
        const res = await fetch(`http://localhost:3000/users?username=${username}&password=${password}`);
        const users = await res.json();

        if (users.length === 1) {
            // Auth OK
            localStorage.setItem('user', JSON.stringify(users[0]));
            window.location.href = 'src/pages/home.html';
        } else {
            // Auth KO
            errorMsg.textContent = 'Identifiants invalides';
            errorMsg.classList.remove('hidden');
        }
    } catch (err) {
        console.error('Erreur lors de la connexion :', err);
        errorMsg.textContent = 'Erreur serveur';
        errorMsg.classList.remove('hidden');
    }
});
