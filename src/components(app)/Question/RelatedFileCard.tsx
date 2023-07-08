import {
  DeleteRounded,
  DownloadRounded,
  ExpandMoreRounded,
} from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import React from "react";
import IButton from "../../components/IButton";
import { DownloadFile } from "../../api/api";
import { usePersistStore } from "../../stores/PersistStore";
import { Green, GreenLight, Red, RedLight } from "../../theme/Colors";
import { useMutation } from "@apollo/client";
import { DELETE_RELATED_FILE } from "../../GraphQL/MutationRelatedFile";
interface Props {
  id?: string;
  title?: string;
  description?: string;
  fileName?: string;
  children?: React.ReactNode;
}
const RelatedFileCard = (props: Props) => {
  const token = usePersistStore((state) => state.token);

  function onDownloadClick() {
    console.log(
      "download    " +
        String(props.fileName).split(".")[0] +
        "   " +
        String(props.fileName).split(".")[1],
    );
    DownloadFile({
      token: token,
      fileName: props.fileName,
      mimeType: String(props.fileName).split(".")[1],
      fileTitle: props.title,
      onSuccess: (res: any) => {
        console.log(res);
      },
      onFail: (err: any) => {
        console.log(err);
      },
    });
  }

  const [deleteRelatedFile] = useMutation(DELETE_RELATED_FILE,{
    variables:{
      id:props.id
    },
    onCompleted(data, clientOptions) {
      console.log(data);
      alert("فایل مورد نظر با موفقیت حذف شد");
      window.location.reload();
    },
    onError(error, clientOptions) {
      console.log(error);
      alert("مشکلی در حذف فایل پیش آمده است");
    },
  })
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreRounded />}>
        <Box
          display={"grid"}
          width={'100%'}
          gridTemplateColumns={"repeat(3, 1fr)"}
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
          {/* <Typography
            variant={"body1"}
            sx={{
              color: "#000",
              fontWeight: "bold",
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            {props.id}
          </Typography> */}
          {/* <Typography
            variant={"body1"}
            sx={{
              color: "#000",
              fontWeight: "bold",
              fontSize: "1.2rem",
              textAlign: "center",
            }}
          >
            {props.title}
          </Typography> */}

          <Typography
            variant={"body1"}
            sx={{
              color: "#000",
              fontWeight: "bold",
              fontSize: "1rem",
              textAlign: "center",
            }}
          >
            {props.title}
          </Typography>

          <IButton
            fun={onDownloadClick}
            backgroundColor={Green}
            hoverColor={GreenLight}
          >
            <DownloadRounded
              sx={{
                color: "white",
              }}
            />
          </IButton>
          <IButton
            fun={()=>{
              confirm("آیا از حذف فایل مورد نظر اطمینان دارید؟")&&
              deleteRelatedFile({
                variables:{
                  id:props.id
                }
              })
            }}
            backgroundColor={Red}
            hoverColor={RedLight}
          >
            <DeleteRounded
              sx={{
                color: "white",
              }}
            />
          </IButton>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          توضیحات
        </Typography>
        <Typography
          variant={"body1"}
          sx={{
            color: "#000",
            fontWeight: "bold",
            fontSize: "1rem",
            textAlign: "start",
          }}
        >
          {props.description}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default RelatedFileCard;
