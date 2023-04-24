/*  Program: menu-app.js
    Author: Christian M Rapp | CMR Web Studio
    Date: April 21, 2022

    This program demonstrates the use of classes in JavaScript. Emcapsulation, Inhertiance, Polymorphism and Abstraction
    are used. Using classes, this program creates a menu driven app that allows the user to manage their personal
    reading library. The user can create multiple collections of books (ie: Horror, Crime, etc) and then perfoirm functions such as:
    1) add a book     2) delete a book

    On the main menu, the user can do the following operations:
    1) create a new collecton   2) view a specific collection    3) delete a collection    4) display a collection

 */

// Classes for a Book and a Book Collection
class Book {
    constructor(title, author) {
    this.title = title;
    this.author = author;
    }
    
    //function to display book & author information
    describe() {                                
    return `${this.title} was written by ${this.author}.`;
    }
    }

class Collection {
    constructor(name) {
    this.name = name;
    this.books = [];        //create empty array to hold book collection
    }
    
    //function to add a book to collection
    addBook(book) {
        if (book instanceof Book) {
            this.books.push(book);
        } else {                //catch bad input
            throw new Error(`You can only add an instance of a Book. Argument is not a book: ${book}`);
        }
    }
    
    //function to show books in collection
    describe() {
        return `
        ${this.name} has ${this.books.length} books.`;
    }
}// end class Collection

class Menu {                    // class that drives the application and allows user to make choices
    constructor() {
        this.collections = [];          //create an empty array of books
        this.selectedCollection= null;  // manage one book collection at a time
    }
    
    start() { // entry point to application
        let selection = this.showMainMenuOptions(); 
            while (selection != 0) {
            switch(selection) {
            case '1' :
                this.createCollection();
                break;
            case '2' :
                this.viewCollection();
                break;
            case '3' :
                this.deleteCollection();
                break;
            case '4' :
                this.displayCollections();
                break;
            default:
                selection = 0;
        }//end switch
        selection = this.showMainMenuOptions();
    }
    alert('Go read another book! Goodbye!');
}//end start
    
    //function to display main menu using a template literal
    showMainMenuOptions() {
    return prompt(`
        0) Exit
        1) Create a new book collection
        2) View a book collection
        3) Delete a book collection
        4) Display all book collections
    `);
    }
    
    //use template lteral to create book menu
    showTeamMenuOptions(collectionInfo) {
    return prompt(`
        0) Go back
        1) Add a new book
        2) Delete a book
        -----------------
        ${collectionInfo}
    `);
    }
    
    //function to display all book collections
    displayCollections() {
        let collectionStr = '';
        for (let i = 0; i < this.collections.length; i++) {
            collectionStr += i+ ') ' + this.collections[i].name + '\n';
    }
    alert(collectionStr);
    }
    
    //function to create a book collection
    createCollection() {
        let title = prompt('Enter genere for the new collection: ');
        this.collections.push(new Collection(title));
    }
    
    //function to view a book collection
    viewCollection() {
        let index = prompt("Enter the index of the collection that you want to view:");
        if (index > -1 && index < this.collections.length) {
            this.selectedCollection = this.collections[index];
            let description = 'Collection Name: ' + this.selectedCollection.name + '\n';
            
            //build a string to describe the books in the selected collection
            description += ' ' + this.selectedCollection.describe() + '\n ';
            for (let i = 0; i < this.selectedCollection.books.length; i++) {            
                description += i + ') ' + this.selectedCollection.books[i].describe() + '\n';
            }
            
            let selection1 = this.showTeamMenuOptions(description);
            
            switch (selection1) {
            case '1' :
                this.createBook();
                break;
            case '2' :
                this.deleteBook();
            }
        } 
    }// end viewCollection
    
    //function to delete a collection
    deleteCollection() {
    let index = prompt('Enter the index of the collection that you wish to delete: ');
        if (index > -1 && index < this.collections.length) {
        this.collections.splice(index,1);
    }
    }
    
    //function to create a Book
    createBook() {
        let title = prompt('Enter TITLE for the new book: ');
        let author = prompt('Enter AUTHOR for the new book: ');    
        this.selectedCollection.addBook(new Book(title, author));
    }
    
    //function to delete a book
    deleteBook() {
        let index = prompt('Enter the index of the book that you wish to delete: ');
        if (index > -1 && index < this.selectedCollection.books.length) { this.selectedCollection.books.splice(index,1);
        }
    }
    }// end class Menu

    let menu = new Menu();  //create a new instance of Menu
    menu.start();           //start the application by calling start method of Menu object