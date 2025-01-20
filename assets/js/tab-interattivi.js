document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tab-links li');
    const tabContent = document.querySelectorAll('.tab-content .tab-pane');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const slides = document.querySelectorAll('.member-slide');
    let currentIndex = 0;
    const calendarEl = document.getElementById('calendar'); // Identifica il contenitore del calendario
    let calendar;

    // Inizializza il calendario solo quando necessario
    function initializeCalendar() {
        if (!calendar) {
            calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth'
            });
            calendar.render();
        }
    }

    // Gestione dei tab
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Rimuovi la classe 'active' da tutti i tab
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Rimuovi la classe 'active' da tutte le sezioni di contenuto
            tabContent.forEach(content => content.classList.remove('active'));

            // Aggiungi la classe 'active' alla sezione corrispondente
            const target = document.querySelector(tab.querySelector('a').getAttribute('href'));
            target.classList.add('active');

            // Ridisegna il calendario se il tab 'Prossime Partite' è attivo
            if (target.id === 'calendario') {
                initializeCalendar();
                calendar.updateSize();
            }
        });
    });

    // Funzione per mostrare il membro successivo
    function showNextSlide() {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % slides.length;  // Ciclo da inizio
        slides[currentIndex].classList.add('active');
    }

    // Funzione per mostrare il membro precedente
    function showPrevSlide() {
        slides[currentIndex].classList.remove('active');
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;  // Ciclo da fine
        slides[currentIndex].classList.add('active');
    }

    nextButton.addEventListener('click', showNextSlide);
    prevButton.addEventListener('click', showPrevSlide);

    // Imposta la prima slide come attiva
    slides[currentIndex].classList.add('active');
    
});

