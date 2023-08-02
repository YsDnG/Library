/***** Selectors *****/
  const addBookBtn = document.querySelector(".content-addBtn")
  const addBookForm = document.querySelector(".content-formAddBook")
  const overlay = document.querySelector(".overlay")
/*************************************/

/******* Variables *******/
let myLibrary=[];
let bookCreated=0;
/********************************/


/******* Page Initialization  *******/
addBookForm.classList.add("is-hidden")
/*************************************/

/********* EventListener For the Div Content ***************/

  /*utton add book click */
  addBookBtn.addEventListener('click',displayForm)

  /*Submit new book click */
  addBookForm.addEventListener('submit',addBookToLibrary)

/*Close the form for new book if click was not it and hide the overlay */
  document.addEventListener('click', (event) => {
    if (!addBookForm.contains(event.target))
      {
        addBookForm.classList.remove('is-visible')
        addBookForm.classList.add('is-hidden')
        overlay.classList.remove('is-visible')
        overlay.classList.add('is-hidden')

      }
  })
/*************************************/

/********** Functions ***********/

  /*Books constructor */
    function Book(id,name,author,pages,read){
      this.id=id;
      this.title = name;
      this.author = author
      this.pages= pages;
      this.read= read
    }

    /* Adding book to the Library */
    function addBookToLibrary(event)
    {
      event.preventDefault()
      const formData = new FormData(addBookForm);
      const title = formData.get("title");
      const author = formData.get("author");
      const pages = formData.get('pages')
      const read = formData.get('read') === 'on'
      myLibrary.push(new Book("Book"+bookCreated,title,author,pages,read))
      addBookForm.reset();
      createBookDiv(myLibrary);
      hideForm();
    }
    /* Remove a book from the library using ID */
    function removeObjectById(id) {
      const index = myLibrary.findIndex(item => item.id === id);
      if (index !== -1) {
        myLibrary.splice(index, 1);
      }
    }

/*************************************/



/********************* Layout functions *******************/                             

  /* Show the form and overlay */
    function displayForm(event)
    {
      addBookForm.classList.remove('is-hidden')
      addBookForm.classList.add('is-visible')
      event.stopPropagation();
      overlay.classList.remove('is-hidden')
    }
    /* Hide the form and overlay after form is submit */
    function hideForm()
    {
      addBookForm.classList.remove('is-visible')
      addBookForm.classList.add('is-hidden')
      overlay.classList.remove('is-visible')
      overlay.classList.add('is-hidden')
    }


    /* Create an new div with the book add to the library */
    function createBookDiv(myLibrary)
    {
      /* The book last book added to library of books */
        const BookToDisplay = myLibrary[myLibrary.length-1]

      /* Div where the last book will be display*/
        const bookArticle = document.createElement("div")

      /* Increase the number of books created by 1 use to set the ID of the new div created */ 
        bookCreated++;

      /*Add the new div to the grid, set his id*/
        bookArticle.classList.add('content-gridItem');
        bookArticle.setAttribute('id',myLibrary[myLibrary.length-1].id);
        document.querySelector(".content-displayBook").appendChild(bookArticle)


      /**Create and add a elements for every key of a books objects on the new div(except id) */
        const entries= Object.entries(BookToDisplay);
        for(const [key,value] of entries)
        {
          let textValue = null;
        /*if Key is a boolean create a button Read*/
          if(typeof value === 'boolean')
          {
            textValue= document.createElement('button');
            textValue.classList.add('grid-itemBtn')
            if(value)
            {
                textValue.innerHTML= "Read"
                textValue.classList.add('is-read')
            }
            else
            {
              textValue.innerHTML= "Not Read"
              textValue.classList.add('is-notRead')
            }
            bookArticle.appendChild(textValue)
        
        /*Change the read value of a book by clicking the button read */
            textValue.addEventListener('click',function() {
              if(this.classList.contains('is-read'))
              {
                this.classList.remove('is-read');
                this.classList.add('is-notRead')
                textValue.innerHTML= "Not Read"
              }
              else
              {
              textValue.innerHTML= "Read"
              this.classList.add('is-read');
              this.classList.remove('is-notRead')
              }
            });
            
          }
        /*If the key is not the id create a <p> to display the value into the new div created */
            else
            {
              if(key!=='id')
              {
                textValue = document.createElement('p');
                if(value !== "")
                  textValue.textContent = `${key}: ${value}`;
                else
                  textValue.textContent =`${key}: not know`

                bookArticle.appendChild(textValue)
              }
            }
          
        }

        /*Create delete button for book and it to the new div*/
          textValue= document.createElement('button');
          textValue.classList.add('grid-itemBtn')
          textValue.innerHTML ="Delete"
          bookArticle.appendChild(textValue)

        /*When Delete button is clicked delete the div from the grid and remove the book from the library*/ 
          textValue.addEventListener('click',function(){
            bookArticle.remove();
          removeObjectById(bookArticle.id)
          })

        }
/***********************************************/

