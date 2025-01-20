document.addEventListener('DOMContentLoaded', function () {
    // Funzione per estrarre la prossima partita
    function extractNextMatchData(nextMatch) {
        const matches = nextMatch.matches;

        // Filtra solo le partite future (status: SCHEDULED) e che non sono già passate
        const upcomingMatches = matches.filter(match => match.status === "TIMED" && new Date(match.utcDate) > new Date());

        // Ordina le partite per data (più vicina prima)
        upcomingMatches.sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));

        if (upcomingMatches.length === 0) {
            console.error("Nessuna partita futura trovata.");
            document.querySelector("#prossima-partita").innerHTML = "<p>Dati della prossima partita non disponibili.</p>";
            return;
        }

        // Prendi la partita più vicina (prossima)
        const match = upcomingMatches[0];

        if (!match.homeTeam || !match.awayTeam || !match.utcDate) {
            console.error("Dati della partita prossima invalidi:", match);
            document.querySelector("#prossima-partita").innerHTML = "<p>Dati della prossima partita non disponibili.</p>";
            return;
        }

        const { homeTeam, awayTeam, utcDate } = match;

        // Aggiorna il contenuto della card con i dettagli della prossima partita
        document.querySelector("#next-home-team h3").innerText = homeTeam.name;
        document.querySelector("#next-home-team img").src = homeTeam.crest;
        document.querySelector("#next-away-team h3").innerText = awayTeam.name;
        document.querySelector("#next-away-team img").src = awayTeam.crest;
        document.querySelector("#next-home-team-name").innerText = homeTeam.name;
        document.querySelector("#next-away-team-name").innerText = awayTeam.name;

        // Mostra i dettagli della prossima partita
        document.querySelector("#next-match-details").innerText = `Prossima partita il ${new Date(utcDate).toLocaleString()}`;

        // Calcolare e mostrare il countdown
        const matchDate = new Date(utcDate).getTime();
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = matchDate - now;

            if (distance < 0) {
                document.getElementById('countdown').innerText = "La partita è iniziata!";
            } else {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                document.getElementById('countdown').innerText = `${days}` + " giorni " + `${hours}` + " ore " + `${minutes}` + " minuti " + `${seconds}` + " secondi ";
            }
        }

        setInterval(updateCountdown, 1000);
    }

    fetch('assets/json/matches.json')
        .then(response => response.json())
        .then(nextMatches => {
            extractNextMatchData(nextMatches);
        })
        .catch(error => {
            console.error("Errore durante il caricamento delle partite:", error);
            document.querySelector("#prossima-partita").innerHTML = "<p>Errore nel caricamento dei dati.</p>";
        });
});
