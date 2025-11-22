document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.querySelector('.envelope-wrapper');
    const topFlap = document.querySelector('.envelope-top-flap');
    const card = document.querySelector('.envelope-card');
    const confettiContainer = document.getElementById('confetti-container');
    const messageText = document.querySelector('.message-text');
    const signatureText = document.querySelector('.signature-text');

    // Durate delle fasi in millisecondi
    const SHAKE_DURATION = 3000;
    const OPEN_DELAY = 500;
    const OPEN_DURATION = 2000; // La durata della transizione in CSS
    const CARD_REVEAL_DELAY = OPEN_DURATION / 2;
    const PHOTO_DISPLAY_TIME = 5000;
    const LOOP_DELAY = 3000;

    /**
     * Inizializza o resetta tutti gli elementi allo stato iniziale.
     */
    function resetAnimation() {
        envelope.classList.remove('shaking');
        topFlap.classList.remove('open');
        card.classList.remove('reveal');
        // Rimuove tutti i coriandoli
        confettiContainer.innerHTML = '';
        messageText.classList.remove('hidden-text');
        signatureText.classList.remove('hidden-text');
    }

    /**
     * Genera e fa cadere un certo numero di coriandoli.
     */
    function generateConfetti(count = 100) {
        for (let i = 0; i < count; i++) {
            const confetto = document.createElement('div');
            confetto.classList.add('confetto');
            
            // Posizione iniziale casuale sopra lo schermo
            const x = Math.random() * 100 + 'vw';
            const y = Math.random() * -100 + 'vh'; // Iniziano fuori schermo
            
            // Ritardo e durata per variare la caduta
            const delay = Math.random() * 1; // 0-1 secondo di ritardo
            const duration = 4 + Math.random() * 2; // 4-6 secondi di caduta

            confetto.style.left = x;
            confetto.style.top = y;
            confetto.style.animationDelay = delay + 's';
            confetto.style.animationDuration = duration + 's';
            
            // Variamo la dimensione e la rotazione iniziale
            const size = 5 + Math.random() * 8; // 5px a 13px
            confetto.style.width = size + 'px';
            confetto.style.height = size + 'px';
            confetto.style.transform = `rotate(${Math.random() * 360}deg)`;


            confettiContainer.appendChild(confetto);
            
            // Rimuovi il confetto dopo che è caduto (per pulizia)
            setTimeout(() => {
                confetto.remove();
            }, (delay + duration) * 1000 + 500);
        }
    }

    /**
     * Gestisce la sequenza completa dell'animazione.
     */
    function startAnimation() {
        // 1. Fase Iniziale: Tremolio
        resetAnimation();
        envelope.classList.add('shaking');
        
        // 2. Fase: Apertura Lenta
        setTimeout(() => {
            envelope.classList.remove('shaking');
            topFlap.classList.add('open');
            messageText.classList.add('hidden-text'); // Nasconde il messaggio iniziale
        }, SHAKE_DURATION);

        // 3. Fase: Uscita della Foto e Coriandoli
        setTimeout(() => {
            card.classList.add('reveal');
            generateConfetti(150); // Lancia i coriandoli
        }, SHAKE_DURATION + CARD_REVEAL_DELAY);
        
        // 4. Fase: Visualizzazione della Foto
        setTimeout(() => {
            // Qui la foto è visibile per PHOTO_DISPLAY_TIME
        }, SHAKE_DURATION + OPEN_DURATION + PHOTO_DISPLAY_TIME);

        // 5. Fase: Reset e Loop
        setTimeout(() => {
            startAnimation(); // Riavvia l'animazione
        }, SHAKE_DURATION + OPEN_DURATION + PHOTO_DISPLAY_TIME + LOOP_DELAY);
    }

    // Avvia l'animazione non appena la pagina è caricata
    startAnimation();
});
