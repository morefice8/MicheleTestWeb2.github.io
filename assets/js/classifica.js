document.addEventListener("DOMContentLoaded", () => {
    // Funzione per caricare la classifica
    async function caricaClassifica() {
        const apiUrl = 'http://localhost:3000/standings';

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }

            const standings = await response.json();

            // Verifica che la classifica sia disponibile
            if (standings.length > 0) {
                mostraClassifica(standings);
            } else {
                console.error("Classifica non trovata!");
            }
        } catch (error) {
            console.error("Errore in caricaClassifica:", error);
            mostraMessaggioErrore("Impossibile caricare la classifica.");
        }
    }

    // Funzione per mostrare la classifica nel DOM
    function mostraClassifica(standings) {
        const classificaContainer = document.getElementById("classifica-container");
        classificaContainer.innerHTML = ""; // Svuota il contenuto precedente

        const table = document.createElement("table");
        table.classList.add("classifica-table");

        // Header della tabella
        const header = `
            <tr>
                <th>Posizione</th>
                <th>Squadra</th>
                <th>Punti</th>
                <th>Giocate</th>
                <th>Vinte</th>
                <th>Pareggi</th>
                <th>Perse</th>
                <th>Gol Fatti</th>
                <th>Gol Subiti</th>
                <th>Diff. Reti</th>
            </tr>
        `;
        table.innerHTML = header;

        // Aggiungi le righe della classifica
        standings.forEach((team) => {
            const row = `
                <tr>
                    <td>${team.position}</td>
                    <td>
                        <img src="${team.team.crest}" alt="${team.team.name}" class="logo">
                        ${team.team.name}
                    </td>
                    <td>${team.points}</td>
                    <td>${team.playedGames}</td>
                    <td>${team.won}</td>
                    <td>${team.draw}</td>
                    <td>${team.lost}</td>
                    <td>${team.goalsFor}</td>
                    <td>${team.goalsAgainst}</td>
                    <td>${team.goalDifference}</td>
                </tr>
            `;
            table.innerHTML += row;
        });

        classificaContainer.appendChild(table);
    }

    // Funzione per mostrare un messaggio di errore
    function mostraMessaggioErrore(messaggio) {
        const classificaContainer = document.getElementById("classifica-container");
        classificaContainer.innerHTML = `<p class="errore">${messaggio}</p>`;
    }

    // Carica la classifica quando la pagina è pronta
    caricaClassifica();
});
