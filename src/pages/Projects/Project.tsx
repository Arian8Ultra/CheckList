import { useQuery } from "@apollo/client";
import { Stack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  GET_FORM_OBJ_BY_PROJECT_ID
} from "../../GraphQL/QueriesFormObj";
import FormobjectCard from "../../components(app)/FromObj/FormobjectCard";
import useLayoutStore from "../../stores/layoutStore";

const Projects = () => {
  const { projectId } = useParams();
  const loction = useLocation();
  const changePageName = useLayoutStore(
    (state) => state.changePageName
  );
  const { data, loading, error } = useQuery(
    GET_FORM_OBJ_BY_PROJECT_ID,
    {
      variables: {
        projectId: projectId && parseInt(projectId),
      },
      onCompleted(data) {
        console.log(data);
      },
      onError(error) {
        console.log(error);
      },
    }
  );

  useEffect(() => {
    changePageName(loction.state.title);
  }, []);
  return (
    <Stack
      width={"100%"}
      spacing={2}
      backdropBlur={"5px"}
      backgroundColor={"rgba(255, 255, 255, 0.5)"}
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        data?.formObject_getFormObjects?.result?.items.map(
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
              hiarchy={1}
            />
          )
        )
      )}
    </Stack>
  );
};

export default Projects;
