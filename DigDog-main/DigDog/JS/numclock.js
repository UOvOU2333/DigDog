document.addEventListener('DOMContentLoaded', function () {
    const timeElement = document.getElementById('time');

    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    updateTime();
    setInterval(updateTime, 1000);
});
