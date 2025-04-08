let currentStep = 1;

function showStep(step) {
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    document.getElementById(`step-${step}`).classList.add('active');
}

document.getElementById('yes-btn').addEventListener('click', () => {
    document.getElementById('step-1').innerHTML = `
        <p>Bardzo dobra odpowiedź ❤️</p>
        <button id="continue-btn-1">Przejdź dalej</button>
    `;
    document.getElementById('continue-btn-1').addEventListener('click', () => showStep(2));
});

function moveNoButton(btn) {
    const step1 = document.getElementById('step-1');
    const step1Rect = step1.getBoundingClientRect(); // Pobieramy wymiary ramki kroku 1
    const maxX = step1Rect.width - btn.offsetWidth; // Maksymalna pozycja X w obrębie ramki
    const maxY = step1Rect.height - btn.offsetHeight; // Maksymalna pozycja Y w obrębie ramki
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Ustawiamy pozycję przycisku "Nie" w granicach ramki
    btn.style.top = `${randomY}px`;
    btn.style.left = `${randomX}px`;

    // Powiększamy przycisk "Tak"
    const yesBtn = document.getElementById('yes-btn');
    const currentScale = parseFloat(yesBtn.style.transform.replace('scale(', '').replace(')', '')) || 1;
    yesBtn.style.transform = `scale(${currentScale + 0.1})`;
}

document.getElementById('no-btn').addEventListener('mouseover', (e) => {
    moveNoButton(e.target);
});

document.getElementById('no-btn').addEventListener('click', (e) => {
    moveNoButton(e.target); // Zmieniamy pozycję przycisku po kliknięciu
});

document.getElementById('continue-btn-2').addEventListener('click', () => showStep(3));

document.getElementById('continue-btn-3').addEventListener('click', () => {
    showStep(4);
    revealItems(); // Wywołujemy animację pojawiania się słów
});

function revealItems() {
    const items = document.querySelectorAll('.item');
    const continueBtn = document.getElementById('continue-btn-4');
    continueBtn.classList.add('hidden'); // Ukrywamy przycisk "Dalej" na początku

    let allItemsRevealed = false; // Flaga, aby upewnić się, że przycisk pojawia się po animacji

    items.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible'); // Dodajemy klasę, aby uruchomić animację
            if (index === items.length - 1) {
                allItemsRevealed = true; // Ustawiamy flagę po ostatnim elemencie
                setTimeout(() => {
                    if (allItemsRevealed) {
                        continueBtn.classList.remove('hidden'); // Pokazujemy przycisk "Dalej"
                    }
                }, 500); // Krótkie opóźnienie po ostatnim elemencie
            }
        }, index * 100); // Opóźnienie dla każdego elementu
    });

    // Awaryjne opóźnienie 3 sekundy, jeśli animacja nie działa poprawnie
    setTimeout(() => {
        if (!allItemsRevealed) {
            continueBtn.classList.remove('hidden');
        }
    }, 3000);
}

document.getElementById('continue-btn-4').addEventListener('click', () => showStep(5));

let heartClicks = 0;
const heart = document.getElementById('heart');

// Funkcja do losowego ustawiania pozycji serduszka
function moveHeart() {
    const heartGame = document.getElementById('heart-game');
    const heartGameRect = heartGame.getBoundingClientRect(); // Pobieramy wymiary ramki gry
    const maxX = heartGameRect.width - heart.offsetWidth; // Maksymalna pozycja X w obrębie ramki
    const maxY = heartGameRect.height - heart.offsetHeight; // Maksymalna pozycja Y w obrębie ramki
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    // Ustawiamy pozycję serca w granicach ramki gry
    heart.style.top = `${randomY}px`;
    heart.style.left = `${randomX}px`;
}

// Uruchamiamy przeskakiwanie serduszka co 0.9 sekundy
setInterval(moveHeart, 900);

heart.addEventListener('click', () => {
    heartClicks++;
    document.getElementById('heart-counter').textContent = `Złapane serca: ${heartClicks}/5`; // Zmieniono na 5
    if (heartClicks >= 5) {
        document.getElementById('heart-game').innerHTML = `
            <p>Wygrałaś serce Matiego!</p>
            <button id="continue-btn-5">Zobacz coś jeszcze</button>
        `;
        document.getElementById('continue-btn-5').addEventListener('click', () => showStep(6));
    }
});

document.getElementById('continue-btn-5')?.remove();

document.getElementById('continue-btn-6').addEventListener('click', () => showStep(7));

showStep(1);

// Dodajemy obsługę dotyku dla przycisku "Nie"
const noBtn = document.getElementById('no-btn');
noBtn.addEventListener('mouseover', (e) => moveNoButton(e.target));
noBtn.addEventListener('click', (e) => moveNoButton(e.target)); // Obsługa kliknięcia myszką
noBtn.addEventListener('touchstart', (e) => moveNoButton(e.target)); // Obsługa dotyku

// Dodajemy obsługę dotyku dla serduszka
heart.addEventListener('click', () => handleHeartClick());
heart.addEventListener('touchstart', () => handleHeartClick()); // Obsługa dotyku

function handleHeartClick() {
    heartClicks++;
    document.getElementById('heart-counter').textContent = `Złapane serca: ${heartClicks}/5`;
    if (heartClicks >= 5) {
        document.getElementById('heart-game').innerHTML = `
            <p>Wygrałaś serce Matiego!</p>
            <button id="continue-btn-5">Zobacz coś jeszcze</button>
        `;
        document.getElementById('continue-btn-5').addEventListener('click', () => showStep(6));
    }
}
