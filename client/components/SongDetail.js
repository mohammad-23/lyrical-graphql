import React, { Component } from "react";
import gql from "graphql-tag";
import { Link } from "react-router";
import { graphql } from "react-apollo";

import LyricsCreate from "./LyricsCreate";
import LyricsList from "./LyricsList";

class SongDetail extends Component {
  render() {
    if (this.props.data.loading) {
      return (
        <div
          className="container"
          style={{ textAlign: "center", margin: "20px" }}
        >
          Loading Details...
        </div>
      );
    }

    if (!this.props.data.song) {
      return (
        <div
          className="container"
          style={{ textAlign: "center", margin: "20px" }}
        >
          Song Doesn't Exist
        </div>
      );
    }

    return (
      <div className="container">
        <div style={{ marginTop: "15px" }}>
          <Link to="/">Back</Link>
        </div>
        <h3>{this.props.data.song.title}</h3>
        <LyricsList lyrics={this.props.data.song.lyrics} />
        <LyricsCreate songId={this.props.params.id} />
      </div>
    );
  }
}

export default graphql(
  gql`
    query SongQuery($id: ID!) {
      song(id: $id) {
        title
        id
        lyrics {
          id
          content
          likes
        }
      }
    }
  `,
  {
    options: (props) => {
      return {
        variables: { id: props.params.id },
      };
    },
  }
)(SongDetail);
