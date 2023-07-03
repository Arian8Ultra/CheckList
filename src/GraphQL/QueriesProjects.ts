import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query projects_getProjects {
    project_getProjects {
      result {
        items {
          userId
          title
          id
          contractNumber
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
      }
      status
    }
  }
`;
