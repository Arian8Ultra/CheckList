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
  query ($projectId: Int!) {
    formObject_getFormObjects {
      result(where: { projectId: { eq: $projectId } }) {
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
