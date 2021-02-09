
const findAuthorById = (authors, id) =>
  authors.find((authorObj) => authorObj.id === id);

const findBookById = (books, id) => books.find((bookObj) => bookObj.id === id);

const partitionBooksByBorrowedStatus = (books) => {
  let booksOut = books.filter(
    (bookObj) => bookObj.borrows[0].returned === false
  );
  let booksIn = books.filter((bookObj) => bookObj.borrows[0].returned === true);
  return [booksOut, booksIn];
};

function getBorrowersForBook(book, accounts) {
  let totalBookBorrowers = [];
  book.borrows.forEach((borrowObj) => {
    totalBookBorrowers.push(borrowObj);
  });

  let transactionArray = [];

  totalBookBorrowers.forEach((borrow) => {
    account = accounts.find((account) => account.id === borrow.id);
    transactionArray.push({ ...borrow, ...account });
  });

  console.log(transactionArray);

  let cutTopTen = (array) => [
    array[0],
    array[1],
    array[2],
    array[3],
    array[4],
    array[5],
    array[6],
    array[7],
    array[8],
    array[9],
  ];

  let topTen = cutTopTen(transactionArray);
  return topTen;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
