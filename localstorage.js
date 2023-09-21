const event = 'savedBook';
const localStorageKey = 'BOOK_APPS';

function isStorageExist() {
    if (typeof (Storage) === undefined) {
        alert("Browser kamu tidak mendukung web storage");
        return false;
    }
    return true;
};

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(books);
        localStorage.setItem(localStorageKey, parsed);
        document.dispatchEvent(new Event(event));
    }
};

document.addEventListener(event, function () {
    console.log(localStorage.getItem(localStorageKey));
});

function loadDataFromStorage() {
    const serializeData = localStorage.getItem(localStorageKey);
    let data = JSON.parse(serializeData);

    if (data !== null) {
        for (const book of data) {
            books.push(book);
        }
    }
    document.dispatchEvent(new Event(RENDER_EVENT));
};