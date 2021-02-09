const totalBooksCount = (books) => books.length;

const totalAccountsCount = (accounts) => accounts.length;

function booksBorrowedCount(books) {
  let accumulator = 0;
  return (borrowedCount = books.reduce((acc, book) => {
    const id = book.borrows[0].returned;
    if (id === false) acc++;
    return acc;
  }, accumulator));
}

//create an array of all genres available
function collectGenres(books) {
  let accumulator = [];
  let genres = books.reduce((acc, book) => {
    const genre = book.genre;
    if (!acc.includes(genre)) acc.push(genre);
    return acc;
  }, accumulator);
  return genres;
}

//count how many books of each genre in books.js
function countNumberOfEachGenre(books) {
  //collect array of all genres
  genreArray = collectGenres(books);
  //create an object with each genre name and count
  genreObjectArray = [];
  for (let i = 0; i < genreArray.length; i++) {
    genreObjectArray.push({ name: genreArray[i], count: 0 });
  }

  //loop through books.js
  for (let i = 0; i < books.length; i++) {
    //find genre of current book
    const currentGenre = books[i].genre;
    //loop through genreObjectArray to match currentGenre
    for (let j = 0; j < genreObjectArray.length; j++) {
      currentObj = genreObjectArray[j];
      //increment count
      if (currentObj.name === currentGenre) {
        currentObj.count++;
      }
    }
  }
  return genreObjectArray;
}

const topFive = (array) => [array[0], array[1], array[2], array[3], array[4]];

function getMostCommonGenres(books) {
  //get genreObjectArray
  let genreObjectArray = countNumberOfEachGenre(books);

  genreObjectArray.sort(
    (genreObjA, genreObjB) => genreObjB.count - genreObjA.count
  );
  //cut off genre object array at five items
  return topFive(genreObjectArray);
}

function getMostPopularBooks(books) {
  bookObjectArray = [];
  //loop through books
  //create object for each book with name and count
  //push object to a book array
  books.forEach((bookObj) => {
    bookObjectArray.push({
      name: bookObj.title,
      count: bookObj.borrows.length,
    });
  });
  //sort books by highest count
  bookObjectArray.sort((bookObjA, bookObjB) =>
    bookObjA.count > bookObjB.count ? -1 : 1
  );
  //return sorted book array
  return topFive(bookObjectArray);
}

function getMostPopularAuthors(books) {
  //create empty authors object
  let authorsObj = {};
  //loop through books
  //for each book check if there is an key in authors object with a keyname of the author
  books.forEach((bookObj) => {
    const currentAuthor = bookObj.authorId;
    let currentBookBorrows = bookObj.borrows.length;
    if (authorsObj[currentAuthor]) {
      //if there is an key with current author name, add the times borrowed to the count property
      authorsObj[currentAuthor].count += currentBookBorrows;
    } else {
      /*if there isnt an key with the current author, create an object with the current 
      author as a key and an object as the value with name and count as keys*/
      authorsObj[currentAuthor] = {
        name: currentAuthor,
        count: currentBookBorrows,
      };
    }
  });
  //create an author array
  let authorsIdArray = [];
  //loop through authors object and create array of values with authorsoIdArray
  for (let authorId in authorsObj) {
    authorsIdArray.push(authorsObj[authorId]);
  }

  const authorsfile = require("../data/authors");
  //loop through authors array and change ID to author name
  authorsIdArray.forEach((authorIdObj) => {
    authorId = authorIdObj.name;
    //find author by ID
    let authorDataObj = authorsfile.find((author) => author.id === authorId);
    //reassign author object name
    authorIdObj.name = `${authorDataObj.name.first} ${authorDataObj.name.last}`;
  });
  //sort values
  authorsIdArray.sort((authorA, authorB) =>
    authorA.count > authorB.count ? -1 : 1
  );
  //return top five
  return topFive(authorsIdArray);
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
  collectGenres,
  countNumberOfEachGenre,
};
