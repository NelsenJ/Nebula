const ctx = document.getElementById('myLineChart').getContext('2d');

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

  updateChart(sugarHistory, weightHistory, bmiHistory, 'Day');
  calculateBMI();
};

let sugarHistory = JSON.parse(localStorage.getItem('sugarHistory')) || [];
let weightHistory = JSON.parse(localStorage.getItem('weightHistory')) || [];
let bmiHistory = JSON.parse(localStorage.getItem('bmiHistory')) || [];

function updateChart(sugarHistory, weightHistory, bmiHistory, viewType) {
  let processedSugarData, processedWeightData, processedBmiData;

  if (viewType === 'Day') {
    processedSugarData = groupDataByInterval(sugarHistory, 'perMenit');
    processedWeightData = groupDataByInterval(weightHistory, 'perMenit');
    processedBmiData = groupDataByInterval(bmiHistory, 'perMenit');
    dayButton.style.backgroundColor = '#ffc6a7'
    weekButton.style.backgroundColor = '#fffaf0'
    monthButton.style.backgroundColor = '#fffaf0'
  } else if (viewType === 'Week') {
    processedSugarData = groupDataByInterval(sugarHistory, 'perHari');
    processedWeightData = groupDataByInterval(weightHistory, 'perHari');
    processedBmiData = groupDataByInterval(bmiHistory, 'perHari');
    dayButton.style.backgroundColor = '#fffaf0'
    weekButton.style.backgroundColor = '#ffc6a7'
    monthButton.style.backgroundColor = '#fffaf0'
  } else if (viewType === 'Month') {
    processedSugarData = groupDataByInterval(sugarHistory, 'perHari');
    processedWeightData = groupDataByInterval(weightHistory, 'perHari');
    processedBmiData = groupDataByInterval(bmiHistory, 'perHari');
    dayButton.style.backgroundColor = '#fffaf0'
    weekButton.style.backgroundColor = '#fffaf0'
    monthButton.style.backgroundColor = '#ffc6a7'
  }

  const labels = processedSugarData.map(item => item.label);
  const sugarData = processedSugarData.map(item => item.value);
  const weightData = processedWeightData.map(item => item.value);
  const bmiData = processedBmiData.map(item => item.value);

  myLineChart.data.labels = labels;
  myLineChart.data.datasets[0].data = sugarData;
  myLineChart.data.datasets[1].data = weightData;
  myLineChart.data.datasets[2].data = bmiData;
  myLineChart.update();


  if (sugarHistory.length > 0) {
    const allSugarData = sugarHistory.map(entry => entry.value || 0);
    const highestSugarValue = Math.max(...allSugarData);
    const lowestSugarValue = Math.min(...allSugarData);
    const currentSugarValue = allSugarData[allSugarData.length - 1];

    document.querySelector('.highestValue').textContent = `${highestSugarValue} mg/dl`;
    document.querySelector('.lowestValue').textContent = `${lowestSugarValue} mg/dl`;
    document.querySelector('.currentValue').textContent = `${currentSugarValue} mg/dl`;
  } else {
    document.querySelector('.highestValue').textContent = "No Data";
    document.querySelector('.lowestValue').textContent = "No Data";
    document.querySelector('.currentValue').textContent = "No Data";
  }
}



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

  let result = Object.keys(groupedData).map(label => {
    let sum = groupedData[label].reduce((a, b) => a + b, 0);
    let average = sum / groupedData[label].length;
    return { label: label, value: average };
  });

  return result;
}

let myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Kadar Gula Darah',
      data: [],
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 2.5,                 
      tension: 0,                       
      pointBackgroundColor: 'rgba(255, 99, 132, 1)',
      pointRadius: 2,                   
    },
    {
      label: 'Berat Badan',
      data: [],
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 2.5,
      tension: 0,
      pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      pointRadius: 2,
    },
    {
      label: 'BMI',
      data: [],
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 2.5,
      tension: 0,
      pointBackgroundColor: 'rgba(75, 192, 192, 1)',
      pointRadius: 2,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#333',
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          color: '#444',
        },
        beginAtZero: true
      }
    },
    plugins: {
      legend: {
        position: 'bottom',
        display: true,
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

  const bmiIndicator = document.getElementById('bmiIndicator');
  const bmiValue = document.getElementById('bmiValue');
  const bmiCategory = document.getElementById('bmiCategory');

  bmiValue.innerText = bmi;

  let bmiPosition = 0;
  if ( bmi >= 10 && bmi < 18.5) {
    bmiPosition = 0.925*(bmi)
    bmiCategory.innerText = "Berat badan kamu kurang dari rentang ideal";
    bmiCategory.style.color = "#005693";
  } else if (bmi >= 18.5 && bmi < 25) {
    bmiPosition = (1.08 * bmi) + (0.925*18.5) + 0.075;
    bmiCategory.innerText = "Kamu memiliki berat badan yang sesuai.";
    bmiCategory.style.color = "#00650d";
  } else if (bmi >= 25 && bmi < 30) {
    bmiPosition = 44.2 + ((bmi - 25)*3.665)
    bmiCategory.innerText = "Berat badan kamu sedikit melebihi rentang ideal.";
    bmiCategory.style.color = "#a2ab00";
  } else if (bmi >= 30 && bmi < 35) {
    bmiPosition = 62.525 + ((bmi - 30)*3.659)
    bmiCategory.innerText = "Berat badan kamu melebihi rentang ideal.";
    bmiCategory.style.color = "#c07301";
  } else if(bmi >= 35 && bmi < 40){
    bmiPosition = 80.82 + ((bmi - 35)*3.556)
    bmiCategory.innerText = "Berat badan kamu jauh melebihi rentang ideal.";
    bmiCategory.style.color = "#c00101";
  }else if(bmi < 10 && bmi > 0){
    bmiCategory.innerText = "BMI anda sangat rendah";
    bmiCategory.style.color = "#005693";
  }else if(bmi > 40 && bmi < 100){
    bmiPosition = 100;
    bmiCategory.innerText = "Berat badan kamu dalam kategori obesitas parah";
    bmiCategory.style.color = "#c00101";
  }else{
    bmiIndicator.style.display = "none";
    bmiCategory.innerText = "BMI tidak valid";
    bmiCategory.style.color = "#000";
  }

  bmiIndicator.style.left = `${bmiPosition}%`;
}

const dayButton = document.getElementById('dayButton');
const weekButton = document.getElementById('weekButton');
const monthButton = document.getElementById('monthButton');

document.getElementById('dayButton').addEventListener('click', function () {
  updateChart(sugarHistory, weightHistory, bmiHistory, 'Day');
});

document.getElementById('weekButton').addEventListener('click', function () {
  updateChart(sugarHistory, weightHistory, bmiHistory, 'Week');
});

document.getElementById('monthButton').addEventListener('click', function () {
  updateChart(sugarHistory, weightHistory, bmiHistory, 'Month');
});

const editButton = document.getElementById('editButton');
const heightInfo = document.getElementById('heightInfo');
const weightInfo = document.getElementById('weightInfo');
const sugarInfo = document.getElementById('sugarInfo');

editButton.addEventListener('click', function () {
  const isEditable = heightInfo.getAttribute('contenteditable') === 'true';

  if (isEditable) {
    heightInfo.setAttribute('contenteditable', 'false');
    weightInfo.setAttribute('contenteditable', 'false');
    sugarInfo.setAttribute('contenteditable', 'false');
    editButton.innerText = 'Edit';
    editButton.style.color ='Red';

    const currentSugar = parseFloat(sugarInfo.textContent);
    const currentWeight = parseFloat(weightInfo.textContent);
    const currentHeight = parseFloat(heightInfo.textContent);
    const currentTime = new Date().toISOString();

    localStorage.setItem('height', heightInfo.textContent);
    localStorage.setItem('weight', weightInfo.textContent);
    localStorage.setItem('sugar', sugarInfo.textContent);

    const bmi = currentWeight / ((currentHeight / 100) ** 2);

    sugarHistory.push({ value: currentSugar, time: currentTime });
    weightHistory.push({ value: currentWeight, time: currentTime });
    bmiHistory.push({ value: bmi, time: currentTime });

    localStorage.setItem('sugarHistory', JSON.stringify(sugarHistory));
    localStorage.setItem('weightHistory', JSON.stringify(weightHistory));
    localStorage.setItem('bmiHistory', JSON.stringify(bmiHistory));

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
    heightInfo.setAttribute('contenteditable', 'true');
    weightInfo.setAttribute('contenteditable', 'true');
    sugarInfo.setAttribute('contenteditable', 'true');
    editButton.innerText = 'Save';
    editButton.style.color ='#00b007';
  }
  calculateBMI();
});

