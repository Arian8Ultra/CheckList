/* eslint-disable @typescript-eslint/no-empty-function */
import { useMutation } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import {
  AddCircleRounded
} from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { CREATE_PROJECT } from "../../GraphQL/MutationsProjects";
import {
  GET_SHEETS,
  GET_SHEETS_SEARCH
} from "../../api/api";
import ProjectsList from "../../components(app)/Projects/ProjectsList";
import CAN from "../../components/CAN";
import IButton from "../../components/IButton";
import LinkButton from "../../components/LinkButton";
import NewModal from "../../components/Modals";
import TextInput from "../../components/TextInput";
import { usePersistStore } from "../../stores/PersistStore";
import useLayoutStore from "../../stores/layoutStore";
import {
  Green,
  GreenLight,
  primary
} from "../../theme/Colors";

const Home = () => {
  const currentUserId = usePersistStore((state) => state.id);
  const token = sessionStorage.getItem("token");
  const [, setDocTitles] = useState([]);
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
    onCompleted(data) {
      console.log(data);
      setRefetch(!refetch);
      setAddModal({
        ...addModal,
        open: false,
        title: "",
        contractNumber: "",
      });
    },
    onError(error) {
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
  }, [changePageName, token]);


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
      <CAN permissionNeeded="NORMAL">
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
