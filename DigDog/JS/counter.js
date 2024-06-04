document.addEventListener('DOMContentLoaded', function () {
    const daysLeftElement = document.getElementById('days-remaining');
    const remainingCircle = document.getElementById('remaining-circle');

    function getDaysRemaining() {
        const today = new Date();
        const endOfYear = new Date(today.getFullYear(), 11, 31);
        const oneDay = 24 * 60 * 60 * 1000;
        return Math.round((endOfYear - today) / oneDay);
    }

    function updateCountdown() {
        const daysRemaining = getDaysRemaining();
        const totalDays = (new Date().getFullYear() % 4 === 0) ? 366 : 365;
        const percentage = ((totalDays - daysRemaining) / totalDays) * 100;

        daysLeftElement.textContent = daysRemaining;
        remainingCircle.style.strokeDashoffset = 502 * (1 - (percentage / 100));
    }

    updateCountdown();
});
