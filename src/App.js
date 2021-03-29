import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import Header from './Header';
import SearchBook from './SearchBook';
import ListBook from './ListBook';
import { Route } from 'react-router-dom';


class BooksApp extends React.Component {
  state = {   
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  };

  handlerStatusChange = (book, shelf) => {
    let bookIndex = this.state.books.findIndex((b) => b.id === book.id);
    this.setState((prevState) => {
      prevState.books[bookIndex].shelf = shelf
      return prevState
    })
  };

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <div>
            <Header />
            <ListBook
              title='Currently Reading'
              books={this.state.books}
              status='currentlyReading'
              handlerStatusChange={this.handlerStatusChange}
            />
            <ListBook
              title='Want to Read'
              books={this.state.books}
              status='wantToRead'
              handlerStatusChange={this.handlerStatusChange}
            />
            <ListBook
              title='Read'
              books={this.state.books}
              status='read'
              handlerStatusChange={this.handlerStatusChange}
            />
          </div>
        )}></Route>

        <Route exact path='/search' render={() => (
          <SearchBook books={this.state.books} />
        )}>
        </Route>

      </div>
    )
  }
}

export default BooksApp
