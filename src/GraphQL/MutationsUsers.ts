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

export const CHANGE_PASSWORD = gql`
  mutation CHANGE_PASSWORD(
    $oldPassword: String!
    $newPassword: String!
    $confirmPassword: String!
    $userId: String!
  ) {
    user_changePassword(
      input: {
        confirmPassword: $confirmPassword
        currentPassword: $oldPassword
        newPassword: $newPassword
        userId: $userId
      }
    ) {
      code
      value
      __typename
    }
  }
`;

export const DELETE_USER = gql`
  mutation DELETE_USER($id: String!) {
    user_deleteUser(userId: $id) {
      code
      value
      __typename
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UPDATE_USER(
    $firstName: String!
    $lastName: String!
    $nationalCode: String!
    $userName: String!
  ) {
    user_updateProfile(
      input: {
        userName: $userName
        firstName: $firstName
        lastName: $lastName
        nationalCode: $nationalCode
      }
    ) {
      result {
        firstName
        lastName
        email
      }
      status {
        code
        value
      }
    }
  }
`;

export const ADD_ROLE_TO_USER = gql`
  mutation ADD_ROLE_TO_USER($roleType: RoleType!, $userId: String!) {
    userRole_addUserToRole(roleType: $roleType, userId: $userId) {
      code
      value
    }
  }
`;

export const REMOVE_ROLE_FROM_USER = gql`
  mutation REMOVE_ROLE_FROM_USER($Id: Int!) {
    userRole_removeUserFromRole(entityId: $Id) {
      code
      value
    }
  }
`;


export interface IAddRoleToUser {
  roleType: "SUPER_ADMIN" | "ADMIN" | "NORMAL" | "EDITOR";
  userId: string;
}

