
let myLibrary = [{
    name:"Looking for Alaska", 
    author:"John Green",
    noOfPages:253,
    pagesRead:250 
    },{
        name:"Quiet:The Power of Introverts", 
    author:"I dont Know",
    noOfPages:456,
    pagesRead:200 
    }];

const container = document.querySelector(".container");    

function Book(name, author, noOfPages, pagesRead){
   this.name = name;
   this.author = author;
   this.noOfPages = noOfPages;
   this.pagesRead = pagesRead;
}

function addBookToLibrary(name, author, noOfPages, pagesRead){
   let book = new Book(name, author, noOfPages, pagesRead);
   myLibrary.push(book);
}

function deleteBook(index){
    myLibrary.splice(index,1);
    console.log(myLibrary);
}

function printBooks(){
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

    myLibrary.forEach((book) => {
        const card = document.createElement("div");
        card.classList.add("card");
        const heading = document.createElement("h2");
        heading.textContent = `${book.name}`;
        const author = document.createElement("h3");
        author.textContent = `${book.author}`;
        const pages = document.createElement("p");
        pages.textContent = `${book.noOfPages}`;
        const read = document.createElement("p");
        read.textContent = `${book.pagesRead}`;
        card.appendChild(heading);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        container.appendChild(card);
    })
}

printBooks();