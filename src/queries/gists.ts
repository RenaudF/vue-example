import gql from "graphql-tag";

export default gql`
query gists {
  viewer {
    gists(last: 20, orderBy: {field: CREATED_AT, direction: ASC}) {
      totalCount
      nodes {
        id
        name
        description
        createdAt
        pushedAt
        updatedAt
        files {
          name
          extension
          text
        }
      }
    }
  }
}`