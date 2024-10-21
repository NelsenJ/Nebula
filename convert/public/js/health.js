const ctx = document.getElementById('myLineChart').getContext('2d');
const data = [15, 25, 20, 35, 38];  // Your data points

// Calculate the highest value from the data array
const highestValue = Math.max(...data);
const lowestValue = Math.min(...data);
const currentValue = data[data.length - 1];

// Create the chart
const myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],  // X-axis labels
        datasets: [{
            label: 'Dataset',
            data: data,      // Y-axis data points
            borderColor: 'rgba(255, 99, 132, 1)',  // Red line color
            borderWidth: 2.5,                 // Line thickness
            tension: 0,                   // Slightly curved line
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',  // Red color for points
            pointBorderColor: 'rgba(255, 99, 132, 1)',      // Point border color same as line
            pointRadius: 2,                 // Point size
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,         // Allow chart to resize
        scales: {
            x: {
                grid: {
                    display: false,         // Hide vertical grid lines
                },
                ticks: {
                    color: '#333',          // Darker label color
                }
            },
            y: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',  // Light horizontal grid lines
                },
                ticks: {
                    color: '#444',          // Darker label color
                },
                beginAtZero: true           // Start Y-axis from zero
            }
        },
        plugins: {
            legend: {
                display: false,             // Hide the legend
            }
        },
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 20,
                bottom: 20
            }
        }
    }
});

// Update the highest value in the HTML
document.querySelector('.highestValue').textContent = `${highestValue} mg/dl`;
document.querySelector('.lowestValue').textContent = `${lowestValue} mg/dl`;
document.querySelector('.currentValue').textContent = `${currentValue} mg/dl`;



