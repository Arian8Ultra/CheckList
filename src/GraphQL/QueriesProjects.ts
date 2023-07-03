import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query projects_getProjects ($take: Int, $skip: Int) {
    project_getProjects {
      result (take: $take, skip: $skip) {
        items {
          userId
          title
          id
          contractNumber
          formObjects{
            id
            content 
          }
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
