const ctx = document.getElementById('myLineChart').getContext('2d');

// Load saved data from localStorage
window.onload = function () {
  const savedHeight = localStorage.getItem('height');
  const savedWeight = localStorage.getItem('weight');
  const savedSugar = localStorage.getItem('sugar');
  const sugarHistory = JSON.parse(localStorage.getItem('sugarHistory')) || [];
  const weightHistory = JSON.parse(localStorage.getItem('weightHistory')) || [];
  const bmiHistory = JSON.parse(localStorage.getItem('bmiHistory')) || [];

  let heightBmi = JSON.parse(localStorage.getItem('height'))
  let weightBmi = JSON.parse(localStorage.getItem('weight'))
  let heightdiv = document.getElementById("BmiHeight")
  let weightdiv = document.getElementById("BmiWeight")


  if(heightBmi){
    heightdiv.innerHTML = `${heightBmi} cm`;
  }

  if(weightBmi){
    weightdiv.innerHTML = `${weightBmi} kg`;
  }

  if (savedHeight) {
    heightInfo.textContent = savedHeight;
  }

  if (savedWeight) {
    weightInfo.textContent = savedWeight;
  }

  if (savedSugar) {
    sugarInfo.textContent = savedSugar;
  }

  // Populate the chart with saved data
  updateChart(sugarHistory, weightHistory, bmiHistory, 'Day');  // Default view is 'Day'
  calculateBMI();
};

// Initial data and labels for the chart
let sugarHistory = JSON.parse(localStorage.getItem('sugarHistory')) || [];
let weightHistory = JSON.parse(localStorage.getItem('weightHistory')) || [];
let bmiHistory = JSON.parse(localStorage.getItem('bmiHistory')) || [];

// Update the chart with new data and recalculate the highest, lowest, and current values
function updateChart(sugarHistory, weightHistory, bmiHistory, viewType) {
  let processedSugarData, processedWeightData, processedBmiData;

  // Filter and group data by selected time interval
  if (viewType === 'Day') {
    processedSugarData = groupDataByInterval(sugarHistory, 'perMenit');
    processedWeightData = groupDataByInterval(weightHistory, 'perMenit');
    processedBmiData = groupDataByInterval(bmiHistory, 'perMenit');
  } else if (viewType === 'Week') {
    processedSugarData = groupDataByInterval(sugarHistory, 'perHari');
    processedWeightData = groupDataByInterval(weightHistory, 'perHari');
    processedBmiData = groupDataByInterval(bmiHistory, 'perHari');
  } else if (viewType === 'Month') {
    processedSugarData = groupDataByInterval(sugarHistory, 'perHari');
    processedWeightData = groupDataByInterval(weightHistory, 'perHari');
    processedBmiData = groupDataByInterval(bmiHistory, 'perHari');
  }

  const labels = processedSugarData.map(item => item.label);
  const sugarData = processedSugarData.map(item => item.value);
  const weightData = processedWeightData.map(item => item.value);
  const bmiData = processedBmiData.map(item => item.value);

  // **Update chart labels and data for all datasets**
  myLineChart.data.labels = labels;
  myLineChart.data.datasets[0].data = sugarData;
  myLineChart.data.datasets[1].data = weightData;
  myLineChart.data.datasets[2].data = bmiData;
  myLineChart.update();

  // **Recalculate the highest, lowest, and current values for sugar**
  if (sugarHistory.length > 0) {
    const allSugarData = sugarHistory.map(entry => entry.value || 0); // Default to 0 if entry.value is missing or falsy
    const highestSugarValue = Math.max(...allSugarData);
    const lowestSugarValue = Math.min(...allSugarData);
    const currentSugarValue = allSugarData[allSugarData.length - 1];

    // **Update the HTML for sugar**
    document.querySelector('.highestValue').textContent = `${highestSugarValue} mg/dl`;
    document.querySelector('.lowestValue').textContent = `${lowestSugarValue} mg/dl`;
    document.querySelector('.currentValue').textContent = `${currentSugarValue} mg/dl`;
  } else {
    // Set default values if no data is available
    document.querySelector('.highestValue').textContent = "No Data";
    document.querySelector('.lowestValue').textContent = "No Data";
    document.querySelector('.currentValue').textContent = "No Data";
  }
}



