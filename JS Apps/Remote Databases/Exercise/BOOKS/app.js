const baseUrl = "https://baas.kinvey.com/appdata/kid_Bka-PS6jr/books";
const loadBooksBtn = document.getElementById("loadBooks");
const tableBody = document.getElementsByTagName("tbody")[0];

let title = document.getElementById("title");
let author = document.getElementById("author");
let isbn = document.getElementById("isbn");

let submitData = document.querySelector("form button");

loadBooksBtn.addEventListener("click", async function () {
    let books = await loadBooks();
    if (books) {
        displayBooks(books);
    }

});
function displayBooks(books) {
    tableBody.innerHTML = '';
    for (const book of books) {
        tableBody.appendChild(generateBookRow(book));
    }

}
function generateBookRow(book) {
    let tr = document.createElement("tr");


    let titleColumn = document.createElement("td");
    titleColumn.innerHTML = book.title;

    let authorColumn = document.createElement("td");
    authorColumn.innerHTML = book.author;

    let isbnColumn = document.createElement("td");
    isbnColumn.innerHTML = book.isbn;

    let buttonColumn = document.createElement("td");

    let editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.addEventListener("click", async function (evt) {
        evt.stopPropagation();
        await editBook(book._id,{
            "title": title.value,
            "author": author.value,
            "isbn": isbn.value
        });
        loadBooksBtn.click();
    });
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", async function (evt) {
        evt.stopPropagation();
        await deleteBook(book._id);
        loadBooksBtn.click();
    });

    buttonColumn.appendChild(editButton);
    buttonColumn.appendChild(deleteButton);

    tr.addEventListener("click", function () {

        title.value = titleColumn.innerHTML;
        author.value = authorColumn.innerHTML;
        isbn.value = isbnColumn.innerHTML;
    });

    tr.appendChild(titleColumn);
    tr.appendChild(authorColumn);
    tr.appendChild(isbnColumn);
    tr.appendChild(buttonColumn);

    return tr;

}
function deleteBook(id) {
    return fetch(baseUrl + "/" + id, {
        method: "DELETE",
        headers: {
            "Authorization": "Basic Z3Vlc3Q6Z3Vlc3Q=",
            "Content-Type": "application/json",
        }
    }).then(res => {
        console.log(res);
        return res.json();
    });
}
function loadBooks() {
    return fetch(baseUrl, {
        method: "get",
        headers: {
            "Authorization": "Basic Z3Vlc3Q6Z3Vlc3Q=",
            "Content-Type": "application/json",
        }
    }).then(res => res.json());
}

submitData.addEventListener("click", async function (evt) {
    evt.preventDefault();
    if (!title.value || !author.value || !isbn.value) {
        return;
    }
    await addBook({
        "title": title.value,
        "author": author.value,
        "isbn": isbn.value
    });
    loadBooksBtn.click();

});

function addBook(bodyData) {
    console.log(JSON.stringify(bodyData));
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Authorization": "Basic Z3Vlc3Q6Z3Vlc3Q=",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData)
    }).then(res => res.json());
}
function editBook(id,bodyData) {
    console.log(id);
    console.log(JSON.stringify(bodyData));
   return fetch(baseUrl+"/"+id, {
        method: "PUT",
        headers: {
            "Authorization": "Basic Z3Vlc3Q6Z3Vlc3Q=",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData)
    }).then(res => res.json());
}
