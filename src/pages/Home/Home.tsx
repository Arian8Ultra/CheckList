/* eslint-disable @typescript-eslint/no-empty-function */
import { Stack } from "@mui/material";
import Title from "../../components(app)/Title";
import { GET_SHEETS, GET_SHEETS_SEARCH } from "../../api/api";
import { useEffect, useState } from "react";
import SheetCard from "../../components(app)/Home/SheetCard";
import SearchInput from "../../components/SearchInput";
import TextInput from "../../components/TextInput";
import useLayoutStore from "../../stores/layoutStore";



const Home = () => {
  const token = sessionStorage.getItem('token');
  const [DocTitles, setDocTitles] = useState([]);
  const changePageName = useLayoutStore((state) => state.changePageName);
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
      }
    });
    changePageName('صفحه اصلی');
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
      }
    })
  }


  return (
    <Stack my={6} gap={2}>
      <TextInput width={'100%'} id="search-input" label="جستجو" getText={handleSearch}/>
      {DocTitles.map((item: any) => (
        <SheetCard
          key={item.id}
          id={item.id}
          title={item.content}
          date={item.createdOn}
          isAnswered={item.isAnswered}
        />
      ))
        }
    </Stack>
  );
};

export default Home;
