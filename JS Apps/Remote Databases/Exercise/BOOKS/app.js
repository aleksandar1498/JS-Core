
import { get, post, put, remove } from './requester.js';

const loadBooksBtn = document.getElementById("loadBooks");
const tableBody = document.getElementsByTagName("tbody")[0];

let title = document.getElementById("title");
let author = document.getElementById("author");
let isbn = document.getElementById("isbn");

let id_edit = document.getElementById("id-edit");
let title_edit = document.getElementById("title-edit");
let author_edit = document.getElementById("author-edit");
let isbn_edit = document.getElementById("isbn-edit");

let submitData = document.querySelector("form button");

loadBooksBtn.addEventListener("click", async function () {
    let books = await get("appdata", "books");
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
        await editBook(id_edit.value, {
            "title": title_edit.value,
            "author": author_edit.value,
            "isbn": isbn_edit.value
        });
        loadBooksBtn.click();
    });
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", async function (evt) {
        evt.stopPropagation();
        if(confirm("Are you sure")){
            await deleteBook(book._id);
            loadBooksBtn.click();
        }
        
    });

    buttonColumn.appendChild(editButton);
    buttonColumn.appendChild(deleteButton);

    tr.addEventListener("click", function () {
        id_edit.value = book._id;
        title_edit.value = titleColumn.innerHTML;
        author_edit.value = authorColumn.innerHTML;
        isbn_edit.value = isbnColumn.innerHTML;
    });

    tr.appendChild(titleColumn);
    tr.appendChild(authorColumn);
    tr.appendChild(isbnColumn);
    tr.appendChild(buttonColumn);

    return tr;

}
function deleteBook(id) {
    return remove("appdata", "books", id);
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
    return post("appdata", "books", bodyData);
}
function editBook(id, bodyData) {
    return put("appdata","books",id,bodyData);
}
