import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation user_createUser(
    $confirmPassword: String!
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $phoneNumber: String!
    $userName: String!
    $nationalCode: String!
  ) {
    user_signUp(
      input: {
        confirmPassword: $confirmPassword
        email: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
        phoneNumber: $phoneNumber
        userName: $userName
        nationalCode: $nationalCode
      }
    ) {
      code
      value
      __typename
    }
  }
`;

export const LOGIN_USER = gql`
  mutation user_loginUser($password: String!, $userName: String!) {
    user_signIn(input: { password: $password, userName: $userName }) {
      result {
        user {
          firstName
          lastName
          id
          userCurrentRole
        }
        token
        expireDate
      }
      status {
        code
        value
      }
    }
  }
`;
