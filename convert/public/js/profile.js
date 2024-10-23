document.addEventListener('DOMContentLoaded', function() {
    console.log("profile.js is loaded!");

    const storedName = localStorage.getItem('name');
    const storedGender = localStorage.getItem('gender');
    const storedHeight = localStorage.getItem('height');
    const storedWeight = localStorage.getItem('weight');
    const saveBtn = document.getElementById('save-btn');
    const inputs = document.querySelectorAll('input');
    const popup = document.getElementById('popup');
    const noBtn = document.getElementById('noBtn');
    const yesBtn = document.getElementById('yesBtn');

    if (storedName) {
        document.getElementById('User').value = storedName;
    }

    if (storedGender) {
        document.querySelector(`input[name="gender"][value="${storedGender}"]`).checked = true;
    }

    if (storedHeight) {
        document.getElementById('height').value = storedHeight;
    }

    if (storedWeight) {
        document.getElementById('weight').value = storedWeight;
    }

    inputs.forEach(input => {
        input.addEventListener('input', function() {
            console.log('Input changed, showing save button');
            document.querySelector('.save').style.display = 'block';
        });
    });

    saveBtn.addEventListener('click', function() {
        const name = document.getElementById('User').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const height = document.getElementById('height').value;
        const weight = document.getElementById('weight').value;

        localStorage.setItem('name', name);
        localStorage.setItem('gender', gender);
        localStorage.setItem('height', height);
        localStorage.setItem('weight', weight);

        document.querySelector('.save').style.display = 'none';

        alert("Data berhasil disimpan!");
    });

    const deleteBtn = document.querySelector('.delete button');
    deleteBtn.addEventListener('click', function() {
        popup.classList.remove('hidden');
    });

    noBtn.addEventListener('click', function() {
        popup.classList.add('hidden');
    });

    yesBtn.addEventListener('click', function() {
        localStorage.removeItem('name');
        localStorage.removeItem('gender');
        localStorage.removeItem('height');
        localStorage.removeItem('weight');

        document.getElementById('User').value = '';
        document.querySelectorAll('input[name="gender"]').forEach(input => input.checked = false);
        document.getElementById('height').value = '';
        document.getElementById('weight').value = '';

        alert("Akun berhasil dihapus!");
        window.location.href = '/';
    });
});
