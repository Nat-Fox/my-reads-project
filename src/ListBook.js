import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class ListBook extends React.Component {

  statusChange = (book) => {
    return (e) => {
      let shelf = e.target.value;
      BooksAPI.update(book, shelf)
        .then((updateBook) => {
          this.props.handlerStatusChange(book, shelf)
        })
        .catch((error) => {
          console.log('error', error)
        })
    }    
  };

  render() {
    return (
      <div className="list-books">
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">{this.props.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {this.props.books.map((book, key) => {
                    return <div key={key}>
                      {book.shelf === this.props.status ? <li>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf} onChange={this.statusChange(book)}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.author}</div>
                        </div>
                      </li> : ''}
                    </div>
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/search'
            onClick={this.props.showSearchPage}>
            <button>Add a book</button>
          </Link>
        </div>
      </div >
    )
  }
};

export default ListBook;
