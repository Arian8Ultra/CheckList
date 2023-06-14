import { Box, Stack, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  CardBackground,
  Green,
  GreenLight,
  Red,
  RedLight,
  Yellow,
  YellowLight,
  primary,
  primaryLight,
  textPrimary,
} from "../../theme/Colors";
import LinkButton from "../../components/LinkButton";
import { red } from "@mui/material/colors";
import {
  CREATE_ANSWER,
  DELETE_QUESTION,
  GET_ANSWERS_BY_QUESTION_AND_USER,
  UPDATE_QUESTION,
} from "../../api/api";
import { usePersistStore } from "../../stores/PersistStore";
import IButton from "../../components/IButton";
import {
  DeleteForeverRounded,
  EditTwoTone,
} from "@mui/icons-material";
import NewModal from "../../components/Modals";
import TextInput from "../../components/TextInput";
import CAN from "../../components/CAN";

interface QuestionCardProps {
  children?: React.ReactNode;
  id?: string;
  content?: string;
  subtitleId?: string;
}

const QuestionCard = (props: QuestionCardProps) => {
  const [hasAnswered, setHasAnswered] = React.useState(false);
  const [answer, setAnswer] = useState(0);
  const [backgroundColor, setBackgroundColor] =
    useState(CardBackground);
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
  const userId = usePersistStore((state) => state.id);

  useEffect(() => {
    GET_ANSWERS_BY_QUESTION_AND_USER({
      userId: userId,
      questionId: props.id,
      token: token,
      onFail: () => {},
      onSuccess: (res: any) => {
        setHasAnswered(true);
        if (res.result) {
          console.log(props.id + " has been answered");
          console.log(res.result.answer);
          if (res.result.answer === 1) {
            setBackgroundColor(GreenLight);
          } else if (res.result.answer === 2) {
            setBackgroundColor(RedLight);
          } else if (res.result.answer === 3) {
            setBackgroundColor(YellowLight);
          }
        }
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

  const handleChangeModal = () => {
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
      UPDATE_QUESTION({
        content: editModelText,
        token: token,
        id: props.id,
        subtitleId: props.subtitleId,
        onSuccess: () => {
          handleChangeModal();
          window.location.reload();
        },
        onFail: () => {},
      });
    else {
      handleChangeModal();
    }
  };

  const handleDelete = () => {
    console.log("delete");
    DELETE_QUESTION({
      id: props.id,
      token: token,
      content: props.content,
      subtitleId: props.subtitleId,
      onFail: () => {},
      onSuccess: () => {
        // handleChangeModal();
        // window.location.reload();
      },
    });
  };

  const handleSetData = (ans: any) => {
    CREATE_ANSWER({
      answer: ans,
      questionId: props.id,
      userId: userId,
      token: token,
      onFail: () => {},
      onSuccess: () => {
        // window.location.reload();
      },
    });
  };

  const handleTrueClicked = () => {
    handleSetData(1);
    setAnswer(1);
    setBackgroundColor(Green);
  };

  const handleFalseClicked = () => {
    handleSetData(2);
    setAnswer(2);
    setBackgroundColor(Red);
  };

  const handleNeutralClicked = () => {
    handleSetData(3);
    setAnswer(3);
    setBackgroundColor(Yellow);
  };

  return (
    <Box
      display={"grid"}
      gridTemplateColumns={"repeat(8, 1fr)"}
      gap={2}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"1%"}
      borderRadius={"15px"}
      sx={{
        background: backgroundColor,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        transition: "all 0.2s ease-in-out",
      }}
    >
      <Box display={"flex"} gridColumn={"1/6"}>
        {props.content}
      </Box>
      <Box gridColumn={6 / 7}>
        <LinkButton
          width={"70%"}
          backgroundColor={Green}
          onClick={handleTrueClicked}
        >
          بله
        </LinkButton>
      </Box>

      <Box gridColumn={7 / 8}>
        <LinkButton
          width={"70%"}
          backgroundColor={Red}
          hoverColor={red[300]}
          onClick={handleFalseClicked}
        >
          خیر
        </LinkButton>
      </Box>
      <Box gridColumn={8 / 9}>
        <LinkButton
          width={"70%"}
          backgroundColor={Yellow}
          textColor={textPrimary}
          onClick={handleNeutralClicked}
        >
          خنثی
        </LinkButton>
      </Box>

      <CAN permissionNeeded="edit">
        <Box
          display={"flex"}
          gap={2}
          gridColumn={"1/2"}
          gridRow={1}
          gridRowStart={2}
        >
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
        </Box>
      </CAN>
      <NewModal
        open={editModal.open}
        changeModal={handleChangeModal}
        name="ویرایش"
        isCloseable={true}
        backgroundColor="white"
        color={primary}
      >
        <Stack spacing={2}>
          <Text>سر تیتر مورد نظر خود را وارد نمایید</Text>
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
    </Box>
  );
};

export default QuestionCard;
