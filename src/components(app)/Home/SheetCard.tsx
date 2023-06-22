import { Box, Stack, Text } from "@chakra-ui/react";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import {
  CardBackground,
  Red,
  RedLight,
  primary,
  primaryLight,
  textPrimary,
} from "../../theme/Colors";
import { useNavigate } from "react-router-dom";
import { DELETE_SHEET, UPDATE_SHEET } from "../../api/api";
import { usePersistStore } from "../../stores/PersistStore";
import IButton from "../../components/IButton";
import CAN from "../../components/CAN";
import {
  DeleteForeverRounded,
  EditTwoTone,
} from "@mui/icons-material";
import NewModal from "../../components/Modals";
import TextInput from "../../components/TextInput";
import LinkButton from "../../components/LinkButton";

interface SheetCardProps {
  children?: React.ReactNode;
  id?: string;
  title?: string;
  description?: string;
  date?: string | number;
  isAnswered?: boolean;
}

function SheetCard(props: SheetCardProps) {
  const nav = useNavigate();
  const token = usePersistStore((state) => state.token);
  const [editModelText, setEditModelText] = useState("");
  const [editModal, setEditModalOpen] = useState({
    open: false,
    id: "",
    value: "",
  });

  const handleDelete = () => {
    console.log("delete");
    DELETE_SHEET({
      id: props.id,
      token: token,
      onFail: () => {},
      onSuccess: () => {
        window.location.reload();
      },
    });
  };

  const handleEditAccept = () => {
    if (editModelText)
      UPDATE_SHEET({
        content: editModelText,
        token: token,
        id: editModal.id,
        onSuccess: () => {
          setEditModalOpen({
            ...editModal,
            open: false,
          });
          window.location.reload();
        },
        onFail: () => {},
      });
    else {
      setEditModalOpen({
        ...editModal,
        open: false,
      });
    }
  };

  const handleEditClick = ({ id, value }: any) => {
    let Id = id ? id : "";
    let Value = value ? value : "";
    setEditModalOpen({
      open: true,
      id: Id,
      value: Value,
    });
  };

  return (
    <Box
      display={"grid"}
      gridTemplateColumns={"repeat(2, 1fr)"}
      gap={4}
      justifyContent={"center"}
      alignItems={"center"}
      padding={"1%"}
      borderRadius={"15px"}
      sx={{
        background: CardBackground,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        // bgColor={'red'}
        height={'100%'}
        _hover={{
          cursor: "pointer",
        }}
        onClick={() =>
          nav(`/home/questions/${props.id}`, {
            state: { title: props.title },
          })
        }
      >
        <Typography
          sx={{
            color: textPrimary,
            fontWeight: "bold",
            fontSize: "medium",
          }}
        >
          {props?.title}
        </Typography>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        gap={10}
      >
        <CAN permissionNeeded="edit">
          <IButton
            backgroundColor={primary}
            hoverColor={primaryLight}
            fun={() =>
              handleEditClick({
                id: props.id,
                value: props.title,
              })
            }
          >
            <EditTwoTone
              sx={{
                color: "white",
              }}
            />
          </IButton>
        </CAN>
        <CAN permissionNeeded="edit">
          <IButton
            backgroundColor={Red}
            hoverColor={RedLight}
            fun={handleDelete}
          >
            <DeleteForeverRounded
              sx={{
                color: "white",
              }}
            />
          </IButton>
        </CAN>
        <Typography
          sx={{
            color: textPrimary,
            fontWeight: "normal",
            fontSize: "medium",
            textAlign: "end",
          }}
        >
          {props.date &&
            new Date(props.date).toLocaleDateString("fa-IR")}
        </Typography>
      </Box>
      <NewModal
        open={editModal.open}
        changeModal={() => {
          setEditModalOpen({
            ...editModal,
            open: false,
          });
        }}
        name="ویرایش"
        isCloseable={true}
        backgroundColor="white"
        color={primary}
      >
        <Stack spacing={20} width={'100%'}>
          <Text>تیتر مورد نظر خود را وارد نمایید</Text>
          <TextInput
            value={editModal.value}
            width={"100%"}
            fullWidth={true}
            label="سر تیتر"
            getText={setEditModelText}
            multiline={true}
          />
          <LinkButton onClick={handleEditAccept}>ثبت</LinkButton>
        </Stack>
      </NewModal>
    </Box>
  );
}

export default SheetCard;
