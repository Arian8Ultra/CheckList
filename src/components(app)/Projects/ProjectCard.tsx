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
import { Box, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CAN from "../../components/CAN";
import IButton from "../../components/IButton";
import {
  DeleteForeverRounded,
  EditTwoTone,
} from "@mui/icons-material";
import NewModal from "../../components/Modals";
import TextInput from "../../components/TextInput";
import LinkButton from "../../components/LinkButton";
import { useMutation } from "@apollo/client";
import {
  DELETE_PROJECT,
  UPDATE_PROJECT,
} from "../../GraphQL/MutationsProjects";
import { usePersistStore } from "../../stores/PersistStore";
interface IProjectCardProps {
  id: number;
  title: string;
  userId: string;
  contractNumber: string;
  onDelete?: () => void;
  formObjects?: {
    id: number;
    content: string;
  }[];
}
const ProjectCard = (props: IProjectCardProps) => {
  const nav = useNavigate();
  const currentUserId = usePersistStore((state) => state.id);
  const [editModelText, setEditModelText] = useState("");
  const [editModal, setEditModalOpen] = useState({
    open: false,
    id: "",
    title: "",
    contractNumber: "",
  });
  const handleEditClick = ({ id, value, contractNumber }: any) => {
    const Id = id ? id : "";
    const title = value ? value : "";
    setEditModalOpen({
      open: true,
      id: Id,
      contractNumber: contractNumber,
      title: title,
    });
  };

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: props.id,
      title: editModal.title,
      contractNumber: editModal.contractNumber,
    },
    onCompleted(data, clientOptions) {
      console.log(data);
      window.location.reload();
    },
    onError(error, clientOptions) {
      console.log(error);
    },
  });

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: {
      id: props.id,
    },
    onCompleted(data, clientOptions) {
      console.log(data);
      props.onDelete && props.onDelete();
    },
    onError(error, clientOptions) {
      console.log(error);
      props.onDelete && props.onDelete();
    },
  });
  return (
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
        height={"100%"}
        _hover={{
          cursor: "pointer",
        }}
        onClick={() =>
          nav(`/home/project/${props.id}`, {
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
        justifyContent={"center"}
        alignItems={"center"}
        // bgColor={'red'}
        height={"100%"}
        _hover={{
          cursor: "pointer",
        }}
        onClick={() =>
          nav(`/home/project/${props.id}`, {
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
          {props?.contractNumber}
        </Typography>
      </Box>
      <Box
        display={"flex"}
        justifyContent={"flex-end"}
        alignItems={"center"}
        gap={10}
      >
        <CAN
          permissionNeeded={
            currentUserId === props.userId ? null : "ADMIN"
          }
        >
          <IButton
            backgroundColor={primary}
            hoverColor={primaryLight}
            fun={() =>
              handleEditClick({
                id: props.id,
                value: props.title,
                contractNumber: props.contractNumber,
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
        <CAN
          permissionNeeded={
            currentUserId === props.userId ? null : "ADMIN"
          }
        >
          <IButton
            backgroundColor={Red}
            hoverColor={RedLight}
            fun={deleteProject}
          >
            <DeleteForeverRounded
              sx={{
                color: "white",
              }}
            />
          </IButton>
        </CAN>
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
        <Stack spacing={20} width={"100%"}>
          <TextInput
            value={editModal.title}
            width={"100%"}
            fullWidth={true}
            label="عنوان پروژه"
            getText={(e: string) => {
              setEditModalOpen({
                ...editModal,
                title: e,
              });
            }}
          />
          <TextInput
            value={editModal.contractNumber}
            width={"100%"}
            fullWidth={true}
            label="شماره قرارداد"
            getText={(e: string) => {
              setEditModalOpen({
                ...editModal,
                contractNumber: e,
              });
            }}
          />
          <LinkButton onClick={updateProject}>ثبت</LinkButton>
        </Stack>
      </NewModal>
    </Box>
  );
};

export default ProjectCard;
