function addNewBook(newBook) {
  let books = JSON.parse(localStorage.getItem('books')) || [];

  
  books.unshift(newBook);

  
  if (books.length > 6) {
    books.pop(); 
  }

  
  localStorage.setItem('books', JSON.stringify(books));
}


function loadBooks() {
  let books = JSON.parse(localStorage.getItem('books')) || [];

  
  const forYouCarousel = document.querySelector('.carousel-inner');
  const newArrivalsSection = document.querySelector('.arrival-cards');

  
  forYouCarousel.innerHTML = '';
  newArrivalsSection.innerHTML = '';

  
  const reversedBooks = books.slice().reverse();  

  
  reversedBooks.forEach(book => {
    const bookCardForYou = `
      <a href="book-details.html?title=${encodeURIComponent(book.title)}" class="card">
        <img src="${book.cover}" alt="${book.title}">
        <h3 class="card-title">${book.title}</h3>
        <p class="author">By ${book.author}</p>
      </a>
    `;
    forYouCarousel.innerHTML += bookCardForYou;
  });

  
  reversedBooks.slice(0, 6).forEach(book => {
    const bookCardNewArrivals = `
      <a href="book-details.html?title=${encodeURIComponent(book.title)}" class="book-card" style="text-decoration: none;">
        <img src="${book.cover}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>$${parseFloat(book.price).toFixed(2)}</p>
      </a>
    `;
    newArrivalsSection.innerHTML += bookCardNewArrivals;
  });
}


window.onload = loadBooks;
