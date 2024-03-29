import { useMutation, useQuery } from "@apollo/client";
import { Box, Stack } from "@chakra-ui/react";
import {
  AddRounded,
  FolderRounded
} from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CREATE_RELATED_FILE } from "../../GraphQL/MutationRelatedFile";
import { CREATE_FORM_OBJ } from "../../GraphQL/MutationsFormObj";
import { GET_FORM_OBJ_BY_PROJECT_ID } from "../../GraphQL/QueriesFormObj";
import { GET_RELATED_FILE_BY_PROJECT_ID } from "../../GraphQL/QueriesRelatedFile";
import FormobjectCard from "../../components(app)/FromObj/FormobjectCard";
import RelatedFileCard from "../../components(app)/Question/RelatedFileCard";
import CAN from "../../components/CAN";
import IButton from "../../components/IButton";
import LinkButton from "../../components/LinkButton";
import NewModal from "../../components/Modals";
import Selector from "../../components/Selector";
import TextInput from "../../components/TextInput";
import useLayoutStore from "../../stores/layoutStore";
import { Green, onPrimary, primary } from "../../theme/Colors";

const Projects = () => {
  const { projectId } = useParams();
  const loction = useLocation();
  const changePageName = useLayoutStore(
    (state) => state.changePageName
  );
  const [relatedFileModal, setRelatedFileModal] = useState({
    open: false,
    projectId: projectId && parseInt(projectId),
    fileName: "",
    fileAddress: "",
    description: "",
  });
  const [addModal, setAddModal] = useState({
    open: false,
    content: "",
    parentId: null,
    formObjectType: "CATEGORY",
    projectId: 0,
    hasProject: false,
  });

  const { data, loading, refetch } = useQuery(
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
  const {
    data: relatedFilesData,
    refetch: relatedFilesRefetch,
  } = useQuery(GET_RELATED_FILE_BY_PROJECT_ID, {
    variables: {
      projectId: projectId && parseInt(projectId),
    },
    onCompleted(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });

  const [addFormObject] = useMutation(CREATE_FORM_OBJ);

  const [addRelatedFile] = useMutation(CREATE_RELATED_FILE);
  const projectUserId = loction.state.userId;

  useEffect(() => {
    changePageName(loction.state.title);
  }, [changePageName, loction.state.title]);
  return (
    <Stack width={"100%"} spacing={2} backdropBlur={"5px"}>
      <LinkButton
        icon={<FolderRounded />}
        width={"max-content"}
        backgroundColor={primary}
        onClick={() => {
          setRelatedFileModal({
            ...relatedFileModal,
            open: true,
          });
        }}
      >
        فایل های مرتبط
      </LinkButton>
      <CAN permissionNeeded={"ADMIN"}>
        <IButton
          title="Add Form Object"
          backgroundColor={Green}
          color={"white"}
          fun={() => {
            setAddModal({
              ...addModal,
              open: true,
              projectId: projectId ? parseInt(projectId) : 0,
              parentId: null,
              hasProject: true,
            });
          }}
        >
          <AddRounded />
        </IButton>
      </CAN>
      {loading ? (
        <div>Loading...</div>
      ) : (
        data?.formObject_getFormObjects?.result?.items.map(
          (formObj: {
            id: number;
            projectId: number;
            content: string;
            formObjectType: never;
            parentId: number;
          }) => (
            <FormobjectCard
              key={formObj.id}
              projectId={formObj.projectId}
              content={formObj.content}
              formObjectType={formObj.formObjectType}
              id={formObj.id}
              hiarchy={1}
              parentId={formObj.parentId}
              userId={projectUserId}
            />
          )
        )
      )}
      <NewModal
        name="افزودن فرم جدید"
        open={addModal.open}
        isCloseable={true}
        onClose={() => setAddModal({ ...addModal, open: !open })}
        width={{
          xs: "90%",
          sm: "70%",
          md: "50%",
          lg: "40%",
          xl: "30%",
        }}
        backgroundColor="white"
        color={primary}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={20}
          width={"80%"}
          paddingInline={"10%"}
        >
          {addModal.hasProject && "این فرم برای پروژه ایجاد میشود"}
          <TextInput
            label="صورت فرم"
            value={addModal.content}
            getText={(content: string) =>
              setAddModal({ ...addModal, content })
            }
            width={"90%"}
          />
          <Selector
            valueOut="value"
            itemType="object"
            items={[
              {
                name: "سوال",
                value: "QUESTION",
              },
              {
                name: "دسته بندی",
                value: "CATEGORY",
              },
            ]}
            label="نوع فرم"
            width={"100%"}
            getValue={(formObjectType: string) =>
              setAddModal({ ...addModal, formObjectType })
            }
          />
          <LinkButton
            backgroundColor={primary}
            onClick={() => {
              console.log(addModal);
              // make a prompt which user can accept or decline
              const isAccepted = confirm("آیا مطمئن هستید؟");
              if (isAccepted) {
                addFormObject({
                  variables: {
                    content: addModal.content,
                    formObjectType: addModal.formObjectType,
                    parentId: addModal.parentId,
                    projectId: addModal.projectId,
                  },
                  onCompleted(data) {
                    console.log(data);
                    refetch();
                  },
                  onError(error) {
                    console.log(error);
                  },
                });
              }
            }}
          >
            ثبت
          </LinkButton>
        </Box>
      </NewModal>

      <NewModal
        name="فایل های مرتبط"
        open={relatedFileModal.open}
        isCloseable={true}
        onClose={() =>
          setRelatedFileModal({
            ...relatedFileModal,
            open: !relatedFileModal.open,
          })
        }
        width={{
          xs: "90%",
          sm: "70%",
          md: "60%",
          lg: "50%",
          xl: "40%",
        }}
        backgroundColor="white"
        color={primary}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={2}
          width={"100%"}
          maxHeight={"80vh"}
          overflowY={"auto"}
          position={'relative'}
        >
          <Box
            display={"grid"}
            width={"100%"}
            gridTemplateColumns={"1fr 1fr"}
            gap={2}
            position={"sticky"}
            zIndex={2}
            top={0}
            backgroundColor={onPrimary}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={2}
              height={"100%"}
              justifyContent={"space-between"}
            >
              <TextInput
                label="نام فایل"
                width={"100%"}
                fullWidth
                height={"100%"}
                getText={(e: any) => {
                  setRelatedFileModal({
                    ...relatedFileModal,
                    fileName: e,
                  });
                }}
                value={relatedFileModal.fileName}
              />
              <TextInput
                label="لینک فایل"
                width={"100%"}
                fullWidth
                height={"100%"}
                getText={(e: any) => {
                  setRelatedFileModal({
                    ...relatedFileModal,
                    fileAddress: e,
                  });
                }}
                value={relatedFileModal.fileAddress}
              />
            </Box>
            <TextInput
              label="توضیحات"
              width={"100%"}
              fullWidth
              multiline
              rows={4}
              value={relatedFileModal.description}
              getText={(e: any) => {
                setRelatedFileModal({
                  ...relatedFileModal,
                  description: e,
                });
              }}
            />

            <Button
              variant="contained"
              sx={{
                backgroundColor: primary,
                color: "white",
                borderRadius: "15px",
                gridColumn: "1/3",
              }}
              onClick={() => {
                addRelatedFile({
                  variables: {
                    projectId: projectId && parseInt(projectId),
                    fileName: relatedFileModal.fileName,
                    fileAddress: relatedFileModal.fileAddress,
                    description: relatedFileModal.description,
                  },
                  onCompleted(data) {
                    console.log(data);
                    relatedFilesRefetch();
                  },
                  onError(error) {
                    console.log(error);
                  },
                });
              }}
            >
              ثبت
            </Button>
          </Box>
          <Stack
            width={"100%"}
            spacing={2}
            backdropBlur={"5px"}
            position={"relative"}
          >
            {relatedFilesData?.relatedFile_getRelatedFiles?.result?.items?.map(
              (file: any) => (
                <RelatedFileCard
                  key={file.id}
                  id={file.id}
                  fileName={file.fileAddress}
                  title={file.fileName}
                  description={file.description}
                />
              )
            )}
          </Stack>
        </Box>
      </NewModal>
    </Stack>
  );
};

export default Projects;
