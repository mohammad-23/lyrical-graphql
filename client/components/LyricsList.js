import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class LyricsList extends Component {
  handleLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __typename: "Mutation",
        likeLyric: {
          id,
          __typename: "LyricType",
          likes: likes + 1,
        },
      },
    });
  }

  renderLyrics() {
    const { lyrics } = this.props;

    return (
      lyrics &&
      lyrics.map((item) => (
        <li
          className="collection-item"
          key={item.id}
          style={{
            margin: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "80%" }}>{item.content}</div>
          <div
            style={{
              color: "green",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
            onClick={() => {
              this.handleLike(item.id, item.likes);
            }}
          >
            <i className="material-icons" style={{ marginRight: "5px" }}>
              thumb_up
            </i>
            {item.likes}
          </div>
        </li>
      ))
    );
  }

  render() {
    return (
      <div>
        <ul className="collection">{this.renderLyrics()}</ul>
      </div>
    );
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricsList);
