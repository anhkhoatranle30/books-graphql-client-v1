import React, { Component } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { getAuthorsQuery, addBookMutation, getBooksQuery } from "../queries";

class AddBook extends Component {
  state = {
    name: "",
    genre: "",
    authorId: "",
  };

  displayAuthors() {
    const { loading, authors } = this.props.getAuthorsQuery;
    if (loading) {
      return <option disabled>Loading authors</option>;
    } else {
      return authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    const { name, genre, authorId } = this.state;
    this.props.addBookMutation({
      variables: {
        name,
        genre,
        authorId,
      },
      refetchQueries: [{ query: getBooksQuery }],
    });
  };
  render() {
    return (
      <div>
        <form id="add-book" onSubmit={this.onFormSubmit}>
          <div className="field">
            <label>Book name:</label>
            <input
              type="text"
              onChange={(e) => this.setState({ name: e.target.value })}
              value={this.state.name}
            />
          </div>
          <div className="field">
            <label>Genre:</label>
            <input
              type="text"
              onChange={(e) => this.setState({ genre: e.target.value })}
              value={this.state.genre}
            />
          </div>
          <div className="field">
            <label>Author:</label>
            <select
              onChange={(e) => this.setState({ authorId: e.target.value })}
              value={this.state.authorId}
            >
              <option value="">Select author</option>
              {this.displayAuthors()}
            </select>
          </div>
          <button>+</button>
        </form>
      </div>
    );
  }
}
export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
