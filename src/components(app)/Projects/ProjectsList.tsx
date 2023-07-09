import { useLazyQuery, useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import {
  CancelOutlined,
  SearchRounded
} from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";
import {
  GET_PROJECTS,
  GET_PROJECTS_SEARCH,
} from "../../GraphQL/QueriesProjects";
import TextInput from "../../components/TextInput";
import {
  CardBackground,
  primary,
  textPrimary
} from "../../theme/Colors";
import ProjectCard from "./ProjectCard";

interface ProjectsListProps {
  refetch?: boolean;
}
const ProjectsList = (props: ProjectsListProps) => {
  const [projectData, setProjectData] = React.useState<any>([]);
  const [search, setSearch] = React.useState("");
  const { refetch } = useQuery(GET_PROJECTS, {
    onCompleted(data) {
      console.log(data);
      setProjectData(data);
    },
    onError(error) {
      console.log(error);
    },
  });

  const [searchProjects] = useLazyQuery(GET_PROJECTS_SEARCH, {
    onCompleted(data) {
      console.log(data);
      setProjectData(data);
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    if (search !== "") {
      searchProjects({
        variables: {
          search: search,
        },
      });
    } else {
      refetch();
    }
  }, [refetch, search, searchProjects]);

  useEffect(() => {
    refetch();
  }, [props.refetch, refetch]);
  return (
    <Stack spacing={2}>
      <TextInput
        width={"100%"}
        id="search-input"
        label="جستجو"
        autoComplete="search-input"
        type="string"
        getText={setSearch}
        value={search}
        hasIcon={true}
        icon={
          search !== "" ? <CancelOutlined sx={{
            color: primary,
          }}/> : <SearchRounded sx={{
            color: primary,
          }} />
        }
        iconClick={() => {
          search !== ""
            ? (setSearch(""), searchProjects({
              variables: {
                search: "",
              },
            }))
            : console.log("search is empty");
        }}
      />
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
      {projectData?.project_getProjects?.result?.items?.map(
        (item: any) => (
          <ProjectCard
            id={item.id}
            title={item.title}
            userId={item.userId}
            key={item.id}
            contractNumber={item.contractNumber}
            onDelete={refetch}
          />
        )
      )}
    </Stack>
  );
};

export default ProjectsList;
