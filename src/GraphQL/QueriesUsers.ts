import { gql } from "@apollo/client";

export const GET_CURRENT_USER = gql`
  query GET_CURRENT_USER {
    user_getUsers {
      result {
        items {
          firstName
          lastName
          userName
          isDeleted
          userRoles {
            roleType
            id
            userId
          }
          normalizedUserName
        }
      }
      status
      __typename
    }
  }
`;


export const GET_USERS = gql`
query user_getUsers{
  user_getUsers {
    result (order: {createdDate : DESC},take: 2000){
      items{
        firstName
        lastName
        id
        userName
        email
        phoneNumber
        isDeleted
        userRoles{
          roleType
          id
        }
      }
    }
    status
    __typename
  }
}`

export const GET_USER = gql`
query user_getUser($id: String!){
  user_getUser(entityId: $id) {
    result {
      firstName
        lastName
        id
        userName
        email
        phoneNumber
        isDeleted
        userRoles{
          roleType
          id
        }
    }
    status{
      code
      value
    }
    __typename
  }
}`