// Function to show the corresponding section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');  // Hide all sections
    });
    document.getElementById(sectionId).classList.add('active');  // Show the selected section
}

// Ensure that the Book Management section is shown by default when the page loads
document.addEventListener('DOMContentLoaded', function() {
    showSection('books');  // Show the Book Management section by default
});

// Authors Management
function displayAuthors() {
    const authors = loadData('authors');
    const authorList = document.getElementById('author-list');
    authorList.innerHTML = authors.map((author, index) =>
        `<div class="book-card">${author} 
            <button class="btn-edit" onclick="editAuthor(${index})">Edit</button> 
            <button class="btn-delete" onclick="deleteAuthor(${index})">Delete</button>
        </div>`).join('');
    populateAuthorDropdown();
    displayStats();
}

function addAuthor() {
    const newAuthor = document.getElementById('new-author').value.trim();
    if (newAuthor) {
        const authors = loadData('authors');
        authors.push(newAuthor);
        saveData('authors', authors);
        displayAuthors();
        document.getElementById('new-author').value = '';
    }
}

function deleteAuthor(index) {
    const authors = loadData('authors');
    authors.splice(index, 1);
    saveData('authors', authors);
    displayAuthors();
}

function editAuthor(index) {
    const authors = loadData('authors');
    const newName = prompt("Edit author name:", authors[index]);
    if (newName) {
        authors[index] = newName;
        saveData('authors', authors);
        displayAuthors();
    }
}

function populateAuthorDropdown() {
    const authors = loadData('authors');
    const authorDropdown = document.getElementById('book-author');
    authorDropdown.innerHTML = authors.map(author => `<option value="${author}">${author}</option>`).join('');
}

// Add a new book
function addBook() {
    const bookTitle = document.getElementById('book-title').value;
    const bookAuthor = document.getElementById('book-author').value;
    const bookPrice = document.getElementById('book-price').value;
    const bookType = document.getElementById('book-type').value;
    const bookCover = document.getElementById('book-cover').value;

    const books = loadData('books');
    books.push({ title: bookTitle, author: bookAuthor, price: bookPrice, type: bookType, cover: bookCover });
    saveData('books', books);
    displayBooks();
    displayStats();
    document.getElementById('success-message').style.display = 'block'; // Show success message

    // Clear the form
    document.getElementById('add-book-form').reset();
    setTimeout(() => document.getElementById('success-message').style.display = 'none', 3000);
}

function displayBooks() {
    const books = loadData('books');
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = books.map((book, index) => `
        <div class="book-card">
            <img src="${book.cover}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>By ${book.author}</p>
            <p>${book.type}</p>
            <p>$${book.price}</p>
            <button class="btn-edit" onclick="editBook(${index})">Edit</button>
            <button class="btn-delete" onclick="deleteBook(${index})">Delete</button>
        </div>
    `).join('');
}

function editBook(index) {
    const books = loadData('books');
    const book = books[index];
    const newTitle = prompt("Edit book title:", book.title);
    const newPrice = prompt("Edit book price:", book.price);
    if (newTitle && newPrice) {
        book.title = newTitle;
        book.price = newPrice;
        saveData('books', books);
        displayBooks();
    }
}

function deleteBook(index) {
    const books = loadData('books');
    books.splice(index, 1);
    saveData('books', books);
    displayBooks();
    displayStats();
}

// Statistics Page
// Function to display statistics (Total Books and Total Authors)
function displayStats() {
    const books = loadData('books');  // Assume this function loads book data
    const authors = loadData('authors');  // Assume this function loads author data

    // Display total number of books
    document.getElementById('total-books').innerText = books.length;
    document.getElementById('total-authors').innerText = authors.length;

    // Display books in the "Total Books" section
    const booksContainer = document.getElementById('books-container');
    booksContainer.innerHTML = books.map(book => `
        <div class="book-card">
            <img src="${book.cover}" alt="${book.title}">
            <h5>${book.title}</h5>
        </div>
    `).join('');

    // Display authors and their books in the "Total Authors" section
    const authorsContainer = document.getElementById('authors-container');
    authorsContainer.innerHTML = authors.map(author => {
        // Get the books for this author
        const authorBooks = books.filter(book => book.author === author);

        if (authorBooks.length > 0) {
            return `
                <div class="author-card">
                    <h5>${author}</h5>
                    <div class="book-grid">
                        ${authorBooks.map(book => `
                            <div class="book-card">
                                <img src="${book.cover}" alt="${book.title}">
                                <h5>${book.title}</h5>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        return ''; // If no books, return an empty string
    }).join('');
}

// Call the function to initialize the statistics view on the statistics page
displayStats();

function displaySales() {
    const salesData = loadData('sales');
    const salesList = document.getElementById('sales-list');
    salesList.innerHTML = salesData.map((sale, index) => `
        <div class="sales-card">
            <h4>User: ${sale.user}</h4>
            <div class="purchased-books">
                ${sale.books.map(book => `
                    <div class="book-item">
                        <img src="${book.cover}" alt="${book.title}" class="book-image">
                        <h5>${book.title}</h5>
                        <p>Author: ${book.author}</p>
                        <p>Price: $${book.price}</p>
                        <p>Quantity: ${book.quantity}</p>
                    </div>
                `).join('')}
            </div>
            <p>Total Price: $${sale.totalPrice.toFixed(2)}</p>
        </div>
    `).join('');
}

// Helper function to load data from localStorage
function loadData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}


// Add a new sale (you may want to fetch this from a database in a real application)
function addSale(userName, books) {
    const sales = loadData('sales');
    const totalPrice = books.reduce((total, book) => total + book.price, 0);
    sales.push({ user: userName, books, totalPrice });
    saveData('sales', sales);
    displaySales();
}

// Helper functions for localStorage
function loadData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Initialize pages
displayAuthors();
displayBooks();
displayStats();
displaySales();
