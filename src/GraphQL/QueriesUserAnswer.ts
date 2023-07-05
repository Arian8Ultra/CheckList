import { gql } from "@apollo/client";

export const GET_USER_ANSWER_BY_USER_ID_AND_FORM_OBJECT_ID = gql`
  query getUserAnswerByUserIdAndFormObjectId(
    $userId: String!
    $formObjectId: Int!
  ) {
    userAnswer_getUserAnswers {
      result(
        where: {
          userId: { eq: $userId }
          formObjectId: { eq: $formObjectId }
        }
      ) {
        items {
          answerType
          user {
            firstName
            lastName
          }
          id
        }
      }
      status
    }
  }
`;
