document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('User').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const height = document.getElementById('height').value;
    const weight = document.getElementById('weight').value;

    localStorage.setItem('name', name);
    localStorage.setItem('gender', gender);
    localStorage.setItem('height', height);
    localStorage.setItem('weight', weight);

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            gender: gender,
            height: height,
            weight: weight
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        alert('Data successfully sent to MongoDB and session created!');
        window.location.href = '/home';
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Error submitting the form');
    });
});

window.addEventListener('DOMContentLoaded', () => {
    const storedName = localStorage.getItem('name');
    const storedGender = localStorage.getItem('gender');
    const storedHeight = localStorage.getItem('height');
    const storedWeight = localStorage.getItem('weight');

    if (storedName) document.getElementById('User').value = storedName;
    if (storedGender) document.querySelector(`input[value="${storedGender}"]`).checked = true;
    if (storedHeight) document.getElementById('height').value = storedHeight;
    if (storedWeight) document.getElementById('weight').value = storedWeight;
});
