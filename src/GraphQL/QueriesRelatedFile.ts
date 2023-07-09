import { gql } from "@apollo/client";

export const GET_RELATED_FILE_BY_PROJECT_ID = gql`
  query relatedFile_getRelatedFileByProjectId($projectId: Int!) {
    relatedFile_getRelatedFiles {
      result(where: { projectId: { eq: $projectId } },take: 2000) {
        items {
          projectId
          fileAddress
          id
          fileName
          description
        }
      }
      status
    }
  }
`;
