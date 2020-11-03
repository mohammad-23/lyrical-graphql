import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";

import { query } from "../queries/fetchSongs";

class SongList extends Component {
  handleDelete(songId) {
    this.props
      .mutate({
        variables: { id: songId },
      })
      .then(() => this.props.data.refetch());
  }

  renderSongs() {
    const { songs } = this.props.data;

    return (
      songs &&
      songs.map((item) => (
        <li
          className="collection-item"
          key={item.id}
          style={{ margin: "10px", cursor: "pointer" }}
          onClick={() => {
            hashHistory.push(`/songs/${item.id}`);
          }}
        >
          {item.title}
          <div
            style={{
              float: "right",
              color: "red",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => {
              this.handleDelete(item.id);
            }}
          >
            <i className="material-icons">delete</i>
            Delete
          </div>
        </li>
      ))
    );
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading Songs List</div>;
    }

    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSOng($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(query)(SongList));
