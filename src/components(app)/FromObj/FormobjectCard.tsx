import { useQuery } from "@apollo/client";
import React from "react";
import {
  GET_FORM_OBJ_BY_ID,
  GET_FORM_OBJ_BY_PARENT_ID,
} from "../../GraphQL/QueriesFormObj";
import { Box, Divider, Stack } from "@chakra-ui/react";
import { CardBackground } from "../../theme/Colors";
interface IFormobjectCardProps {
  projectId: number;
  content: string;
  formObjectType: "CATEGORY" | "QUESTION";
  id: number;
  hiarchy?: number;
}
const FormobjectCard = (props: IFormobjectCardProps) => {
  const { data, loading, error } = useQuery(
    GET_FORM_OBJ_BY_PARENT_ID,
    {
      variables: {
        parentId: props.id,
      },
      onCompleted(data) {
        console.log(data);
      },
      onError(error) {
        console.log(error);
      },
      fetchPolicy: "cache-and-network",
    }
  );
  return (
    <Box
      display={"grid"}
      gridTemplateColumns={"repeat(5, 1fr)"}
      gap={10}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"2%"}
      borderRadius={"15px"}
      sx={{
        background:
          props.formObjectType === "CATEGORY"
            ? CardBackground
            : "rgba(255, 255, 255, 0.5)",
        backdropBlur: "5px",
        boxShadow: `0px 4px 4px ${
          props.formObjectType !== "CATEGORY"
            ? "rgba(0, 0, 0, 0.1)"
            : "rgba(255, 255, 255, 0.2)"
        }`,
        transition: "all 0.2s ease-in-out",
      }}
    >
      <Box
        gridColumn={"1/4"}
        style={{
          fontSize: `${
            props.hiarchy ? 1.2 - props.hiarchy * 0.07 : 1.2
          }rem`,
          fontWeight: `${
            props.hiarchy ? 700 - props.hiarchy * 75 : 700
          }`
        }}
      >
        {props.content}
      </Box>
      {props.formObjectType === "CATEGORY" && (
        <Stack
          gridColumn={"1/6"}
          gridRow={"3"}
          width={"100%"}
          spacing={20}
          backdropBlur={"5px"}
        >
          {data?.formObject_getFormObjects?.result?.items?.map(
            (formObj: {
              id: number;
              projectId: number;
              content: string;
              formObjectType: any;
            }) => (
              <FormobjectCard
                key={formObj.id}
                projectId={formObj.projectId}
                content={formObj.content}
                formObjectType={formObj.formObjectType}
                id={formObj.id}
                hiarchy={props.hiarchy ? props.hiarchy + 1 : 1}
              />
            )
          )}
        </Stack>
      )}
    </Box>
  );
};

export default FormobjectCard;
