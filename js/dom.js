const UNREAD_LIST_BOOK_ID = "incompleteBookshelfList";
const READ_LIST_BOOK_ID = "completeBookshelfList"; 
const BOOK_ITEMID = "itemId"

function addBook() {
    const unreadBookList = document.getElementById(UNREAD_LIST_BOOK_ID);
    const readList = document.getElementById(READ_LIST_BOOK_ID);
    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;
    const read = document.getElementById("dot-1").checked
    //const unread = document.getElementById("dot-2").checked
    const book = makeBook(bookTitle, bookAuthor, bookYear, read);
    const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, read)

    book[BOOK_ITEMID] = bookObject.id
    books.push(bookObject);
    if(read){
        readList.append(book);
    }else{
        unreadBookList.append(book);
    }
    updateDataToStorage();

}
function makeBook(title, author, year, isRead) {
 
    const textTitle = document.createElement("h3");
    textTitle.innerText = title;
    
    const textAuthor = document.createElement("h4");
    textAuthor.innerText = author;

    const textYear = document.createElement("h5");
    textYear.innerText = year;
 
    const textContainer = document.createElement("div");
    textContainer.classList.add("text_item")
    textContainer.append(textTitle, textAuthor, textYear);
 
    const container = document.createElement("div");
    container.classList.add("book_item")
    container.append(textContainer);
    if(isRead){
        container.append(
            createUndoButton(),
        );
    } else {
        container.append(createReadButton());
    }
    container.append(createTrashButton());
    return container;
}
function createButton(buttonTypeClass , eventListener) {
    const button = document.createElement("button");
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
        if(buttonTypeClass=="trash-button"){
            alert("Your Book Deleted Successfuly");
        }
    });
    return button;
}

function searchBook (){
    const books2 = document.querySelectorAll(".book_item");
    const title = document.getElementById("searchBookTitle").value;
    let i = 0;
    let n = books2.length;
    if(title!=""){
        while(i<n){
            if(books2[i].childNodes[0].childNodes[0].innerText != title){
                books2[i].style.display = "none";
            }
            i++;
        }
    }
}
function addBookToRead(taskElement) {
    const readList = document.getElementById(READ_LIST_BOOK_ID);
    const bookTitle = taskElement.querySelector(".text_item > h3").innerText;
    const bookAuthor = taskElement.querySelector(".text_item > h4").innerText;
    const bookYear = taskElement.querySelector(".text_item > h5").innerText;
 
    const newBook = makeBook(bookTitle, bookAuthor, bookYear, true);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isRead = true;
    newBook[BOOK_ITEMID] = book.id;
    
    readList.append(newBook);
    taskElement.remove();

    updateDataToStorage();
} 
function undoBookFromRead(taskElement){
    const listUnread = document.getElementById(UNREAD_LIST_BOOK_ID);
    const bookTitle = taskElement.querySelector(".text_item > h3").innerText;
    const bookAuthor = taskElement.querySelector(".text_item > h4").innerText;
    const bookYear = taskElement.querySelector(".text_item > h5").innerText;
 
    const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);
    const book = findBook(taskElement[BOOK_ITEMID]);
    book.isRead = false;
    newBook[BOOK_ITEMID] = book.id;

    listUnread.append(newBook);
    taskElement.remove();

    updateDataToStorage();
}
function removeBookFromRead(taskElement) {
    const bookPosition = findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition, 1);
    taskElement.remove();
    updateDataToStorage();
}
function createUndoButton() {
    return createButton("undo-button", function(event){
        undoBookFromRead(event.target.parentElement);
    });
}
function createTrashButton() {
    return createButton("trash-button", function(event){
        removeBookFromRead(event.target.parentElement);
    });
}
function createReadButton() {
    return createButton("read-button", function(event){
         addBookToRead(event.target.parentElement);
    });
}