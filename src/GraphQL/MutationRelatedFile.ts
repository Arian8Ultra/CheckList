import { gql } from "@apollo/client";

export const CREATE_RELATED_FILE = gql`
  mutation relatedFile_createRelatedFile(
    $projectId: Int!
    $fileAddress: String!
  ) {
    relatedFile_addRelatedFile(
      input: { fileAddress: $fileAddress, projectId: $projectId }
    ) {
      result {
        projectId
        fileAddress
        id
      }
      status {
        code
        value
      }
    }
  }
`;