// Group data by the selected time interval and calculate the average for each group
function groupDataByInterval(dataHistory, interval) {
  let groupedData = {};

  dataHistory.forEach(entry => {
    let date = new Date(entry.time);
    let label;

    switch (interval) {
      case 'perMenit':
        label = `${date.getHours()}:${date.getMinutes()}`;
        break;
      case 'perHari':
        label = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
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

// Create the chart with three datasets (sugar, weight, BMI)
let myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],  // X-axis labels will be updated dynamically
    datasets: [{
      label: 'Kadar Gula Darah',
      data: [],  // Y-axis data points for sugar
      borderColor: 'rgba(255, 99, 132, 1)',  // Red line color
      borderWidth: 2.5,                 // Line thickness
      tension: 0,                       // Straight line
      pointBackgroundColor: 'rgba(255, 99, 132, 1)',  // Red color for points
      pointRadius: 2,                   // Point size
    },
    {
      label: 'Berat Badan',
      data: [],  // Y-axis data points for weight
      borderColor: 'rgba(54, 162, 235, 1)',  // Blue line color
      borderWidth: 2.5,
      tension: 0,
      pointBackgroundColor: 'rgba(54, 162, 235, 1)',  // Blue color for points
      pointRadius: 2,
    },
    {
      label: 'BMI',
      data: [],  // Y-axis data points for BMI
      borderColor: 'rgba(75, 192, 192, 1)',  // Green line color
      borderWidth: 2.5,
      tension: 0,
      pointBackgroundColor: 'rgba(75, 192, 192, 1)',  // Green color for points
      pointRadius: 2,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,  // Hide vertical grid lines
        },
        ticks: {
          color: '#333',
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',  // Light horizontal grid lines
        },
        ticks: {
          color: '#444',
        },
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        display: true,  // Show the legend
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

function calculateBMI() {
  const height = parseFloat(localStorage.getItem('height')) || 161;
  const weight = parseFloat(localStorage.getItem('weight')) || 55.9;
  const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

  // Update the BMI value and category
  const bmiIndicator = document.getElementById('bmiIndicator');
  const bmiValue = document.getElementById('bmiValue');
  const bmiCategory = document.getElementById('bmiCategory');

  bmiValue.innerText = bmi;

  let bmiPosition = 0;  // Position in %
  if ( bmi >= 10 && bmi < 18.5) {
    bmiPosition = 0.925*(bmi)  // Scale 10-18.5
    bmiCategory.innerText = "Underweight";
    bmiCategory.style.color = "#005693";
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiPosition = (1.08 * bmi) + (0.925*18.5) + 0.075;  // Scale 18.5-25
    bmiCategory.innerText = "Healthy";
    bmiCategory.style.color = "#00650d";
  } else if (bmi >= 25 && bmi < 30) {
    bmiPosition = 44.2 + ((bmi - 25)*3.665)
    bmiCategory.innerText = "Overweight";
    bmiCategory.style.color = "#a2ab00";
  } else if (bmi >= 30 && bmi < 35) {
    bmiPosition = 62.525 + ((bmi - 30)*3.659)
    bmiCategory.innerText = "Obese";
    bmiCategory.style.color = "#c07301";
  } else if(bmi >= 35 && bmi < 40){
    bmiPosition = 80.82 + ((bmi - 35)*3.556)
    bmiCategory.innerText = "Severely Obese";
    bmiCategory.style.color = "#c00101";
  }

  bmiIndicator.style.left = `${bmiPosition}%`;  // Move indicator on scale
}

// Add click event listeners for the buttons
document.getElementById('dayButton').addEventListener('click', function () {
  updateChart(sugarHistory, weightHistory, bmiHistory, 'Day');
});

document.getElementById('weekButton').addEventListener('click', function () {
  updateChart(sugarHistory, weightHistory, bmiHistory, 'Week');
});

document.getElementById('monthButton').addEventListener('click', function () {
  updateChart(sugarHistory, weightHistory, bmiHistory, 'Month');
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
    const currentWeight = parseFloat(weightInfo.textContent);
    const currentHeight = parseFloat(heightInfo.textContent);
    const currentTime = new Date().toISOString();

    localStorage.setItem('height', heightInfo.textContent);
    localStorage.setItem('weight', weightInfo.textContent);
    localStorage.setItem('sugar', sugarInfo.textContent);

    // **Calculate BMI**
    const bmi = currentWeight / ((currentHeight / 100) ** 2);

    // Add sugar, weight, and BMI to history arrays
    sugarHistory.push({ value: currentSugar, time: currentTime });
    weightHistory.push({ value: currentWeight, time: currentTime });
    bmiHistory.push({ value: bmi, time: currentTime });

    localStorage.setItem('sugarHistory', JSON.stringify(sugarHistory));
    localStorage.setItem('weightHistory', JSON.stringify(weightHistory));
    localStorage.setItem('bmiHistory', JSON.stringify(bmiHistory));

    // **Update the chart with the new data**
    updateChart(sugarHistory, weightHistory, bmiHistory, 'Day');

    alert('Data saved to localStorage and chart updated!');
    let heightBmi = JSON.parse(localStorage.getItem('height'))
    let weightBmi = JSON.parse(localStorage.getItem('weight'))
    let heightdiv = document.getElementById("BmiHeight")
    let weightdiv = document.getElementById("BmiWeight")
    heightdiv.innerHTML = `${heightBmi} cm`;
    weightdiv.innerHTML = `${weightBmi} kg`;
    calculateBMI();
  } else {
    // Change contenteditable to true (edit mode)
    heightInfo.setAttribute('contenteditable', 'true');
    weightInfo.setAttribute('contenteditable', 'true');
    sugarInfo.setAttribute('contenteditable', 'true');
    editButton.innerText = 'Save';
  }
});

