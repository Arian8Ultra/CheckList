import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  CREATE_RELATED_FILE,
  GET_RELATED_FILES,
  GET_TITLES,
} from "../../api/api";
import { usePersistStore } from "../../stores/PersistStore";
import { Box, Stack } from "@mui/material";
import TitleCard from "../../components(app)/Question/TitleCard";
import useLayoutStore from "../../stores/layoutStore";
import LinkButton from "../../components/LinkButton";
import NewModal from "../../components/Modals";
import { primary } from "../../theme/Colors";
import { Text } from "@chakra-ui/react";
import TextInput from "../../components/TextInput";
import RelatedFileCard from "../../components(app)/Question/RelatedFileCard";

function Questions() {
  const { questionId } = useParams();
  const [titles, setTitles] = useState([]);
  const [relatedFiles, setRelatedFiles] = useState([]);
  const token = usePersistStore((state) => state.token);
  const [relatedFileTitle, setRelatedFileTitle] = useState("");

  const [relatedFileDesc, setRelatedFileDesc] = useState("");

  const changePageName = useLayoutStore(
    (state) => state.changePageName,
  );
  const loction = useLocation();
  const [RelateModal, setRelateModal] = useState(false);

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
      description: relatedFileDesc,
      fileName: relatedFileTitle,
      onSuccess: onSuccess,
      onFail: onFail,
    });
  }

  return (
    <Stack my={6} gap={2}>
      {titles.map((item: any) => (
        <TitleCard
          docTitleId={item.docTitleId}
          content={item.content}
          id={item.id}
          key={item.id}
        />
      ))}
      <Box
        display={"grid"}
        gridTemplateColumns={"repeat(2,1fr)"}
        gap={5}
        width={"100%"}
      >
        <LinkButton link='-1'>تایید و بازگشت</LinkButton>
        <LinkButton onClick={changeModal}>فایل های مرتبط</LinkButton>
      </Box>

      <NewModal
        open={RelateModal}
        changeModal={changeModal}
        name='فایل های مرتبط'
        isCloseable={true}
        backgroundColor='white'
        color={primary}
      >
        <Stack spacing={2}>
          {relatedFiles.map((file: any) => (
            <RelatedFileCard key={file.id} id={file.id} fileName={file.fileName} title={file.title} description={file.description} />
          ))}
        </Stack>
      </NewModal>
    </Stack>
  );
}

export default Questions;
