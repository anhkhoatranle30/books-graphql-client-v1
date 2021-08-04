import React, { Component } from "react";
import { graphql } from "react-apollo";
import { getBookQuery } from "../queries";

class BookDetail extends Component {
  displayBookDetail = () => {
    const { book } = this.props.data;
    if (!book) {
      return <div>No book selected!</div>;
    }
    return (
      <div>
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All books by this author : </p>
        <ul className="other-books">
          {book.author.books.map((book) => (
            <li key={book.id}>{book.name}</li>
          ))}
        </ul>
      </div>
    );
  };
  render() {
    return (
      <div id="book-details">
        <p>Output books detail here</p>
        {this.displayBookDetail()}
      </div>
    );
  }
}

export default graphql(getBookQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.bookId,
      },
    };
  },
})(BookDetail);
