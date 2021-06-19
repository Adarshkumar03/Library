
const container = document.querySelector(".container");    
const button = document.querySelector(".submit");
const form = document.querySelector(".form");

let myLibrary = JSON.parse(localStorage.getItem("itemsArray")) || [];  


function Book(name, author, noOfPages, pagesRead){
   this.name = name;
   this.author = author;
   this.noOfPages = noOfPages;
   this.pagesRead = pagesRead;
   this.isRead = false;
}

function addBookToLibrary(name, author, noOfPages, pagesRead){
   let book = new Book(name, author, noOfPages, pagesRead);
   myLibrary.push(book);
   printBooks();
   localStorage.setItem("itemsArray", JSON.stringify(myLibrary));
}

function deleteBook(index){
    myLibrary.splice(index,1);
    localStorage.setItem("itemsArray", JSON.stringify(myLibrary));
}

function printBooks(){
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }

    myLibrary.forEach((book, index) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.dataset.num = `${index}`;

        const heading = document.createElement("h2");
        heading.textContent = `${book.name}`;

        const author = document.createElement("h3");
        author.textContent = `By ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `${book.noOfPages} pages`;

        const read = document.createElement("p");
        read.textContent = `${book.pagesRead} pages completed`;

        const buttonDiv = document.createElement("div");
        const clear = document.createElement("button");
        clear.textContent = "remove";
        const isRead = document.createElement("button");
        if(book.isRead){
          isRead.textContent = "read";
        }else{
          isRead.textContent = "not read";
        }
        

        isRead.addEventListener("click", function(e){
            if(isRead.textContent === "not read"){
              isRead.textContent = "read";
              book.isRead = true;}
             else{
               isRead.textContent = "not read";
               book.isRead = false;} 
        })

        clear.addEventListener("click", function(e){
           deleteBook(e.target.dataset.num);
           printBooks();
        })

        buttonDiv.appendChild(clear);
        buttonDiv.appendChild(isRead);
        const hr = document.createElement("hr");
        card.appendChild(heading);
        card.appendChild(hr);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(buttonDiv);
        container.appendChild(card);
    })
}

button.addEventListener("click", function(e){
    e.preventDefault();
    let name = form.elements.title.value;
    let author = form.elements.author.value;
    let noOfPages = form.elements.pages.value;
    let pagesRead = form.elements.rPages.value;
    let isR = false;
    if(noOfPages === pagesRead){
        isR = true;
    }
    addBookToLibrary(name,author,noOfPages,pagesRead, isR);
})

printBooks();