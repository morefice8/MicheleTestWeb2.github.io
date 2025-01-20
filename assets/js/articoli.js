document.addEventListener("DOMContentLoaded", () => {
    const blogContainer = document.getElementById("blog-container");
    const modal = document.getElementById("modal");
    const modalTitle = document.getElementById("modal-title");
    const modalContent = document.getElementById("modal-content");
    const modalImage = document.getElementById("modal-image");
    const modalOverlay = document.getElementById("modal-overlay");

    // Lista degli articoli
    const articoli = [
        {
            titolo: "Napoli trionfa contro l'Atalanta: 3-2 a Bergamo",
            contenuto: "Il 18 gennaio 2025, il Napoli ha trionfato in una partita emozionante contro l'Atalanta, vincendo 3-2 al Gewiss Stadium di Bergamo.<br><br>" + 
                        "La partita, valida per la 21ª giornata di Serie A, ha visto i partenopei ottenere la loro sesta vittoria consecutiva in campionato.<br><br>" +
                        "L'Atalanta ha aperto le marcature al 16° minuto con un gol di Mateo Retegui, ma il Napoli ha risposto rapidamente con Matteo Politano al 27°. Prima della fine del primo tempo, Scott McTominay ha portato il Napoli in vantaggio con un gol al 40°. Nel secondo tempo, l'Atalanta ha pareggiato al 55° minuto grazie a un'azione personale di Ademola Lookman. Tuttavia, il Napoli ha dimostrato la sua determinazione e ha trovato il gol decisivo al 78° minuto con un colpo di testa di Romelu Lukaku, su assist di Anguissa.<br><br>" +
                        "Questa vittoria consolida la posizione del Napoli nelle zone alte della classifica e dimostra la loro forza e coesione come squadra.",
            immagine: "images/atalanta-napoli.jpeg",
        },
        {
            titolo: "Placeholder per Fusi",
            contenuto: "Fusi scrivi qua",
            immagine: "images/fusi.jpeg",
        },
    ];

    // Funzione per generare il layout degli articoli
    function generaArticoli() {
        blogContainer.innerHTML = articoli
            .map((articolo, index) => `
                <div class="blog-article">
                    <img src="${articolo.immagine}" alt="${articolo.titolo}">
                    <div class="article-content">
                        <h3>${articolo.titolo}</h3>
                        <p>${articolo.contenuto.split(".")[0]}.</p> <!-- Prima frase completa -->
                        <button class="read-more-btn" data-index="${index}">Leggi</button>
                    </div>
                </div>
            `)
            .join("");

        // Aggiungi eventi ai bottoni per aprire il modal
        document.querySelectorAll(".read-more-btn").forEach((btn) => {
            btn.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                apriModal(index);
            });
        });
    }

    // Funzione per aprire il modal con il contenuto dell'articolo
    function apriModal(index) {
        const articolo = articoli[index];
        modalTitle.textContent = articolo.titolo;
        modalContent.innerHTML = `<p>${articolo.contenuto}</p>`;
        modalImage.src = articolo.immagine;
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

    // Genera gli articoli al caricamento della pagina
    generaArticoli();
});
