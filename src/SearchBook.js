import React from "react";
import * as BooksAPI from "./BooksAPI";
import { Link } from "react-router-dom";

class SearchBook extends React.Component {
  state = {
    book: "",
    showBooks: [],
  };

  update = (book) => {
    this.setState(
      () => ({
        book: book.trim(),
      }),
      () => this.searchBook(this.state.book)
    );
  };

  searchBook = () => {
    BooksAPI.search(this.state.book).then((books) => {
      if (books !== undefined && books.length) {
        var bookWithShelf = books.map((currentBook) => {
          var foundBook = this.props.books.find(
            (book) => currentBook.id === book.id
          );
          if (foundBook) {
            currentBook["shelf"] = foundBook.shelf;
          }
          return currentBook;
        });

        this.setState(() => ({
          showBooks: bookWithShelf,
        }));
      } else {
        this.setState(() => ({
          showBooks: [],
        }));
      }
    });
  };

  statusChange = (book) => {
    return (e) => {
      let shelf = e.target.value;
      BooksAPI.update(book, shelf)
        .then((updateBook) => {
          this.props.handlerStatusChange(book, shelf);
        })
        .catch((error) => {
          console.log("error", error);
        });
    };
  };

  render() {
    var showBooks = (Array.isArray(this.state.showBooks)
      ? this.state.showBooks
      : []
    ).map((book, key) => {
      return (
        <li key={key}>
          <div className="book">
            <div className="book-top">
              <div
                className="book-cover"
                style={{
                  width: 128,
                  height: 193,
                  backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail : '' } )`
                }}
              ></div>
              <div className="book-shelf-changer">
                <select
                  value={book.shelf || "none"}
                  onChange={this.statusChange(book)}
                >
                  <option value="move" disabled>
                    Move to...
                  </option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
            <div>{book.categories}</div>
          </div>
        </li>
      );
    });

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button
              className="close-search"
              onClick={this.props.showSearchPage}
            >
              Close
            </button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.book}
              onChange={(event) => this.update(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{showBooks}</ol>
        </div>
      </div>
    );
  }
}

export default SearchBook;
