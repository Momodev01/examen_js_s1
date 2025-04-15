// src/utils/popupUtils.js

export function closePopupBtn(btnId, popupId, formId = null) {
    const btn = document.getElementById(btnId);
    const popup = document.getElementById(popupId);
    const form = formId ? document.getElementById(formId) : null;

    if (!btn || !popup) return;

    btn.addEventListener('click', () => {
        popup.classList.add('hidden');
        if (form) form.reset();
    });
}

export function fermeturePopup(popupId, popupContentId) {
    const popup = document.getElementById(popupId);
    const popupContent = document.getElementById(popupContentId);

    if (!popup || !popupContent) return;

    popup.addEventListener('click', (event) => {
        if (!popupContent.contains(event.target)) {
            popup.classList.add('hidden');
        }
    });
}

export function openPopup(btnId, popupId) {
    const btn = document.getElementById(btnId);
    const popup = document.getElementById(popupId);

    if (!btn || !popup) return;

    btn.addEventListener('click', () => {
        popup.classList.remove('hidden');
    });
}
