document.addEventListener('DOMContentLoaded', function () {
    FullCalendar.globalLocales.push({
      code: 'it',
      week: { dow: 1, doy: 4 },
      buttonText: {
        prev: 'Precedente',
        next: 'Successivo',
        today: 'Oggi',
        month: 'Mese',
        week: 'Settimana',
        day: 'Giorno'
      }
    });
  
    // Identificare l'elemento del calendario
    const calendarEl = document.getElementById('calendar');
  
    // Inizializzare il calendario solo se non è già stato fatto
    if (calendarEl) {
      let calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'it', // Imposta la lingua italiana
        initialView: 'dayGridMonth',
        contentHeight: 800,
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: ''
        },
        events: [], // Gli eventi saranno aggiunti dinamicamente
        eventClassNames: function (arg) {
          return ['match-box'];
        },
        eventContent: function (info) {
          const title = document.createElement('div');
          title.innerText = info.event.title;
          title.style.fontWeight = 'bold';
  
          const details = document.createElement('div');
          details.innerText = info.event.extendedProps.details || '';
          details.style.marginTop = '3px';
  
          const container = document.createElement('div');
          container.appendChild(title);
          if (details.innerText) container.appendChild(details);
          return { domNodes: [container] };
        }
      });
  
      // Assicurati che il calendario venga renderizzato solo quando il tab è visibile
      document.querySelector('a[href="#calendario"]').addEventListener('click', function() {
        if (!calendar.isRendered) {
          calendar.render();
        } else {
          // Forza il ridimensionamento quando il tab è visibile
          calendar.updateSize();
        }
      });
  
      // Aggiungi eventi dopo che il calendario è stato renderizzato
      fetch('http://localhost:3000/matches')
        .then(response => response.json())
        .then(data => {
          data.matches.forEach(match => {
            const matchDate = new Date(match.utcDate);
            calendar.addEvent({
              title: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
              start: matchDate,
              extendedProps: {
                details: `Risultato: ${match.score.fullTime.home} - ${match.score.fullTime.away}`
              }
            });
          });
        })
        .catch(error => {
          console.error('Errore nel recupero delle partite:', error);
        });
    }
  });
  