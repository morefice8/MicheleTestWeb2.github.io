// URL del server proxy locale
fetch('http://localhost:3000/matches')  // Modifica la URL per puntare al server proxy
  .then(response => response.json())    // Converte la risposta in formato JSON
  .then(data => {
    console.log(data);  // Mostra i dati delle partite nella console

    // A questo punto, puoi anche aggiungere il codice per mostrare i dati nella tua pagina HTML
    const calendarContent = document.getElementById('calendar-content');
    calendarContent.innerHTML = '';  // Pulisce il contenuto del calendario

    // Verifica se ci sono partite da mostrare
    if (data.matches && data.matches.length > 0) {
      data.matches.forEach(match => {
        const matchElement = document.createElement('div');
        matchElement.classList.add('match');
        matchElement.innerHTML = `
          <p><strong>Data:</strong> ${new Date(match.utcDate).toLocaleString('it-IT', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
          <p><strong>Competizione:</strong> ${match.competition.name}</p>
          <p><strong>Avversario:</strong> ${match.homeTeam.name} vs ${match.awayTeam.name}</p>
        `;
        calendarContent.appendChild(matchElement);  // Aggiunge il match alla pagina
      });
    } else {
      calendarContent.innerHTML = 'Nessuna partita disponibile.';
    }
  })
  .catch(error => {
    console.error('Errore durante il recupero delle partite:', error);
  });
