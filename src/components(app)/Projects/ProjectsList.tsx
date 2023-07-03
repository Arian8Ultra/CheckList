import React, { useEffect } from "react";
import { GET_PROJECTS } from "../../GraphQL/QueriesProjects";
import { useQuery } from "@apollo/client";
import { Stack, Typography } from "@mui/material";
import ProjectCard from "./ProjectCard";
import { Box } from "@chakra-ui/react";
import { CardBackground, textPrimary } from "../../theme/Colors";

interface ProjectsListProps {
  refetch?: any;
}
const ProjectsList = (props:ProjectsListProps) => {
  const { data, loading, error ,refetch} = useQuery(GET_PROJECTS, {
    onCompleted(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });
  useEffect(() => {
    refetch()
  },[props.refetch, refetch])
  return (
    <Stack spacing={2}>
      <Box
        display={"grid"}
        gridTemplateColumns={"1fr 1fr auto"}
        gap={4}
        justifyContent={"center"}
        alignItems={"center"}
        padding={"1%"}
        borderRadius={"15px"}
        sx={{
          background: CardBackground,
        }}
      >
        <Box
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          // bgColor={'red'}
          height={"100%"}
        >
          <Typography
            sx={{
              color: textPrimary,
              fontWeight: "bold",
              fontSize: "medium",
            }}
          >
            عنوان پروژه
          </Typography>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          // bgColor={'red'}
          height={"100%"}
        >
          <Typography
            sx={{
              color: textPrimary,
              fontWeight: "bold",
              fontSize: "medium",
            }}
          >
            شماره قرارداد
          </Typography>
        </Box>
      </Box>
      {data?.project_getProjects?.result?.items?.map((item: any) => (
        <ProjectCard
          id={item.id}
          title={item.title}
          userId={item.userId}
          key={item.id}
          contractNumber={item.contractNumber}
          onDelete={refetch}
        />
      ))}
    </Stack>
  );
};

export default ProjectsList;
