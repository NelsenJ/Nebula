document.addEventListener('DOMContentLoaded', () => {
    const weekDisplay = document.getElementById('weekDisplay');
    const monthDisplay = document.getElementById('monthDisplay');
    const prevWeekButton = document.getElementById('prevWeek');
    const nextWeekButton = document.getElementById('nextWeek');
    const addFoodButton = document.getElementById('addFood');
    const modal = document.getElementById('foodModal');
    const span = document.getElementsByClassName('close')[0];
    
    let currentDate = new Date();
    let isMonthView = false;
    
    function getWeekDays(date) {
        const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
        const weekDays = [];
        
        for (let i = 0; i < 7; i++) {
            const day = new Date(startOfWeek);
            day.setDate(startOfWeek.getDate() + i);
            weekDays.push(day);
        }
        
        return weekDays;
    }
    
    function updateWeekDisplay() {
        weekDisplay.innerHTML = '';
        const days = isMonthView ? getMonthDays(new Date(currentDate)) : getWeekDays(new Date(currentDate));
        
        days.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.classList.add('day');
            dayElement.textContent = day.getDate();
            weekDisplay.appendChild(dayElement);
        });

        const monthName = new Intl.DateTimeFormat('id-ID', { month: 'long' }).format(currentDate);
        monthDisplay.textContent = `${monthName} ${currentDate.getFullYear()}`;
    }
    
    prevWeekButton.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() - 7);
        updateWeekDisplay();
    });
    
    nextWeekButton.addEventListener('click', () => {
        currentDate.setDate(currentDate.getDate() + 7);
        updateWeekDisplay();
    });

    addFoodButton.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    span.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
    
    updateWeekDisplay();
});
