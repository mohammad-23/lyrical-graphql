import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import { query } from "../queries/fetchSongs";

class LyricsCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
    };
  }

  handleChange(event) {
    this.setState({ content: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    this.setState({ content: "" });

    this.props.mutate({
      variables: {
        content: this.state.content,
        songId: this.props.songId,
      },
    });
  }

  render() {
    return (
      <div style={{ padding: "15px 0" }}>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Add a lyric:</label>
          <input
            value={this.state.content}
            onChange={this.handleChange.bind(this)}
          />
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        content
        id
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricsCreate);
