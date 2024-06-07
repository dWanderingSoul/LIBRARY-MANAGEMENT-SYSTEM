import { Book } from './book.js';
import { User } from './user.js';
// ES6 class library
export class Library {
  constructor() {
    this.books = [];// Array to store books
    this.users = [];// Array to store users
  }

    // ... Library methods will be implemented below
//Add  a book
  addBook(book) {
    this.books.push(book);
  }

  //adding multiple books
 // addBooks(books) { // Assuming books is an array of book objects use of spread operator
  //  this.books.push(...books);
 // }

//Remove a book
  removeBook(isbn) {
    const bookIndex = this.books.findIndex(book => book.isbn === isbn);
    if (bookIndex !== -1) {
      this.books.splice(bookIndex, 1);
    } else {
      console.error(`Book with ISBN ${isbn} not found!`);// template literals for error messages

    }
  }
  //Search for a book by destructuring
  searchBook(query) {
    return this.books.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      book.isbn.includes(query)
    );
  }
  //Add a user
  addUser(user) {
    this.users.push(user);
  }
//updating user information using spread perator 
updateUser(userId, updatedInfo) {
    const userIndex = this.users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
      const user = this.users[userIndex];
      this.users[userIndex] = { ...user, ...updatedInfo };
    } else {
      console.error("User not found!");
    }
  }
  


// Remove a user
removeUser(id) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);
    } else {
      console.error("User not found!");
    }
  }  
//Search for a user
  searchUser(query) {
    return this.users.filter(user =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.id === query
    );
  }
//Borrow a book by destructuring
borrowBook([userId, isbn]) {
    const user = this.users.find(user => user.id === userId);
    const book = this.books.find(book => book.isbn === isbn);
    if (user && book && book.isAvailable) {
      user.borrowedBooks.push(book);
      book.isAvailable = false;
    } else {
      console.error("Borrowing failed!");
      // Handle specific errors (e.g., user not found, book not found, book unavailable)
    }
  }  
//Return a book by destructuring
  returnBook([userId, isbn]) {
    const user = this.users.find(user => user.id === userId);
    const book = this.books.find(book => book.isbn === isbn);
    if (user && book) {
      const borrowedIndex = user.borrowedBooks.findIndex(
        borrowedBook => borrowedBook.isbn === isbn
      );
      if (borrowedIndex !== -1) {
        user.borrowedBooks.splice(borrowedIndex, 1);
        book.isAvailable = true;
      } else {
        console.error("Book not borrowed by this user!");
      }
    } else {
      console.error("Error returning book!");
      // Handle specific errors (e.g., user not found, book not found)
    }
  }
  
//Check if a book is available
  isBookAvailable(isbn) {
    const book = this.books.find(b => b.isbn === isbn);
    return book ? book.isAvailable : false;
  }
}

module.exports = Library;

