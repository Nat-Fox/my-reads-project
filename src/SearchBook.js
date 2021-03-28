import React from 'react';

class SearchBook extends React.Component {

  state = {
    book: ''
  }

  update = (book) => {
    this.setState(() => ({
      book: book.trim()
    }))
  }

  render() {



    const showingBooks = this.state.book === ''
      ? []
      : this.props.books.filter((book) => (
        book.title.toLowerCase().includes(this.state.book.toLowerCase())
      ))


    if (showingBooks !== undefined) {
      var showBooks = showingBooks.map((book, key) => {
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
    }

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={this.props.showSearchPage}>Close</button>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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