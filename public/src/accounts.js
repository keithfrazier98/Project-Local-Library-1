
const { find } = require("../data/authors");
const { findAuthorById } = require("./books");

const findAccountById = (accounts, id) =>
  accounts.find((accountId) => accountId.id === id);

function sortAccountsByLastName(accounts) {
  let accountNames = accounts.map((accountObj) => {
    return { name: accountObj.name };
  });
  return accountNames.sort((accA, accB) =>
    accA.name.last < accB.name.last ? -1 : 1
  );
}

function numberOfBorrows(account, books) {
  let count = 0;
  books.forEach((book) => {
    book.borrows.forEach(({ id }) => {
      if (id === account.id) count++;
    });
  });
  return count;
}

function getBooksPossessedByAccount(account, books, authors) {
  const booksCheckOutByAcc = books.filter(
    (book) =>
      book.borrows[0].id === account.id && book.borrows[0].returned === false
  );
  booksCheckOutByAcc.forEach((book) => {
    book.author = findAuthorById(authors, book.authorId);
  });

  console.log(booksCheckOutByAcc);

  return booksCheckOutByAcc;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};