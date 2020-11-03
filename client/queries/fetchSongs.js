import gql from "graphql-tag";

export const query = gql`
  {
    songs {
      title
      id
    }
  }
`;
