import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookShelf from './bookShelf'
import DebounceInput from 'react-debounce-input'

class SearchBook extends Component {
    componentDidMount() {
        this.props.emptyQuery()
    }

    render() {
        const data = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">


                    <Link className="close-search" to="/"> Close </Link>
                    <div className="search-books-input-wrapper">
                    <DebounceInput
                        debounceTimeout={500}
                        element="input"
                        type="text"
                        value={data.books.string}
                        onChange={data.searchQuery}
                        placeholder="Search by title or author"
                    />

                    </div>
                </div>
                <div className="search-books-results">
                    <BookShelf updateShelf={data.updateShelf} shelf="My books" books=
                    {data.books.filter(book => book.shelf === 'currentlyReading' || book.shelf === 'read' || book.shelf === 'wantToRead')} />

                    <BookShelf updateShelf={data.updateShelf} shelf="Discover!" books={data.books.filter(book => book.shelf === 'none')} />
                </div>
            </div>
        )
    };
};

export default SearchBook;