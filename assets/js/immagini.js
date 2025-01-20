document.addEventListener("DOMContentLoaded", () => {
    const galleryContainer = document.getElementById("gallery-container");
    const modal = document.getElementById("gallery-modal"); // Cambiato l'ID
    const modalImage = document.getElementById("gallery-modal-image"); // Cambiato l'ID
    const modalOverlay = document.getElementById("gallery-modal-overlay"); // Cambiato l'ID
    const modalContent = document.getElementById("gallery-modal-content");

    const immaginiGalleria = [
        { src: "images/napoli-logo.jpg", alt: "Logo del Napoli" },
        { src: "images/ciro.jpeg", alt: "Tifosi del Napoli" },
        { src: "images/michele.jpeg", alt: "Stadio Maradona" },
        { src: "images/scudieri.jpeg", alt: "Tifosi del Napoli" },
        { src: "images/fusi.jpeg", alt: "Tifosi del Napoli" },
        { src: "images/pietro.jpeg", alt: "Tifosi del Napoli" },
        { src: "images/fabrizio.jpeg", alt: "Tifosi del Napoli" },
        { src: "images/roberto.jpeg", alt: "Tifosi del Napoli" },
        { src: "images/kiss.jpeg", alt: "Tifosi del Napoli" },
        
    ];

    function generaGalleria() {
        galleryContainer.innerHTML = immaginiGalleria
            .map(
                (img, index) => `
            <div class="gallery-item" data-index="${index}">
                <img src="${img.src}" alt="${img.alt}">
            </div>
        `
            )
            .join("");

        document.querySelectorAll(".gallery-item").forEach((item) => {
            item.addEventListener("click", (event) => {
                const index = event.currentTarget.getAttribute("data-index");
                apriModal(index);
            });
        });
    }

    function apriModal(index) {
        const immagine = immaginiGalleria[index];
        modalImage.src = immagine.src;
        modalImage.alt = immagine.alt;
        modal.style.display = "block";  // Rende visibile il modal
        modalOverlay.style.display = "block";  // Mostra l'overlay (sfondo semitrasparente)
    }

    // Funzione per chiudere il modal
    document.querySelector(".modal-close-btn").addEventListener("click", () => {
        chiudiModal();
    });

    // Funzione per chiudere il modal cliccando sull'overlay
    modalOverlay.addEventListener("click", () => {
        chiudiModal();
    });

    // Chiudi il modal premendo il tasto Esc
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            chiudiModal();
        }
    });

    // Funzione per chiudere il modal
    function chiudiModal() {
        modal.style.display = "none";  // Nasconde il modal
        modalOverlay.style.display = "none";  // Nasconde l'overlay
    }

    generaGalleria();
});
