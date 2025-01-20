document.addEventListener("DOMContentLoaded", function () {
    function mostraClassificaCompleta(standings) {
        // Contenitore per la classifica
        const classificaContainer = document.querySelector("#classifica-container");
        classificaContainer.innerHTML = ""; // Svuota il contenitore

        // Crea la tabella
        const table = document.createElement("table");
        table.classList.add("classifica-table");

        // Header della tabella
        const header = `
            <thead>
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
            </thead>
        `;
        table.innerHTML = header;

        // Corpo della tabella
        const tbody = document.createElement("tbody");

        standings.forEach(team => {
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
            tbody.innerHTML += row;
        });

        table.appendChild(tbody);
        classificaContainer.appendChild(table);
    }

    fetch("assets/json/standings.json")
        .then(response => response.json())
        .then(data => {
            // Accedi a standings[0].table
            const standings = data.standings[0].table;
            mostraClassificaCompleta(standings);
        })
        .catch(error => {
            console.error("Errore durante il caricamento della classifica:", error);
            document.querySelector("#classifica-container").innerHTML = "<p>Errore nel caricamento dei dati.</p>";
        });
});
