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

const Home = () => {
  const token = sessionStorage.getItem("token");
  const [DocTitles, setDocTitles] = useState([]);
  const [addModal, setAddModal] = useState({
    open: false,
    title: "",
  });
  const changePageName = useLayoutStore(
    (state) => state.changePageName
  );
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

  const handleAdd = () => {
    console.log("add");
    CREATE_SHEET({
      content: addModal.title,
      token: token,
      onFail: () => {},
      onSuccess: () => {
        handleChangeAddModal();
        window.location.reload();
      },
    });
  };

  return (
    <Stack my={6} gap={2}>
      <TextInput
        width={"100%"}
        id="search-input"
        label="جستجو"
        getText={handleSearch}
      />
      <CAN permissionNeeded="edit">
        <Box
          display={"flex"}
          gap={2}
          gridColumnStart={1}
          gridColumnEnd={2}
          gridRow={1}
        >
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
      {DocTitles.map((item: any) => {
        if (!item.isDeleted) {
          return (
            <SheetCard
              key={item.id}
              id={item.id}
              title={item.content}
              date={item.createdOn}
              isAnswered={item.isAnswered}
            />
          );
        }
      })}
      <NewModal
        open={addModal.open}
        changeModal={handleChangeAddModal}
        name="افزودن "
        isCloseable={true}
        backgroundColor="white"
        color={primary}
      >
        <Stack spacing={2}>
          <Text>تیتر مورد نظر خود را وارد نمایید</Text>
          <TextInput
            value={addModal.title}
            width={"100%"}
            fullWidth={true}
            label="تیتر"
            getText={(e: string) => {
              setAddModal({
                ...addModal,
                title: e,
              });
            }}
          />
          <LinkButton onClick={handleAdd}>ثبت</LinkButton>
        </Stack>
      </NewModal>
    </Stack>
  );
};

export default Home;
