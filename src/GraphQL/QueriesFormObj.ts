import { gql } from "@apollo/client";

export const GET_FORM_OBJS = gql`
  query {
    formObject_getFormObjects {
      result {
        items {
          projectId
          parentId
          userAnswers {
            answerType
            formObjectId
            id
          }
          childFormObjects {
            projectId
            content
            formObjectType
            parentId
          }
        }
      }
      status
    }
  }
`;

export const GET_FORM_OBJ_BY_PROJECT_ID = gql`
  query GET_FORM_OBJ_BY_PROJECT_ID($projectId: Int!) {
    formObject_getFormObjects {
      result(where: { projectId: { eq: $projectId } },take: 2000) {
        items {
          projectId
          parentId
          content
          formObjectType
          id
          userAnswers {
            answerType
            formObjectId
            id
          }
          childFormObjects {
            projectId
            content
            formObjectType
            parentId
          }
        }
      }
      status
    }
  }
`;

export const GET_FORM_OBJ_BY_PARENT_ID = gql`
  query GET_FORM_OBJ_BY_PARENT_ID($parentId: Int!) {
    formObject_getFormObjects {
      result(where: { parentId: { eq: $parentId } },take: 2000) {
        items {
          projectId
          parentId
          content
          formObjectType
          id
          userAnswers {
            answerType
            formObjectId
            id
          }
          childFormObjects {
            projectId
            content
            formObjectType
            parentId
          }
        }
      }
      status
    }
  }
`;

export const GET_FORM_OBJ_BY_ID = gql`
  query GET_FORM_OBJ_BY_ID($id: Int!) {
    formObject_getFormObject(entityId: $id) {
      result {
        projectId
        content
        formObjectType
        id
        childFormObjects {
          projectId
          content
          formObjectType
          parentId
          id
        }
      }
    }
  }
`;
