/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  CardBackground,
  Green,
  GreenLight,
  Red,
  RedLight,
  primary,
  primaryLight,
  primaryLighter,
  textPrimary,
} from "../../theme/Colors";
import {
  CREATE_SUBTITLE,
  DELETE_TITLE,
  GET_SUBTITLES,
  UPDATE_TITLE,
} from "../../api/api";
import { usePersistStore } from "../../stores/PersistStore";
import CAN from "../../components/CAN";
import LinkButton from "../../components/LinkButton";
import { red } from "@mui/material/colors";
import { Stack } from "@mui/material";
import SubtitleCard from "./SubtitleCard";
import NewModal from "../../components/Modals";
import TextInput from "../../components/TextInput";
import IButton from "../../components/IButton";
import {
  AddCircleRounded,
  DeleteForeverRounded,
  EditAttributesRounded,
  EditTwoTone,
} from "@mui/icons-material";

interface TitleCardProps {
  children?: React.ReactNode;
  id?: string;
  title?: string;
  content?: string;
  docTitleId?: string;
}
const TitleCard = (props: TitleCardProps) => {
  const [subtitles, setSubtitles] = useState([]);
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
    GET_SUBTITLES({
      setArray: setSubtitles,
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

  const handleonClose = () => {
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
      UPDATE_TITLE({
        content: editModelText,
        token: token,
        id: editModal.id,
        docTitleId: props.docTitleId,
        onSuccess: () => {
          handleonClose();
          window.location.reload();
        },
        onFail: () => {},
      });
    else {
      handleonClose();
    }
  };

  const handleDelete = () => {
    console.log("delete");
    DELETE_TITLE({
      id: props.id,
      token: token,
      onFail: () => {},
      onSuccess: () => {
        // handleonClose();
        window.location.reload();
      },
    });
  };

  const handleAdd = () => {
    console.log("add");
    CREATE_SUBTITLE({
      content: addModelText,
      titleID: props.id,
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
        background: CardBackground,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        transition: "all 0.2s ease-in-out",
      }}
    >
      <CAN permissionNeeded="edit">
        <Box
          display={"flex"}
          gap={2}
          gridColumnStart={1}
          gridColumnEnd={2}
          gridRow={1}
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

      <Box gridColumnStart={5} gridColumnEnd={6} gridRow={1}>
        <CAN permissionNeeded="edit">
          {/* <Box
            width={"100%"}
            display={"flex"}
            dir={"ltr"}
          >
            <IButton backgroundColor={Red} hoverColor={red[300]}>
              <DeleteForeverRounded sx={{
                color: "white"
              }}/>
            </IButton>
          </Box> */}
        </CAN>
      </Box>

      <Stack gridRow={2} gridColumn={"1/6"} spacing={4}>
        {subtitles.map((subtitle: any) => {
          if (!subtitle.isDeleted) {
            return(
              <SubtitleCard
                content={subtitle.content}
                id={subtitle.id}
                key={subtitle.id}
                titleId={subtitle.titleId}
              />
            )
          }
        })}
      </Stack>
      <NewModal
        open={editModal.open}
        onClose={handleonClose}
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

      <NewModal
        open={addModal.open}
        onClose={handleChangeAddModal}
        name="افزودن سوال"
        isCloseable={true}
        backgroundColor="white"
        color={primary}
      >
        <Stack spacing={2}>
          <Text>تیتر مورد نظر خود را وارد نمایید</Text>
          <TextInput
            value={addModal.value}
            width={"100%"}
            fullWidth={true}
            label="تیتر"
            getText={setAddModelText}
          />
          <LinkButton onClick={handleAdd}>ثبت</LinkButton>
        </Stack>
      </NewModal>
    </Box>
  );
};

export default TitleCard;
