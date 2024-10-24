document.addEventListener('DOMContentLoaded', function() {
    console.log("profile.js is loaded!");

    // Load saved data from localStorage
    const storedName = localStorage.getItem('name');
    const storedGender = localStorage.getItem('gender');
    const storedHeight = localStorage.getItem('height');
    const storedWeight = localStorage.getItem('weight');
    const storedDate = localStorage.getItem('date');
    const storedAvatar = localStorage.getItem('avatar');

    // DOM Elements
    const saveBtn = document.getElementById('save-btn');
    const inputs = document.querySelectorAll('input');
    const avatar = document.getElementById('avatar');
    const fileInput = document.getElementById('file-input');

    // Helper function to set default avatar based on gender
    const setDefaultAvatar = (gender) => {
        if (gender === 'male') {
            avatar.style.backgroundImage = 'url(/images/profile/boy.png)';
        } else {
            avatar.style.backgroundImage = 'url(/images/profile/female.png)';
        }
    };

    // Populate the form with stored values if available
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

    // If avatar exists in localStorage, use it, otherwise use default avatar based on gender
    if (storedAvatar) {
        avatar.style.backgroundImage = `url(${storedAvatar})`;
    } else if (storedGender) {
        setDefaultAvatar(storedGender);
    }

    // Handle avatar change
    document.getElementById('change-avatar').addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            const avatarUrl = e.target.result;
            avatar.style.backgroundImage = `url(${avatarUrl})`; // Update avatar in the UI
            localStorage.setItem('avatar', avatarUrl); // Save avatar in localStorage
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    });

    // Track input changes and make the Save button visible
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            document.querySelector('.save').style.display = 'block';
        });
    });

    // Save profile data to localStorage when Save button is clicked
    saveBtn.addEventListener('click', function() {
        const name = document.getElementById('User').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const height = document.getElementById('height').value;
        const weight = document.getElementById('weight').value;
        const date = document.getElementById('birthDate').value;

        // Save the updated profile data to localStorage
        localStorage.setItem('name', name);
        localStorage.setItem('gender', gender);
        localStorage.setItem('height', height);
        localStorage.setItem('weight', weight);
        localStorage.setItem('date', date);

        // If no avatar was selected, set the default avatar based on the gender
        if (!localStorage.getItem('avatar')) {
            setDefaultAvatar(gender);
        }

        // Hide save button again after saving
        document.querySelector('.save').style.display = 'none';
    });
});
