import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { GET_TITLES } from "../../api/api";
import { usePersistStore } from "../../stores/PersistStore";
import { Stack } from "@mui/material";
import TitleCard from "../../components(app)/Question/TitleCard";
import useLayoutStore from "../../stores/layoutStore";

function Questions() {
  let { questionId } = useParams();
  const [titles, setTitles] = useState([]);
  const token = usePersistStore((state) => state.token);
  const changePageName = useLayoutStore((state) => state.changePageName);
  const loction = useLocation();

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
  return (
    <Stack my={6} gap={2}>
      {titles.map((item: any) => (
        <TitleCard docTitleId={item.docTitleId} content={item.content} id={item.id} key={item.id}/>
      ))}
    </Stack>
  );
}

export default Questions;
