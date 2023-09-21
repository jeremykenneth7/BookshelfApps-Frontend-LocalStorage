const books = [];
const RENDER_EVENT = 'renderEvent';

function addBook() {
    const judul = document.getElementById("judul").value;
    const penulis = document.getElementById("penulis").value;
    const tahun = document.getElementById("tahun").value;
    const isCompleted = document.getElementById("isCompleted");

    let status;
    if (isCompleted.checked) {
        status = true;
    } else {
        status = false;
    }

    books.push({ id: +new Date(), title: judul, author: penulis, year: Number(tahun), isCompleted: status, });

    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
};

document.addEventListener(RENDER_EVENT, function () {
    console.log(books);
    const unCompleted = document.getElementById("unComplete");
    unCompleted.innerHTML = "";

    const isCompleted = document.getElementById("isComplete");
    isCompleted.innerHTML = "";

    for (const bookItem of books) {
        const bookElement = makeBook(bookItem);
        if (!bookItem.isCompleted) {
            unCompleted.append(bookElement);
        } else {
            isCompleted.append(bookElement);
        }
    }
});

function makeBook(objectBook) {
    const textTitle = document.createElement("h2");
    textTitle.classList.add("itemTitle");
    textTitle.innerHTML = `${objectBook.title}`;

    const textAuthor = document.createElement("p");
    textAuthor.classList.add("itemAuthor");
    textAuthor.innerText = `Penulis : ${objectBook.author}`;

    const textYear = document.createElement("p");
    textYear.classList.add("itemYear");
    textYear.innerText = `Tahun : ${objectBook.year}`;

    const textContainer = document.createElement("div");
    textContainer.classList.add("itemText");
    textContainer.append(textTitle, textAuthor, textYear);

    const actionContainer = document.createElement("div");
    actionContainer.classList.add("itemAction");

    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `book-${objectBook.id}`);

    if (objectBook.isCompleted) {
        const undoButton = document.createElement("button");
        undoButton.classList.add("undoButton");
        undoButton.innerHTML = `Belum Selesai Dibaca`;

        undoButton.addEventListener("click", function () {
            undoBookFromCompleted(objectBook.id);
        });

        const HapusButton = document.createElement("button");
        HapusButton.classList.add("HapusButton");
        HapusButton.innerHTML = `Hapus Buku`;

        HapusButton.addEventListener("click", function () {
            removeBookFromCompleted(objectBook.id);
        });

        actionContainer.append(undoButton, HapusButton);
        container.append(actionContainer);
    } else {
        const SelesaiButton = document.createElement("button");
        SelesaiButton.classList.add("SelesaiButton");
        SelesaiButton.innerHTML = `Selesai Dibaca`;

        SelesaiButton.addEventListener("click", function () {
            addBookToCompleted(objectBook.id);
        });

        const HapusButton = document.createElement("button");
        HapusButton.classList.add("HapusButton");
        HapusButton.innerHTML = `Hapus Buku `;

        HapusButton.addEventListener("click", function () {
            removeBookFromCompleted(objectBook.id);
        });

        actionContainer.append(SelesaiButton, HapusButton);
        container.append(actionContainer);
    };
    return container;
};

function addBookToCompleted(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isCompleted = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
};

function findBook(bookId) {
    for (const bookItem of books) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }

    return null;
};

function removeBookFromCompleted(bookId) {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) return;

    books.splice(bookTarget, 1);
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
};

function undoBookFromCompleted(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isCompleted = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    saveData();
};

function findBookIndex(bookId) {
    for (const index in books) {
        if (books[index].id === bookId) {
            return index;
        }
    }
    return -1;
}

document.addEventListener("DOMContentLoaded", function () {

    const Penyimpanan = document.getElementById("bookform");
    Penyimpanan.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    const Pencarian = document.getElementById("searchform");
    Pencarian.addEventListener("submit", function (event) {
        event.preventDefault();
        searchBook();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

function searchBook() {
    const Cari = document.getElementById("searchBookTitle").value;
    const CariBuku = document.querySelectorAll(".itemTitle");
    const HapusButton = document.querySelectorAll(".HapusButton");

    for (const move of CariBuku) {
        if (Cari !== move.innerText) {
            console.log(move.innerText)
            move.parentElement.remove();
        }
    }

    for (const move of HapusButton) {
        if (Cari !== move.innerText) {
            console.log(move.innerText)
            move.parentElement.remove();
        }
    }
};