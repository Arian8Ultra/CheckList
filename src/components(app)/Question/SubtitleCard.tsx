import React, { useEffect, useState } from "react";
import CAN from "../../components/CAN";
import { Box, Text } from "@chakra-ui/react";
import LinkButton from "../../components/LinkButton";
import {
  CardBackground,
  Green,
  GreenLight,
  Red,
  primary,
  primaryLight,
  textPrimary,
} from "../../theme/Colors";
import { red } from "@mui/material/colors";
import { Stack } from "@mui/material";
import { usePersistStore } from "../../stores/PersistStore";
import {
  CREATE_QUESTION,
  DELETE_SUBTITLE,
  GET_QUESTIONS,
  UPDATE_SUBTITLE,
  UPDATE_TITLE,
} from "../../api/api";
import QuestionCard from "./QuestionCard";
import IButton from "../../components/IButton";
import {
  AddCircleRounded,
  DeleteForeverRounded,
  EditTwoTone,
} from "@mui/icons-material";
import NewModal from "../../components/Modals";
import TextInput from "../../components/TextInput";

interface SubtitleCardProps {
  children?: React.ReactNode;
  content?: string;
  id?: string;
  titleId?: string;
}
const SubtitleCard = (props: SubtitleCardProps) => {
  const [questions, setQuestions] = useState([]);
  const [editModelText, setEditModelText] = useState("");
  const [editModal, setEditModalOpen] = useState({
    open: false,
    id: "",
    value: "",
  });

  const [addModal, setAddModalOpen] = useState({
    open: false,
    id: "",
    value: "",
  });
  const [addModelText, setAddModelText] = useState("");
  const token = usePersistStore((state) => state.token);

  useEffect(() => {
    GET_QUESTIONS({
      setArray: setQuestions,
      token,
      ParentID: props.id,
      onSuccess: (res: any) => {
        console.log(res);
      },
      onFail: (err: any) => {
        console.log(err);
      },
    });
  }, []);

  const handleEditClick = ({ id, value }: any) => {
    let Id = id ? id : "";
    let Value = value ? value : "";
    setEditModalOpen({
      open: true,
      id: Id,
      value: Value,
    });
  };

  const handleChangeEditModal = () => {
    setEditModalOpen({
      open: !editModal.open,
      id: "",
      value: "",
    });
  };

  const handleChangeAddModal = () => {
    setAddModalOpen({
      open: !addModal.open,
      id: "",
      value: "",
    });
  };

  const handleEditAccept = () => {
    if (editModelText)
      UPDATE_SUBTITLE({
        content: editModelText,
        token: token,
        id: editModal.id,
        titleId: props.titleId,
        onSuccess: () => {
          handleChangeEditModal();
          window.location.reload();
        },
        onFail: () => {},
      });
    else {
      handleChangeEditModal();
    }
  };

  const handleDelete = () => {
    console.log("delete");
    DELETE_SUBTITLE({
      id: props.id,
      token: token,
      content: props.content,
      titleId: props.titleId,
      onFail: () => {},
      onSuccess: () => {
        // window.location.reload();
      },
    });
  };

  const handleAdd = () => {
    console.log("add");
    CREATE_QUESTION({
      content: addModelText,
      subtitleID: props.id,
      token: token,
      onFail: () => {},
      onSuccess: () => {
        handleChangeAddModal();
        window.location.reload();
      },
    });
  };
  return (
    <Box
      display={"grid"}
      gridTemplateColumns={"repeat(5, 1fr)"}
      gap={4}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"2%"}
      borderRadius={"15px"}
      sx={{
        background: "rgba(255, 255, 255, 0.5)",
        transition: "all 0.2s ease-in-out",
      }}
    >
      <CAN permissionNeeded="edit">
        <Box display={"flex"} gap={2} gridColumn={"1/2"} gridRow={1}>
          <IButton
            backgroundColor={primary}
            hoverColor={primaryLight}
            fun={() =>
              handleEditClick({
                id: props.id,
                value: props.content,
              })
            }
          >
            <EditTwoTone
              sx={{
                color: "white",
              }}
            />
          </IButton>
          <IButton
            backgroundColor={Red}
            hoverColor={red[300]}
            fun={handleDelete}
          >
            <DeleteForeverRounded
              sx={{
                color: "white",
              }}
            />
          </IButton>
          <IButton
            backgroundColor={Green}
            hoverColor={GreenLight}
            fun={() => {
              handleChangeAddModal();
            }}
          >
            <AddCircleRounded
              sx={{
                color: "white",
              }}
            />
          </IButton>
        </Box>
      </CAN>
      <Box display={"flex"} gridColumn={"2/5"} gridRow={1}>
        <Text
          fontSize={"1.25rem"}
          fontWeight={"bold"}
          color={textPrimary}
          width={"100%"}
          textAlign={"center"}
        >
          {props.content}
        </Text>
      </Box>

      <Box gridColumn={"5/6"} gridRow={1}>
        <CAN permissionNeeded="edit">
          {/* <Box
            width={"100%"}
            display={"flex"}
            dir="ltr"
          >
            <IButton backgroundColor={Red} hoverColor={red[300]}>
              <DeleteForeverRounded
                sx={{
                  color: "white",
                }}
              />
            </IButton>
          </Box> */}
        </CAN>
      </Box>

      <Stack gridRow={2} gridColumn={"1/6"} spacing={4}>
        {questions.map((question: any) => {
          if (!question.isDeleted) {
            return (
              <QuestionCard
                key={question.id}
                id={question.id}
                content={question.content}
                subtitleId={question.subtitleId}
              />
            );
          }
        })}
      </Stack>
      <NewModal
        open={editModal.open}
        changeModal={handleChangeEditModal}
        name="ویرایش"
        isCloseable={true}
        backgroundColor="white"
        color={primary}
      >
        <Stack spacing={2}>
          <Text>تیتر مورد نظر خود را وارد نمایید</Text>
          <TextInput
            value={editModal.value}
            width={"100%"}
            fullWidth={true}
            label="سر تیتر"
            getText={setEditModelText}
          />
          <LinkButton onClick={handleEditAccept}>ثبت</LinkButton>
        </Stack>
      </NewModal>

      <NewModal
        open={addModal.open}
        changeModal={handleChangeAddModal}
        name="افزودن سوال"
        isCloseable={true}
        backgroundColor="white"
        color={primary}
      >
        <Stack spacing={2}>
          <Text>سوال مورد نظر خود را وارد نمایید</Text>
          <TextInput
            value={addModal.value}
            width={"100%"}
            fullWidth={true}
            label="سوال"
            getText={setAddModelText}
          />
          <LinkButton onClick={handleAdd}>ثبت</LinkButton>
        </Stack>
      </NewModal>
    </Box>
  );
};

export default SubtitleCard;
