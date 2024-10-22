const ctx = document.getElementById('myLineChart').getContext('2d');

// Load saved data from localStorage
window.onload = function () {
  const savedHeight = localStorage.getItem('height');
  const savedWeight = localStorage.getItem('weight');
  const savedSugar = localStorage.getItem('sugar');
  const sugarHistory = JSON.parse(localStorage.getItem('sugarHistory')) || [];

  if (savedHeight) {
    heightInfo.textContent = savedHeight;
  }

  if (savedWeight) {
    weightInfo.textContent = savedWeight;
  }

  if (savedSugar) {
    sugarInfo.textContent = savedSugar;
  }

  // Populate the chart with saved sugar history
  updateChart(sugarHistory, 'perDetik');  // Default interval is 'perDetik'
};

// Initial data and labels for the chart
let sugarHistory = JSON.parse(localStorage.getItem('sugarHistory')) || [];

// Update the chart with new data and recalculate the highest, lowest, and current values
function updateChart(sugarHistory, interval) {
  let processedData;
  
  // If "perDetik" is selected, plot each data point without aggregation
  if (interval === 'perDetik') {
    processedData = sugarHistory.map(entry => ({
      label: new Date(entry.time).toLocaleTimeString(),
      value: entry.value
    }));
  } else {
    processedData = groupDataByInterval(sugarHistory, interval);
  }

  const labels = processedData.map(item => item.label);
  const data = processedData.map(item => item.value);

  // Update chart labels and data
  myLineChart.data.labels = labels;
  myLineChart.data.datasets[0].data = data;
  myLineChart.update();

  // Recalculate the highest, lowest, and current values
  let highestValue = Math.max(...data);
  let lowestValue = Math.min(...data);
  let currentValue = data[data.length - 1];

  // Update the HTML
  document.querySelector('.highestValue').textContent = `${highestValue} mg/dl`;
  document.querySelector('.lowestValue').textContent = `${lowestValue} mg/dl`;
  document.querySelector('.currentValue').textContent = `${currentValue} mg/dl`;
}

// Group data by the selected time interval and calculate the average for each group
function groupDataByInterval(sugarHistory, interval) {
  let groupedData = {};

  sugarHistory.forEach(entry => {
    let date = new Date(entry.time);
    let label;

    switch (interval) {
      case 'perMenit':
        label = `${date.getHours()}:${date.getMinutes()}`;
        break;
      case 'perJam':
        label = `${date.getHours()}:00`;
        break;
      case 'perHari':
        label = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        break;
      case 'perBulan':
        label = `${date.getFullYear()}-${date.getMonth() + 1}`;
        break;
      default:
        label = `${date.getHours()}:${date.getMinutes()}`;
        break;
    }

    if (!groupedData[label]) {
      groupedData[label] = [];
    }

    groupedData[label].push(entry.value);
  });

  // Calculate the average for each time group
  let result = Object.keys(groupedData).map(label => {
    let sum = groupedData[label].reduce((a, b) => a + b, 0);
    let average = sum / groupedData[label].length;
    return { label: label, value: average };
  });

  return result;
}

// Create the chart
let myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],  // X-axis labels will be updated dynamically
    datasets: [{
      label: 'Kadar Gula Darah',
      data: [],  // Y-axis data points will be updated dynamically
      borderColor: 'rgba(255, 99, 132, 1)',  // Red line color
      borderWidth: 2.5,                 // Line thickness
      tension: 0,                       // Straight line
      pointBackgroundColor: 'rgba(255, 99, 132, 1)',  // Red color for points
      pointBorderColor: 'rgba(255, 99, 132, 1)',      // Point border color same as line
      pointRadius: 2,                   // Point size
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,         // Allow chart to resize
    scales: {
      x: {
        grid: {
          display: false,               // Hide vertical grid lines
        },
        ticks: {
          color: '#333',                // Darker label color
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',  // Light horizontal grid lines
        },
        ticks: {
          color: '#444',                // Darker label color
        },
        beginAtZero: true               // Start Y-axis from zero
      }
    },
    plugins: {
      legend: {
        display: false,                 // Hide the legend
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

// Add click event listener to toggle between edit and save
const editButton = document.getElementById('editButton');
const heightInfo = document.getElementById('heightInfo');
const weightInfo = document.getElementById('weightInfo');
const sugarInfo = document.getElementById('sugarInfo');

editButton.addEventListener('click', function () {
  const isEditable = heightInfo.getAttribute('contenteditable') === 'true';

  if (isEditable) {
    // Change contenteditable to false (save mode)
    heightInfo.setAttribute('contenteditable', 'false');
    weightInfo.setAttribute('contenteditable', 'false');
    sugarInfo.setAttribute('contenteditable', 'false');
    editButton.innerText = 'Edit';

    // Save the data to localStorage
    const currentSugar = parseFloat(sugarInfo.textContent);
    const currentTime = new Date().toISOString();

    localStorage.setItem('height', heightInfo.textContent);
    localStorage.setItem('weight', weightInfo.textContent);
    localStorage.setItem('sugar', sugarInfo.textContent);

    // Add sugar level and timestamp to sugarHistory
    sugarHistory.push({ value: currentSugar, time: currentTime });
    localStorage.setItem('sugarHistory', JSON.stringify(sugarHistory));

    // Update the chart with the new sugar data
    const selectedInterval = document.getElementById('timeInterval').value;
    updateChart(sugarHistory, selectedInterval);

    alert('Data saved to localStorage!');
  } else {
    // Change contenteditable to true (edit mode)
    heightInfo.setAttribute('contenteditable', 'true');
    weightInfo.setAttribute('contenteditable', 'true');
    sugarInfo.setAttribute('contenteditable', 'true');
    editButton.innerText = 'Save';
  }
});

// Add event listener to update chart based on selected time interval
document.getElementById('timeInterval').addEventListener('change', function () {
  const selectedInterval = this.value;
  updateChart(sugarHistory, selectedInterval);
});
