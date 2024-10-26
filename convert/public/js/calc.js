document.addEventListener('DOMContentLoaded', () => {
    const daysElement = document.getElementById('days');
    const daysNameElement = document.getElementById('dayName');
    const monthYearElement = document.getElementById('monthYear');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const toggleViewButton = document.getElementById('toggleView');

    const addFoodButton = document.getElementById('addFood');
    const modal = document.getElementById('foodModal');
    const span = document.getElementsByClassName('close')[0];
    
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    weekdays.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.classList.add('header');
        dayElement.textContent = day;
        daysNameElement.appendChild(dayElement);
    });
    let currentDate = new Date();
    let monthView = true;

    const daysTemplate = Handlebars.compile(document.getElementById('days-template').innerHTML);

    function renderCalendar() {
        daysElement.innerHTML = '';
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        monthYearElement.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;

        let daysArray = [];

        if (monthView) {
            for (let i = 0; i < firstDay; i++) {
                daysArray.push('');
            }
            for (let date = 1; date <= lastDate; date++) {
                daysArray.push(date);
            }
        } else {
            const startOfWeek = new Date(currentDate);
            startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
            for (let i = 0; i < 7; i++) {
                daysArray.push(startOfWeek.getDate() + i);
            }
        }

        daysElement.innerHTML = daysTemplate({ days: daysArray });
    }

    prevButton.addEventListener('click', () => {
        if (monthView) {
            currentDate.setMonth(currentDate.getMonth() - 1);
        } else {
            currentDate.setDate(currentDate.getDate() - 7);
        }
        renderCalendar();
    });

    nextButton.addEventListener('click', () => {
        if (monthView) {
            currentDate.setMonth(currentDate.getMonth() + 1);
        } else {
            currentDate.setDate(currentDate.getDate() + 7);
        }
        renderCalendar();
    });

    toggleViewButton.addEventListener('click', () => {
        monthView = !monthView;
        renderCalendar();
    });

    renderCalendar();

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
});
