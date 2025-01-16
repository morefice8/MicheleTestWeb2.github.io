// Inserisci il tuo API Token qui
const apiToken = "e172290af7c242bf9d9ba6ffc64280fd";
const teamId = 113; // ID del Napoli
const apiUrl = `https://api.football-data.org/v4/teams/${teamId}/matches`;

// Funzione per recuperare le partite
async function fetchMatches() {
    try {
        const response = await fetch(apiUrl, {
            headers: {
                'X-Auth-Token': apiToken
            }
        });

        if (!response.ok) {
            throw new Error(`Errore nella richiesta: ${response.status}`);
        }

        const data = await response.json();
        displayMatches(data.matches);
    } catch (error) {
        console.error('Errore:', error);
    }
}

// Funzione per visualizzare le partite
function displayMatches(matches) {
    const calendarContent = document.getElementById('calendar-content');
    calendarContent.innerHTML = ''; // Pulisce il contenuto precedente

    // Filtra le partite future
    const upcomingMatches = matches.filter(match => new Date(match.utcDate) > new Date());

    // Mostra un messaggio se non ci sono partite
    if (upcomingMatches.length === 0) {
        calendarContent.innerHTML = '<p>Non ci sono partite in programma al momento.</p>';
        return;
    }

    // Mostra le partite future
    upcomingMatches.forEach(match => {
        const matchDate = new Date(match.utcDate).toLocaleString('it-IT', {
            day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
        });

        const matchElement = document.createElement('div');
        matchElement.className = 'match';
        matchElement.innerHTML = `
            <h3>${match.homeTeam.name} vs ${match.awayTeam.name}</h3>
            <p>Data: ${matchDate}</p>
            <p>Competizione: ${match.competition.name}</p>
        `;

        calendarContent.appendChild(matchElement);
    });
}

// Chiamata iniziale
fetchMatches();
