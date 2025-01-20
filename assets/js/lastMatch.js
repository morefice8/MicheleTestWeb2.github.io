document.addEventListener('DOMContentLoaded', function () {
    // Inserisci qui il codice JavaScript
    function extractMatchData(lastMatch) {
        // Access the matches array from within lastMatch
        const matches = lastMatch.matches;

        // Filtra solo le partite giocate
        const finishedMatches = lastMatch.matches.filter(match => match.status === "FINISHED");

        // Ordina le partite per data (più recente prima)
        finishedMatches.sort((a, b) => new Date(b.utcDate) - new Date(a.utcDate));

        if (finishedMatches.length === 0) {
            console.error("Nessuna partita terminata trovata.");
            document.querySelector("#ultima-partita").innerHTML = "<p>Dati della partita non disponibili.</p>";
            return;
        }

        // Prendi la partita più recente
        const match = finishedMatches[0];

        if (!match.homeTeam || !match.awayTeam || !match.score || !match.utcDate) {
            console.error("Invalid match data:", match);
            document.querySelector("#ultima-partita").innerHTML = "<p>Dati della partita non disponibili.</p>";
            return;
        }

        const { homeTeam, awayTeam, score, utcDate, winner } = match;

        // Assegna la classe della card in base al vincitore
        let cardClass = "";
        if (winner === "HOME_TEAM") {
            cardClass = "home-win";
        } else if (winner === "AWAY_TEAM") {
            cardClass = "away-win";
        } else {
            cardClass = "draw";
        }

        document.querySelector("#home-team h3").innerText = homeTeam.name;
        document.querySelector("#home-team img").src = homeTeam.crest;
        document.querySelector("#away-team h3").innerText = awayTeam.name;
        document.querySelector("#away-team img").src = awayTeam.crest;
        document.querySelector("#home-score").innerText = score.fullTime.home;
        document.querySelector("#away-score").innerText = score.fullTime.away;
        document.querySelector("#match-details").innerText = `Giocata il ${new Date(utcDate).toLocaleString()}`;

        // Applica la classe per il vincitore alla card
        document.querySelector(".partita-card").classList.add(cardClass);
    }

    fetch("http://localhost:3000/matches")
        .then(response => response.json())
        .then(lastMatches => {
            extractMatchData(lastMatches);
        })
        .catch(error => {
            console.error("Errore durante il caricamento delle partite:", error);
            document.querySelector("#ultima-partita").innerHTML = "<p>Errore nel caricamento dei dati.</p>";
        });
});