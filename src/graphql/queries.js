import { gql } from '@apollo/client';

export const GET_REPOSITORY = gql`
# Write your query or mutation here
query($id: ID!, $after: String, $first: Int) {
  repository(id: $id) {
    id,
    fullName,
    description,
    stargazersCount,
    forksCount,
    ownerAvatarUrl,
    reviewCount,
    ratingAverage,
    language,
    url,
    reviews(first: $first, after: $after) {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`;

export const AUTHORIZED_USER = gql`
query($includeReviews: Boolean = false) {
  authorizedUser {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          id
          text
          rating
          createdAt
          repository {
            fullName
            ownerName
            id
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}
`;

export const GET_REPOSITORIES = gql`
# Write your query or mutation here
query($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $after: String, $first: Int) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, after: $after, first: $first) {
    edges {
      node {
        id,
        fullName,
        description,
        stargazersCount,
        forksCount,
        ownerAvatarUrl,
        reviewCount,
        ratingAverage,
        language
      }
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
  }
}
`;

// other queries...