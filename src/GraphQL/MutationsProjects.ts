import { gql } from "@apollo/client";

export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $contractNumber: String!
    $title: String!
    $userId: String!
  ) {
    project_addProject(
      input: {
        contractNumber: $contractNumber
        title: $title
        userId: $userId
      }
    ) {
      result {
        title
        id
        userId
        isDeleted
      }
      status {
        code
        value
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $id: Int!
    $contractNumber: String!
    $title: String!
    # $userId: String!
  ) {
    project_updateProject(
      input: {
        id: $id
        contractNumber: $contractNumber
        title: $title
        # userId: $userId
      }
    ) {
      result {
        userId
        id
        title
        contractNumber
      }
      status {
        code
        value
      }
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($id: Int!) {
    project_deleteProject(entityId: $id) {
      result {
        title
        id
        isDeleted
      }
      status {
        code
        value
      }
    }
  }
`;
