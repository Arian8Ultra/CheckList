import { gql } from "@apollo/client";

export const CREATE_USER_ANSWER = gql`
  mutation createUserAnswer(
    $answerType: AnswerType!
    $formObjectId: Int!
    $userId: String!
  ) {
    userAnswer_addUserAnswer(
      input: {
        answerType: $answerType
        formObjectId: $formObjectId
        userId: $userId
      }
    ) {
      result {
        answerType
        formObjectId
        id
        user {
          firstName
          lastName
        }
      }
      status {
        code
        value
      }
    }
  }
`;

export const UPDATE_USER_ANSWER = gql`
  mutation updateUserAnswer(
    $answerType: AnswerType!
    $formObjectId: Int!
    $userId: String!
    $id: Int!
  ) {
    userAnswer_updateUserAnswer(
      input: {
        answerType: $answerType
        formObjectId: $formObjectId
        userId: $userId
        id: $id
      }
    ) {
      result {
        answerType
        formObjectId
        id
        user {
          firstName
          lastName
        }
      }
      status {
        code
        value
      }
    }
  }
`;
