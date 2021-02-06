
// Create Book Constructor

function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// Create UI Contructor that's gonna contain all prototype methods

function UI(){}

// Prototype methods
// Add Book
UI.prototype.addBook = function(book){
    // Selecting List
    const list = document.getElementById("book-list");
    // Create tr element
    const row = document.createElement('tr');
    // Create tr innerHTML (td)
    row.innerHTML=`
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='#' class="delete">X</a></td>
    `;
    // Append to row to list
    list.appendChild(row);
}
// Clear Fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';
}
// Remove Book
UI.prototype.removeBook = function(target){
    if(target.className='delete'){
        target.parentElement.parentElement.remove();
    }
}



// Show Alert
UI.prototype.showAlert = function(msg, className){
    // create div
    const div = document.createElement('div');
    // Create and Appen text Node
    div.appendChild(document.createTextNode(msg));
    // Add class
    div.className =`alert ${className}`;
    // Put it above Form
    const form = document.getElementById('book-form');
    const card = document.querySelector('.card');

    card.insertBefore(div, form);

    // Make the Alert Disappear after 1.2s
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 1200);
}


// // Local Storage Class with static methods
// function Store(){}
// Store.prototype.getBooks = function(){
//         // Instatntiate books array
//         let books;
//         // Check if books are in LS
//         if(localStorage.getItem("books")===null){
//             books=[];
//         } else {
//             books = JSON.parse(localStorage.getItem("books"));
//         }
//         return books;
//     }
// Store.prototype.displayBooks = function(){
//     const store= new Store();
//     // Get Books
//     const books= store.getBooks();
//     // loop through books and Instantiate UI for every book and addBook to UI
// }
// Store.prototype.addBookToLS = function(book){
//     const store = new Store();
//     const books = store.getBooks();
//     books.push(book);
//     // Return books to LS
//     localStorage.setItem("books", JSON.stringify(books));
// }
// Store.prototype.removeBookFromLS = function(isbn){
//     const store = new Store();
//     const books = store.getBooks();
//     // Comparing isbn
//     // Loop through books
//     books.forEach(function(book, index){
//         console.log(book);
//         // book is an object, to access isbn => book.isbn
//         if(book.isbn === isbn){
//             books.splice(index, 1);
//         }
//         // Return books to LS
//         localStorage.setItem("books", JSON.stringify(books));
//     })
// }

// // DOM Content Loaded Event listener
// document.addEventListener('DOMContentLoaded', Store.displayBooks);


// Event Listener for Adding Book
document.getElementById('book-form').addEventListener('submit', function(e){
    // Get values from form
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // After Getting the values from form, 
    // Instantiate Book Object
    const book = new Book(title, author, isbn);

    // Instantiate UI object => table
    const ui = new UI();


    // Validate form
    if(author==='' || title==='' || isbn===''){
        ui.showAlert('Please fill in all fields!','error');
    } else {
        // Add to list
        ui.addBook(book);
        // Show success Alert
        ui.showAlert('Book Added!', 'success')
        // Clear fields
        ui.clearFields();
        // // Store in LocalStorage
        // const store = new Store();
        // store.addBookToLS(book);
    }
    e.preventDefault();
});




// Event Listener for Removing Book
// We selected book-list because we are gonna use Event delegation
document.querySelector('#book-list').addEventListener('click', function(e){
    // Instantiate UI Object
    const ui = new UI();
    // Remove the target
    ui.removeBook(e.target);
    //Show Success Alert
    ui.showAlert('Book Deleted', 'success');
    // // Remove from Local Storage
    // const store = new store();
    // store.removeBookFromLS(book);

    // Prevent Defaults
    e.preventDefault();
})



