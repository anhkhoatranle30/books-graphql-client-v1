import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBooksQuery } from "../queries";
import BookDetail from "./BookDetail";

class BookList extends Component {
  state = {
    selectedBook: null,
  };

  displayBooks() {
    const { books, loading } = this.props.data;
    if (loading) {
      return <div>Loading books...</div>;
    }
    return books.map((book) => (
      <li
        key={book.id}
        onClick={(e) =>
          this.setState({
            selectedBook: book.id,
          })
        }
      >
        {book.name}
      </li>
    ));
  }
  render() {
    return (
      <div>
        <ul id="book-list">{this.displayBooks()}</ul>
        <BookDetail bookId={this.state.selectedBook} />
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
