import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';

class SearchBook extends React.Component {

  state = {
    book: '',
    showBooks: []
  }

  update = (book) => {
    this.setState(() => ({
      book: book.trim()
    }), this.searchBook(this.state.book))

  }

  searchBook = () => {
    BooksAPI.search(this.state.book)
      .then((books) => {
        this.setState(() => ({
          showBooks: books
        }))
      })
  }

  render() {
    var showBooks = (this.state.showBooks || []).map((book, key) => {
      return <li key={key}>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select>
                <option value="move" disabled>Move to...</option>
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
    })


    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'>
            <button className="close-search" onClick={this.props.showSearchPage}>Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.book}
              onChange={(event) => this.update(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {showBooks}
          </ol>
        </div>
      </div>
    )
  }
};

export default SearchBook;