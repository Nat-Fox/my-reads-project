import React from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css';
import Header from './Header';
import SearchBook from './SearchBook';
import ListBook from './ListBook';
import { Route } from 'react-router-dom';


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <div>
            <Header />
            <ListBook
              showSearchPage={() => this.setState({ showSearchPage: true })}
              title='Currently Reading'
              books={this.state.books}
              status='currentlyReading'
            />
            <ListBook
              showSearchPage={() => this.setState({ showSearchPage: true })}
              title='Want to Read'
              books={this.state.books}
              status='wantToRead'
            />
            <ListBook
              showSearchPage={() => this.setState({ showSearchPage: true })}
              title='Read'
              books={this.state.books}
              status='read'
            />
          </div>
        )}></Route>

        <Route exact path='/search' render={() => (
          <SearchBook books={this.state.books} />
        )}>

        </Route>

        {/* {this.state.showSearchPage ? (
          <SearchBook
            // showSearchPage={() => this.setState({ showSearchPage: false })}
            books={this.state.books}
          />
        ) : (
          <div>
            <Header />
            <ListBook
              showSearchPage={() => this.setState({ showSearchPage: true })}
              title='Currently Reading'
              books={this.state.books}
              status='currentlyReading'
            />
            <ListBook
              showSearchPage={() => this.setState({ showSearchPage: true })}
              title='Want to Read'
              books={this.state.books}
              status='wantToRead'
            />
            <ListBook
              showSearchPage={() => this.setState({ showSearchPage: true })}
              title='Read'
              books={this.state.books}
              status='read'
            />
          </div>
        )
        } */}
      </div>
    )
  }
}

export default BooksApp
