import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route, Link } from 'react-router-dom'
import './App.css'
import BookShelf from './bookShelf'
import SearchBook from './search'

class BooksApp extends React.Component {
  state = {
    myBooks :[], // wantToRead - currentlyReading - read
    filteredBooks : [], // search filter (none - wantToRead - currentlyReading - read)
    //showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then(myBooks => {
        this.setState({ myBooks })
        //this.emptyLibrary();
        console.log(this.state.myBooks)
    })
}


  componentDidUpdate(){
    BooksAPI.getAll()
  }

emptyQuery = () => this.setState({ filteredBooks : []})
emptyLibrary = () => this.setState({ myBooks : []})

searchQuery = (event) => {
  
  const query = event.target.value
  this.setState({ filteredBooks : []});
  console.log("first come  "+query)
  
  if (query !== '') { 
    BooksAPI.search(query)
    .then(searchResults => {
      if (!searchResults || searchResults.error) { 
        console.log(searchResults.error)
        return
      }

      const adjustedBooks = searchResults.map(searchResult => {
          this.state.myBooks.forEach(book => {            
            if (book.id === searchResult.id){searchResult.shelf = book.shelf; } // Check if the book is familiar
            if (searchResult.shelf === undefined){searchResult.shelf = 'none'} //Add none-category to new books 
          })
        return searchResult
      })
      this.setState({ filteredBooks: adjustedBooks })
    })
  }

}


updateLibrary = (book, newShelf) => {
  BooksAPI.update(book, newShelf)
  .then(() => {
    BooksAPI.getAll()
    .then(myBooks => {
    this.setState({ myBooks })
    })
  })
      .then(alert('Book shelf was updated'))
}

updateSearch = (book, newShelf) => {
  BooksAPI.update(book, newShelf)
  .then(() => {
    BooksAPI.getAll()
    .then(filteredBooks => {
    this.setState({ filteredBooks })
    })
  })
      .then(alert('Book shelf was updated'))
}


  render() {
    return (
      <div className="app">

            <Route path="/search" exact render={() => (
            <SearchBook emptyQuery={this.emptyQuery} searchQuery={this.searchQuery} updateShelf={this.updateSearch} books={this.state.filteredBooks} />
            )} />
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>

            <Route path="/" exact render={() => (
            <div className="list-books-content">
              <BookShelf updateShelf={this.updateLibrary} shelf="Currently Reading" books={this.state.myBooks.filter(book => book.shelf === 'currentlyReading')} />,
              <BookShelf updateShelf={this.updateLibrary} shelf="Want to Read" books={this.state.myBooks.filter(book => book.shelf === 'wantToRead')} />,
              <BookShelf updateShelf={this.updateLibrary} shelf="Read" books={this.state.myBooks.filter(book => book.shelf === 'read')} />,
              <div >
              <Link className="open-search" to="/search"> Add a book </Link>
            </div>
            </div>
            
            )} />
            </div>
      </div>
    )
  }
}

export default BooksApp
