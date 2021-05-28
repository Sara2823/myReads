import React, { Component } from 'react';

class BookShelf extends Component {
    render() {
    const data = this.props;
    return <div className="bookshelf">
    <h2 className="bookshelf-title">{data.shelf}</h2>
    <div className="bookshelf-books">
        <ol className="books-grid">
            {data.books.map((book, index) =>
                <li key={index}>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 170, backgroundImage: book.imageLinks ? (`url(${book.imageLinks.thumbnail})`) : (`url(https://dummyimage.com/128x170/4f4f4f/ffffff.jpg&text=No+Book+Art)`) }}></div>
                            <div className="book-shelf-changer">
                                <select value={book.shelf} onChange={(newShelf) => data.updateShelf(book, newShelf.target.value)}> 
                                    <option disabled>Move to...</option>
                                    <option value="currentlyReading">Currently reading</option>
                                    <option value="wantToRead">Want to read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                </select>
                            </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">
                            <ul>
                            {Array.isArray(book.authors) && (
                                book.authors.map((author, index)=>
                                (<li key={index}>{author}</li>))
                                
                                )}
                            </ul>
                            </div>
                    </div>
                </li>
            )}
        </ol>
    </div>
</div>

    }
}

export default BookShelf