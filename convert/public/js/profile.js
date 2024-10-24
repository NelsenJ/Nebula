document.addEventListener('DOMContentLoaded', function() {
    console.log("profile.js is loaded!");

    const storedName = localStorage.getItem('name');
    const storedGender = localStorage.getItem('gender');
    const storedHeight = localStorage.getItem('height');
    const storedWeight = localStorage.getItem('weight');
    const storedDate = localStorage.getItem('date');
    const storedAvatar = localStorage.getItem('avatar');

    const saveBtn = document.getElementById('save-btn');
    const inputs = document.querySelectorAll('input');
    const avatar = document.getElementById('avatar');
    const fileInput = document.getElementById('file-input');

    const setDefaultAvatar = (gender) => {
        if (gender === 'male') {
            avatar.style.backgroundImage = 'url(/images/profile/boy.png)';
        } else {
            avatar.style.backgroundImage = 'url(/images/profile/female.png)';
        }
    };

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

    if (storedDate) {
        document.getElementById('birthDate').value = storedDate;
    }

    if (storedAvatar) {
        avatar.style.backgroundImage = `url(${storedAvatar})`;
    } else if (storedGender) {
        setDefaultAvatar(storedGender);
    }

    document.getElementById('change-avatar').addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const avatarUrl = e.target.result;
            avatar.style.backgroundImage = `url(${avatarUrl})`;
            localStorage.setItem('avatar', avatarUrl);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    });

    inputs.forEach(input => {
        input.addEventListener('input', function() {
            document.querySelector('.save').style.display = 'block';
        });
    });

    saveBtn.addEventListener('click', function() {
        const name = document.getElementById('User').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const height = document.getElementById('height').value;
        const weight = document.getElementById('weight').value;
        const date = document.getElementById('birthDate').value;

        localStorage.setItem('name', name);
        localStorage.setItem('gender', gender);
        localStorage.setItem('height', height);
        localStorage.setItem('weight', weight);
        localStorage.setItem('date', date);

        if (!localStorage.getItem('avatar')) {
            setDefaultAvatar(gender);
        }

        document.querySelector('.save').style.display = 'none';
    });
});
