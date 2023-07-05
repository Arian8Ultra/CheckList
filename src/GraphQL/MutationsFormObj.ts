import { gql } from "@apollo/client";

export const CREATE_FORM_OBJ = gql`
  mutation createFormObj(
    $content: String!
    $formObjectType: FormObjectType!
    $parentId: Int
    $projectId: Int
  ) {
    formObject_addFormObject(
      input: {
        content: $content
        formObjectType: $formObjectType
        parentId: $parentId
        projectId: $projectId
        isCustom: true
      }
    ) {
      result {
        parentId
        projectId
        content
        formObjectType
      }
      status {
        code
        value
      }
    }
  }
`;

export const UPDATE_FORM_OBJ = gql`
  mutation updateFormObj(
    $id: Int!
    $content: String!
    $formObjectType: FormObjectType!
    $parentId: Int!
    $projectId: Int!
  ) {
    formObject_updateFormObject(
      input: {
        content: $content
        formObjectType: $formObjectType
        id: $id
        isCustom: true
        parentId: $parentId
        projectId: $projectId
      }
    ) {
      result {
        parentId
        projectId
        content
        formObjectType
      }
      status {
        code
        value
      }
    }
  }
`;

export const DELETE_FORM_OBJ = gql`
  mutation deleteFormObj($id: Int!) {
    formObject_deleteFormObject(entityId: $id) {
      result {
        parentId
        projectId
        content
        formObjectType
      }
      status {
        code
        value
      }
    }
  }
`;
