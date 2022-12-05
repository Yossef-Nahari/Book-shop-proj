'use strict'

const STORAGE_KEY = 'books'
const idKey = 'idKey'

var gBooks
var gCurrBookForUpdate
var idNextId = (loadFromStorage(idKey)) ? loadFromStorage(idKey) : 1000
var gBookNames = ['Harry', 'Love', 'Happiness', 'pursuit', 'Rabbit', 'History', 'Luli',
    'Dear', 'Coco', 'home', 'learning', 'HTML', 'css info', 'food', 'Computers', 'victory',
    'east', 'europe', 'traveling']
var gFilterBy = { minRate: 0, maxPrice: 300 }

function _createBook(title, price = getRandomIntIncl(50, 200)) {
    return {
        id: idNextId++,
        title,
        price,
        rate: getRandomIntIncl(1, 10),
    }
}

function _createBooks() {
    var books = loadFromStorage(STORAGE_KEY)
    if (!books || !books.length) {
        books = []
        const bookNamesLength = gBookNames.length
        for (let i = 0; i < bookNamesLength; i++) {
            var title = getRandomBookName()
            books.push(_createBook(title))
        }
    }
    gBooks = books
    saveToStorage(STORAGE_KEY, gBooks)
    saveToStorage(idKey, idNextId)
}

function getBooks() {
    _createBooks()
    var books = gBooks.filter(book => book.rate >= gFilterBy.minRate &&
        book.price <= gFilterBy.maxPrice)
    return books
}

function getRandomBookName() {
    const randomName = gBookNames[getRandomIntIncl(0, gBookNames.length - 1)]
    const index = gBookNames.indexOf(randomName)
    gBookNames.splice(index, 1)
    return randomName
}

function getNewBook(name, price) {
    return _createBook(name, price)
}

function addNewBook(newBook) {
    gBooks.push(newBook)
    updateLocalStorage()
}

function updateLocalStorage() {
    saveToStorage(STORAGE_KEY, gBooks)
    saveToStorage(idKey, idNextId)
}

function deleteBook(bookId) {
    const index = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(index, 1)
}

function currBookForUpdate(name) {
    const book = gBooks.find(book => book.title === name)
    gCurrBookForUpdate = book
}

function updateChosenBook(newPrice, newRate) {
    gCurrBookForUpdate.price = newPrice
    gCurrBookForUpdate.rate = newRate
}

function setBookFilter(filterBy = {}) {
    if (filterBy.minRate !== undefined) gFilterBy.minRate = +filterBy.minRate
    if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = +filterBy.maxPrice
    return gFilterBy
}

function setBookSort(sortBy = {}) {
    if (sortBy.maxPrice) {
        gBooks.sort((b1, b2) => (b1.price - b2.price) * sortBy.maxPrice)
    } else if (sortBy.rate) {
        gBooks.sort((b1, b2) => (b1.rate - b2.rate) * sortBy.rate)
    }
    updateLocalStorage()
}

