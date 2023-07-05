import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Box, Stack } from "@chakra-ui/react";
import {
  AddRounded,
  DeleteRounded,
  EditRounded,
} from "@mui/icons-material";
import React, { useEffect } from "react";
import {
  CREATE_FORM_OBJ,
  DELETE_FORM_OBJ,
} from "../../GraphQL/MutationsFormObj";
import { GET_FORM_OBJ_BY_PARENT_ID } from "../../GraphQL/QueriesFormObj";
import CAN from "../../components/CAN";
import IButton from "../../components/IButton";
import LinkButton from "../../components/LinkButton";
import NewModal from "../../components/Modals";
import Selector from "../../components/Selector";
import TextInput from "../../components/TextInput";
import {
  Blue,
  BlueLight,
  CardBackground,
  Green,
  GreenLight,
  Red,
  RedLight,
  Yellow,
  YellowLight,
  onPrimary,
  primary,
  textPrimary,
} from "../../theme/Colors";
import { GET_USER_ANSWER_BY_USER_ID_AND_FORM_OBJECT_ID } from "../../GraphQL/QueriesUserAnswer";
import { usePersistStore } from "../../stores/PersistStore";
import { red } from "@mui/material/colors";
import {
  CREATE_USER_ANSWER,
  UPDATE_USER_ANSWER,
} from "../../GraphQL/MutationsUserAnswer";
import { CircularProgress, Skeleton } from "@mui/material";
interface IFormobjectCardProps {
  projectId: number;
  content: string;
  formObjectType: "CATEGORY" | "QUESTION";
  id: number;
  hiarchy?: number;
}
const FormobjectCard = (props: IFormobjectCardProps) => {
  const [addModal, setAddModal] = React.useState({
    open: false,
    content: "",
    parentId: 0,
    formObjectType: "CATEGORY",
    projectId: 0,
    hasProject: false,
  });
  const userId = usePersistStore((state) => state.id);
  const [answer, setAnswer] = React.useState("");
  const [answerId, setAnswerId] = React.useState(null);
  const [
    getAnswer,
    { data: answerData, loading: answerLoading, error: answerError },
  ] = useLazyQuery(GET_USER_ANSWER_BY_USER_ID_AND_FORM_OBJECT_ID, {
    variables: {
      userId: userId,
      formObjectId: props.id,
    },
    onCompleted(data) {
      console.log(data);
      setAnswer(
        data?.userAnswer_getUserAnswers?.result?.items[0].answerType
      );
      setAnswerId(
        data?.userAnswer_getUserAnswers?.result?.items[0].id
      );
    },
  });
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

  const [addFormObject] = useMutation(CREATE_FORM_OBJ);

  const [deleteFormObject] = useMutation(DELETE_FORM_OBJ);

  const [addAnswer] = useMutation(CREATE_USER_ANSWER);
  const [updateAnswer] = useMutation(UPDATE_USER_ANSWER);

  useEffect(() => {
    if (props.formObjectType === "QUESTION") {
      getAnswer();
    }
  }, [data]);
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
            : answer
            ? (answer === "TRUE" && GreenLight) ||
              (answer === "FALSE" && RedLight) ||
              (answer === "NEUTRAL" && YellowLight)
            : onPrimary,
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
          }`,
        }}
      >
        {props.content}
        {answerLoading && (
          <CircularProgress color="inherit" size={10} />
        )}
      </Box>

      <Box
        gridColumn={"4/6"}
        display={"flex"}
        justifyContent={"flex-end"}
        gap={5}
      >
        {props.formObjectType === "QUESTION" && (
          <Box
            width={"100%"}
            display={"grid"}
            gridTemplateColumns={"repeat(3, 1fr)"}
            gap={10}
          >
            <CAN permissionNeeded={"ADMIN"} reverse={true}>
              <LinkButton
                width={"70%"}
                backgroundColor={Green}
                onClick={() => {
                  if (answerId) {
                    updateAnswer({
                      variables: {
                        answerType: "TRUE",
                        formObjectId: props.id,
                        userId: userId,
                        id: answerId,
                      },
                      onCompleted(data) {
                        console.log(data);
                        getAnswer();
                      },
                      onError(error, clientOptions) {
                        console.log(error);
                      },
                    });
                  } else {
                    addAnswer({
                      variables: {
                        answerType: "TRUE",
                        formObjectId: props.id,
                        userId: userId,
                      },
                      onCompleted(data) {
                        console.log(data);
                        getAnswer();
                      },
                      onError(error, clientOptions) {
                        console.log(error);
                      },
                    });
                  }
                }}
              >
                بله
              </LinkButton>
            </CAN>
            <CAN permissionNeeded={"ADMIN"} reverse={true}>
              <LinkButton
                width={"70%"}
                backgroundColor={Red}
                hoverColor={red[300]}
                onClick={() => {
                  if (answerId) {
                    updateAnswer({
                      variables: {
                        answerType: "FALSE",
                        formObjectId: props.id,
                        userId: userId,
                        id: answerId,
                      },
                      onCompleted(data) {
                        console.log(data);
                        getAnswer();
                      },
                      onError(error, clientOptions) {
                        console.log(error);
                      },
                    });
                  } else {
                    addAnswer({
                      variables: {
                        answerType: "FALSE",
                        formObjectId: props.id,
                        userId: userId,
                      },
                      onCompleted(data) {
                        console.log(data);
                        getAnswer();
                      },
                      onError(error, clientOptions) {
                        console.log(error);
                      },
                    });
                  }
                }}
              >
                خیر
              </LinkButton>
            </CAN>
            <CAN permissionNeeded={"ADMIN"} reverse={true}>
              <LinkButton
                width={"70%"}
                backgroundColor={Yellow}
                textColor={textPrimary}
                onClick={() => {
                  if (answerId) {
                    updateAnswer({
                      variables: {
                        answerType: "NEUTRAL",
                        formObjectId: props.id,
                        userId: userId,
                        id: answerId,
                      },
                      onCompleted(data) {
                        console.log(data);
                        getAnswer();
                      },
                      onError(error, clientOptions) {
                        console.log(error);
                      },
                    });
                  } else {
                    addAnswer({
                      variables: {
                        answerType: "NEUTRAL",
                        formObjectId: props.id,
                        userId: userId,
                      },
                      onCompleted(data) {
                        console.log(data);
                        getAnswer();
                      },
                      onError(error, clientOptions) {
                        console.log(error);
                      },
                    });
                  }
                }}
              >
                خنثی
              </LinkButton>
            </CAN>
          </Box>
        )}
        <CAN permissionNeeded={"ADMIN"}>
          {props.formObjectType === "CATEGORY" && (
            <IButton
              title="Add Form Object"
              backgroundColor={Green}
              color={"white"}
              fun={() => {
                setAddModal({
                  ...addModal,
                  open: true,
                  projectId: props.projectId,
                  parentId: props.id,
                  hasProject: props.projectId !== null,
                });
              }}
            >
              <AddRounded />
            </IButton>
          )}
        </CAN>
        <CAN permissionNeeded={"ADMIN"}>
          <IButton
            title="Edit Form Object"
            backgroundColor={Blue}
            color={"white"}
          >
            <EditRounded />
          </IButton>
        </CAN>
        <CAN permissionNeeded={"ADMIN"}>
          <IButton
            title="Delete Form Object"
            backgroundColor={Red}
            color={"white"}
            fun={() => {
              const isAccepted = window.confirm(
                `آیا مطمئن هستید که میخواهید این فرم به آیدی ${props.id} را حذف کنید؟`
              );

              if (!isAccepted) return;

              deleteFormObject({
                variables: {
                  id: props.id,
                },
                onCompleted(data) {
                  console.log(data);
                  window.location.reload();
                },
                onError(error) {
                  console.log(error);
                },
              });
            }}
          >
            <DeleteRounded />
          </IButton>
        </CAN>
      </Box>
      {props.formObjectType === "CATEGORY" && (
        <Stack
          gridColumn={"1/6"}
          gridRow={"3"}
          width={"100%"}
          spacing={20}
          backdropBlur={"5px"}
        >
          {loading && (
            <Stack
              width={"100%"}
              height={"100%"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={10}
            >
              <Skeleton height={40} width={"100%"} />
              <Skeleton height={40} width={"100%"} />
              <Skeleton height={40} width={"100%"} />
              <Skeleton height={40} width={"100%"} />
            </Stack>
          )}
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
          {/* {addModal.hasProject && "این فرم برای پروژه ایجاد میشود"} */}
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
                    window.location.reload();
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
    </Box>
  );
};

export default FormobjectCard;
