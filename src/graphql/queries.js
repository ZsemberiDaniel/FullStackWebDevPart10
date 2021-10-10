import { gql } from '@apollo/client';

export const AUTHORIZED_USER = gql`
query {
  authorizedUser {
    id
    username
  }
}
`;

export const GET_REPOSITORIES = gql`
# Write your query or mutation here
query {
  repositories {
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
    }
  }
}
`;

// other queries...