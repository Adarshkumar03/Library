
const container = document.querySelector(".container");    
const button = document.querySelector(".submit");
const form = document.querySelector(".form");
const addBookBtn = document.querySelector(".add-form-btn");
const overlay = document.querySelector(".overlay");

let myLibrary = JSON.parse(localStorage.getItem("itemsArray")) || [];  


function Book(name, author, noOfPages, isRead){
   this.name = name;
   this.author = author;
   this.noOfPages = noOfPages;
   this.isRead = isRead;
}

function addBookToLibrary(name, author, noOfPages, isRead){
   let book = new Book(name, author, noOfPages, isRead);
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


        const buttonDiv = document.createElement("div");
        const clear = document.createElement("button");
        clear.textContent = "remove";
        const isRead = document.createElement("button");
        if(book.isRead){
          isRead.textContent = "read";
        }else{
          isRead.textContent = "not read";
        }  
        console.log(book.isRead);

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
        buttonDiv.classList.add("button-div");
        const hr = document.createElement("hr");
        card.appendChild(heading);
        card.appendChild(hr);
        card.appendChild(author);
        card.appendChild(pages);
        card.appendChild(buttonDiv);
        container.appendChild(card);
    })
}

button.addEventListener("click", function(e){
    e.preventDefault();
    let name = form.elements.title.value;
    let author = form.elements.author.value;
    let noOfPages = form.elements.pages.value;
    let isR = form.elements.read.checked;
    addBookToLibrary(name,author,noOfPages,isR);
    form.style.transform = "scale(0)";
    overlay.style.display = "none";
    form.reset(); 
})

overlay.addEventListener("click", function(){
  form.style.transform = "scale(0)";
  overlay.style.display = "none";
})

addBookBtn.addEventListener("click", function(){
   form.style.transform = "translate(-50%, -50%) scale(1)";
   overlay.style.display = "block";
})

printBooks();