document.querySelectorAll('.add').forEach((button, index) => {
    button.addEventListener('click', () => {
      // Ambil judul dan gula dari DOM
      const card = button.closest('.card');
      const title = card.querySelector('.name p').textContent;
      const sugar = card.querySelector('.gula .bawah p').textContent.split(" ")[0]; // Hanya ambil angka gula
  
      // Simpan dalam format objek
      const recipe = { title, sugar };
  
      let selectedRecipes = JSON.parse(localStorage.getItem('selectedRecipes')) || [];
      selectedRecipes.push(recipe);
      localStorage.setItem('selectedRecipes', JSON.stringify(selectedRecipes));
      alert('Resep berhasil ditambahkan!');
    });
  });
  