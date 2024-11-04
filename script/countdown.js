const targetDate = new Date(Date.UTC(2024, 10, 11));
let timeLimit = Math.floor((targetDate - new Date()) / 1000);

const elements = {
    days: document.querySelectorAll('#days'),
    hours: document.querySelectorAll('#hours'),
    minutes: document.querySelectorAll('#minutes'),
    seconds: document.querySelectorAll('#seconds'),
};

const formatTimeUnit = (unit) => String(unit).padStart(2, '0');

const updateCountdown = () => {
    const days = Math.floor(timeLimit / (3600 * 24));
    const hours = Math.floor((timeLimit % (3600 * 24)) / (3600));
    const minutes = Math.floor((timeLimit % (3600)) / 60);
    const seconds = timeLimit % 60;

    elements.days.forEach(el => el.textContent = formatTimeUnit(days));
    elements.hours.forEach(el => el.textContent = formatTimeUnit(hours));
    elements.minutes.forEach(el => el.textContent = formatTimeUnit(minutes));
    elements.seconds.forEach(el => el.textContent = formatTimeUnit(seconds));
};

const countdownInterval = setInterval(() => {
    if (timeLimit > 0) {
        updateCountdown();
        timeLimit--;
    } else {
        clearInterval(countdownInterval);
        Object.values(elements).forEach(el => {
            el.forEach(e => e.textContent = '00');
        });
        alert("¡Se acabó el tiempo!");
    }
}, 1000);

updateCountdown();

const goSpecialOffer = () => {
    window.location.href = '#contact';
}