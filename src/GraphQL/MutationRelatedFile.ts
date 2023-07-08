import { gql } from "@apollo/client";

export const CREATE_RELATED_FILE = gql`
  mutation relatedFile_createRelatedFile(
    $projectId: Int!
    $fileAddress: String!
    $fileName: String!
    $description: String
  ) {
    relatedFile_addRelatedFile(
      input: { fileAddress: $fileAddress, projectId: $projectId,fileName:$fileName,description:$description}
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


export const DELETE_RELATED_FILE = gql`
  mutation relatedFile_deleteRelatedFile($id: Int!) {
    relatedFile_deleteRelatedFile(entityId: $id) {
       result{
        projectId
        fileName
        fileAddress
        description
        id
       }
       status{
        code
        value
       }
    }
  }`