import React, { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  CREATE_RELATED_FILE,
  CREATE_TITLE,
  GET_RELATED_FILES,
  GET_TITLES,
} from "../../api/api";
import { usePersistStore } from "../../stores/PersistStore";
import { Stack } from "@mui/material";
import TitleCard from "../../components(app)/Question/TitleCard";
import useLayoutStore from "../../stores/layoutStore";
import LinkButton from "../../components/LinkButton";
import NewModal from "../../components/Modals";
import { Green, GreenLight, primary } from "../../theme/Colors";
import { Box, Text } from "@chakra-ui/react";
import TextInput from "../../components/TextInput";
import RelatedFileCard from "../../components(app)/Question/RelatedFileCard";
import IButton from "../../components/IButton";
import { AddCircleRounded } from "@mui/icons-material";
import CAN from "../../components/CAN";

function Questions() {
  const { questionId } = useParams();
  const [titles, setTitles] = useState([]);
  const [relatedFiles, setRelatedFiles] = useState([]);
  const token = usePersistStore((state) => state.token);
  const [relatedFileTitle, setRelatedFileTitle] = useState("");
  const [addRelatedFileModal, setAddRelatedFileModal] = useState({
    open: false,
    description: "",
    fileName: "",
  });
  const navigate = useNavigate();
  const [relatedFileDesc, setRelatedFileDesc] = useState("");

  const changePageName = useLayoutStore(
    (state) => state.changePageName
  );
  const loction = useLocation();
  const [RelateModal, setRelateModal] = useState(false);
  const [addModal, setAddModal] = useState({
    open: false,
    title: "",
  });
  const changeModal = () => {
    GET_RELATED_FILES({
      token: token,
      docTitleID: questionId,
      onSuccess: () => {
        console.log("success");
        setRelateModal(!RelateModal);
      },
      onFail: () => {
        alert("خطا در دریافت اطلاعات");
      },
      setArray: setRelatedFiles,
    });
  };

  useEffect(() => {
    GET_TITLES({
      setArray: setTitles,
      token,
      ParentID: questionId,
      onSuccess: (res: any) => {
        console.log(res);
      },
      onFail: (err: any) => {
        console.log(err);
      },
    });
    changePageName(loction.state.title);
  }, []);

  function handleConnect() {
    const onSuccess = () => {
      alert("ارتباط برقرار شد");
    };
    const onFail = () => {
      alert("ارتباط برقرار نشد");
    };

    CREATE_RELATED_FILE({
      token: token,
      docTitleId: questionId,
      description: addRelatedFileModal.description,
      fileName: addRelatedFileModal.fileName,
      onSuccess: onSuccess,
      onFail: onFail,
    });
  }

  const handleOpenAddRelatedFileModal = () => {
    setAddRelatedFileModal({
      ...addRelatedFileModal,
      open: !addRelatedFileModal.open,
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
    CREATE_TITLE({
      content: addModal.title,
      token: token,
      docTitleID: questionId,
      onFail: () => {},
      onSuccess: () => {
        handleChangeAddModal();
        window.location.reload();
      },
    });
  };

  return (
    <Stack my={6} gap={2}>
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
      {titles.map((item: any) => {
        if (item.isDeleted) {
          return null;
        }
        return (
          <TitleCard
            docTitleId={item.docTitleId}
            content={item.content}
            id={item.id}
            key={item.id}
          />
        );
      })}
      <Box
        display={"grid"}
        gridTemplateColumns={"repeat(2,1fr)"}
        gap={5}
        width={"100%"}
      >
        <LinkButton
          onClick={() => {
            navigate(-1);
          }}
        >
          تایید و بازگشت
        </LinkButton>
        <LinkButton onClick={changeModal}>فایل های مرتبط</LinkButton>
      </Box>

      <NewModal
        open={RelateModal}
        changeModal={changeModal}
        name="فایل های مرتبط"
        isCloseable={true}
        backgroundColor="white"
        color={primary}
        width={"50%"}
      >
        <Stack spacing={2}>
          <Box display="flex" flexDirection="row" gap={2}>
            <IButton
              backgroundColor={Green}
              hoverColor={GreenLight}
              fun={() => {
                handleOpenAddRelatedFileModal();
              }}
            >
              <AddCircleRounded
                sx={{
                  color: "white",
                }}
              />
            </IButton>
          </Box>
          {relatedFiles.map((file: any) => (
            <RelatedFileCard
              key={file.id}
              id={file.id}
              fileName={file.fileName}
              title={file.title}
              description={file.description}
            />
          ))}
        </Stack>
      </NewModal>

      <NewModal
        open={addRelatedFileModal.open}
        changeModal={() => {
          setAddRelatedFileModal({
            ...addRelatedFileModal,
            open: !addRelatedFileModal.open,
          });
        }}
        name="افزودن فایل مرتبط"
        isCloseable={true}
        backgroundColor="white"
        color={primary}
        width={"50%"}
      >
        <Stack spacing={2} width={"100%"}>
          <Box
            display="grid"
            gridTemplateColumns={"repeat(2,1fr)"}
            gap={20}
            width={"100%"}
            justifyContent={"center"}
            // bgColor={'red'}
            alignItems={"center"}
          >
            <TextInput
              value={relatedFileTitle}
              getText={(e: string) =>
                setAddRelatedFileModal({
                  ...addRelatedFileModal,
                  fileName: e,
                })
              }
              fullWidth={true}
              width={'100%'}
              placeholder="لینک فایل"
            />
            <TextInput
              value={relatedFileDesc}
              multiline={true}
              maxRows={4}
              fullWidth={true}
              width={'100%'}
              getText={(e: string) =>
                setAddRelatedFileModal({
                  ...addRelatedFileModal,
                  description: e,
                })
              }
              placeholder="توضیحات"
            />
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            gap={2}
            width={"100%"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <LinkButton
              backgroundColor={Green}
              hoverColor={GreenLight}
              width={"50%"}
              onClick={() => {
                handleConnect();
              }}
            >
              ثبت
            </LinkButton>
          </Box>
        </Stack>
      </NewModal>
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
}

export default Questions;
