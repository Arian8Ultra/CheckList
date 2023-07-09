import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query projects_getProjects ($skip: Int) {
    project_getProjects {
      result (take: 2000, skip: $skip) {
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


export const GET_PROJECTS_SEARCH = gql`
  query projects_getProjectsSearch ($search: String, $skip: Int) {
    project_getProjects{
      result (
        where: {
          or: [
            {title: {contains: $search}}
            {contractNumber: {contains: $search}}
          ]
        }
        take: 2000, 
        skip: $skip) {
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
  }`
