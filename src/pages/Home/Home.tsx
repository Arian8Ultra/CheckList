/* eslint-disable @typescript-eslint/no-empty-function */
import { Stack } from "@mui/material";
import Title from "../../components(app)/Title";
import {
  CREATE_SHEET,
  CREATE_SUBTITLE,
  DELETE_TITLE,
  GET_SHEETS,
  GET_SHEETS_SEARCH,
  UPDATE_TITLE,
} from "../../api/api";
import { useEffect, useState } from "react";
import SheetCard from "../../components(app)/Home/SheetCard";
import SearchInput from "../../components/SearchInput";
import TextInput from "../../components/TextInput";
import useLayoutStore from "../../stores/layoutStore";
import CAN from "../../components/CAN";
import { Box, Text } from "@chakra-ui/react";
import IButton from "../../components/IButton";
import {
  Green,
  GreenLight,
  Red,
  RedLight,
  primary,
  primaryLight,
} from "../../theme/Colors";
import {
  AddCircleRounded,
  DeleteForeverRounded,
  EditTwoTone,
} from "@mui/icons-material";
import NewModal from "../../components/Modals";
import LinkButton from "../../components/LinkButton";
import ProjectsList from "../../components(app)/Projects/ProjectsList";
import { usePersistStore } from "../../stores/PersistStore";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT } from "../../GraphQL/MutationsProjects";

const Home = () => {
  const currentUserId = usePersistStore((state) => state.id);
  const token = sessionStorage.getItem("token");
  const [DocTitles, setDocTitles] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [addModal, setAddModal] = useState({
    open: false,
    title: "",
    contractNumber: "",
  });
  const changePageName = useLayoutStore(
    (state) => state.changePageName
  );
  const [addProject] = useMutation(CREATE_PROJECT, {
    variables: {
      title: addModal.title,
      contractNumber: addModal.contractNumber,
      userId: currentUserId,
    },
    onCompleted(data, clientOptions) {
      console.log(data);
      setRefetch(!refetch);
      setAddModal({
        ...addModal,
        open: false,
        title: "",
        contractNumber: "",
      });
    },
    onError(error, clientOptions) {
      console.log(error);
      setRefetch(!refetch);
    },
  });
  useEffect(() => {
    GET_SHEETS({
      signOut: () => {},
      token,
      setArray: setDocTitles,
      onSuccess: (res: any) => {
        console.log(res);
        setDocTitles(res);
      },
      onFail: (err: any) => {
        console.log(err);
      },
    });
    changePageName("صفحه اصلی");
  }, []);

  const handleSearch = (e: any) => {
    GET_SHEETS_SEARCH({
      token,
      search: e,
      setArray: setDocTitles,
      signOut: () => {},
      onFail: (err: any) => {
        console.log(err);
      },
      onSuccess: (res: any) => {
        console.log(res);
        setDocTitles(res);
      },
    });
  };

  const handleChangeAddModal = () => {
    setAddModal({
      ...addModal,
      open: !addModal.open,
    });
  };


  useEffect(() => {
    document.title = "صفحه اصلی | سامانه چک لیست";
  }, []);

  return (
    <Stack my={6} gap={2}>
      <CAN permissionNeeded="ADMIN">
        <Box
          display={"flex"}
          gap={2}
          gridColumnStart={1}
          gridColumnEnd={2}
          gridRow={1}
        >
          <IButton
            title="افزودن پروژه"
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
      <ProjectsList refetch={refetch} />
      <NewModal
        open={addModal.open}
        onClose={handleChangeAddModal}
        name="افزودن "
        isCloseable={true}
        backgroundColor="white"
        color={primary}
      >
        <Stack spacing={2} width={"100%"}>
          <TextInput
            value={addModal.title}
            width={"100%"}
            fullWidth={true}
            label="عنوان پروژه"
            getText={(e: string) => {
              setAddModal({
                ...addModal,
                title: e,
              });
            }}
          />
          <TextInput
            value={addModal.contractNumber}
            width={"100%"}
            fullWidth={true}
            label="شماره قرارداد"
            getText={(e: string) => {
              setAddModal({
                ...addModal,
                contractNumber: e,
              });
            }}
          />
          <LinkButton onClick={addProject}>ثبت</LinkButton>
        </Stack>
      </NewModal>
    </Stack>
  );
};

export default Home;
