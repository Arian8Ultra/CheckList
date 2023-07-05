/* eslint-disable @typescript-eslint/ban-types */
import { useEffect, useState } from "react";

import { Stack } from "@chakra-ui/react";
import { Box, Skeleton, Typography } from "@mui/material";
import { useLazyQuery, useMutation } from "@apollo/client";
import { AddRounded, DeleteRounded, KeyRounded } from "@mui/icons-material";

import IButton from "../../../components/IButton";
import { GET_USERS } from "../../../GraphQL/QueriesUsers";
import { DELETE_USER } from "../../../GraphQL/MutationsUsers";
import { convertRoleToPersian } from "../../../functions/function";
import { Green, GreenLight, primary, primaryLight, Red } from "../../../theme/Colors";
interface Props {
  id?: string;
  className?: string;
  openModal?: Function;
  deleteUser?: (id: string) => void;
  editUser?: (user: object) => void;
  addRole?: (user: object) => void;
  refresh?: () => void;
}

const UserList = (props: Props) => {
  const [users, setUsers] = useState([]);
  const [getUsers, { loading, error }] = useLazyQuery(
    GET_USERS,
    {
      onCompleted: (data) => {
        console.log(data);
        setUsers(data.user_getUsers.result.items);
      },
      onError: (error) => {
        console.log(error);
      },
      refetchWritePolicy: "overwrite",
    }
  );

  useEffect(() => {
    getUsers();
  }, [props.refresh]);

  useEffect(() => {
    getUsers();
  }, []);

  const [deleteUser, { loading: loadingDelete }] = useMutation(
    DELETE_USER,
    {
      onCompleted: (data) => {
        console.log(data);
        if (data.user_deleteUser.code === 1) {
          alert("کاربر با موفقیت حذف شد");
        } else {
          alert(data.user_deleteUser.value + "کاربر حذف نشد \n");
        }
        getUsers();
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  if (loading) {
    return (
      <Stack
        spacing={8}
        bgColor={"rgba(255,255,255,0.5)"}
        padding={"2rem"}
        borderRadius={"25px"}
        style={{
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"100px"}
        />
      </Stack>
    );
  }

  if (error) {
    return (
      <Stack
        spacing={8}
        bgColor={"rgba(255,255,255,0.5)"}
        padding={"2rem"}
        borderRadius={"25px"}
        style={{
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <Typography sx={{ color: "red" }}>{error.message}</Typography>
      </Stack>
    );
  }
  return (
    <Stack
      spacing={8}
      bgColor={"rgba(255,255,255,0.5)"}
      padding={"2rem"}
      borderRadius={"25px"}
      style={{
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"start"}
        alignItems={"center"}
      >
        <IButton
          backgroundColor={Green}
          hoverColor={GreenLight}
          fun={() => {
            props.openModal && props.openModal();
          }}
        >
          <AddRounded />
        </IButton>
      </Box>
      <Box
        display={"grid"}
        gridTemplateColumns={{
          xs: "repeat(3, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(5, 1fr)",
          lg: "repeat(5, 1fr)",
        }}
        padding={"2rem"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={"2rem"}
        borderRadius={"25px"}
        bgcolor={"rgba(220,220,220,0.8)"}
      >
        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            sx={{
              color: "black",
              fontWeight: "bold",
            }}
          >
            نام
          </Typography>
        </Box>

        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            sx={{
              color: "black",
            }}
          >
            نام خانوادگی
          </Typography>
        </Box>

        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            sx={{
              color: "black",
            }}
          >
            نوع کاربر
          </Typography>
        </Box>

        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            sx={{
              color: "black",
            }}
          >
            شماره تماس
          </Typography>
        </Box>

        <Box
          width={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography
            sx={{
              color: "black",
            }}
          >
            عملیات ها
          </Typography>
        </Box>
      </Box>

      {users?.map((user: any) => {
        if (user.isDeleted === false)
          return (
            <a key={user.id}>
              <Box
                display={"grid"}
                gridTemplateColumns={{
                  xs: "repeat(3, 1fr)",
                  sm: "repeat(3, 1fr)",
                  md: "repeat(5, 1fr)",
                  lg: "repeat(5, 1fr)",
                }}
                padding={"1rem"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"2rem"}
                borderRadius={"25px"}
                bgcolor={"rgba(255,255,255,0.5)"}
                sx={{
                  transition: "all 0.1s ease-in-out",
                  boxShadow: "0 0 10px rgba(0,0,0,0.2)",
                  backdropFilter: "blur(10px)",
                  "&:hover": {
                    backgroundColor: "rgba(220,220,220,0.5)",
                    cursor: "pointer",
                  },
                }}
              >
                <Box
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography sx={{ color: "black" }}>
                    {user.firstName}
                  </Typography>
                </Box>

                <Box
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography sx={{ color: "black" }}>
                    {user.lastName}
                  </Typography>
                </Box>

                <Box
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  flexDirection={"column"}
                >
                  {user.userRoles &&
                    user.userRoles.map((role: any) => (
                      <Typography
                        sx={{ color: "black" }}
                        key={role.id}
                      >
                        {convertRoleToPersian(role.roleType)}
                      </Typography>
                    ))}
                  {/* <Typography sx={{ color: "black" }}>
                    {user.userRoles && convertRoleToPersian(user.userRoles[0]?.roleType)}
                  </Typography> */}
                </Box>

                <Box
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Typography sx={{ color: "black" }}>
                    {user.phoneNumber}
                  </Typography>
                </Box>

                <Box
                  width={"100%"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Box
                    display={"flex"}
                    justifyContent={"space-evenly"}
                    alignItems={"center"}
                    width={"100%"}
                  >
                    <IButton
                      backgroundColor={Red}
                      hoverColor={"#ff0000"}
                      fun={() => {
                        props.deleteUser && props.deleteUser(user.id);
                        deleteUser({
                          variables: {
                            id: user.id,
                          },
                        });
                      }}
                    >
                      <DeleteRounded
                        sx={{
                          color: "white",
                        }}
                      />
                    </IButton>
                    {/* <IButton
                      backgroundColor={primary}
                      hoverColor={primaryLight}
                      fun={() => {
                        props.editUser && props.editUser(user);
                      }}
                    >
                      <EditRounded
                        sx={{
                          color: "white",
                        }}
                      />
                    </IButton> */}
                    <IButton
                      backgroundColor={primary}
                      hoverColor={primaryLight}
                      fun={() => {
                        props.addRole && props.addRole(user);
                      }}
                    >
                      <KeyRounded
                        sx={{
                          color: "white",
                        }}
                      />
                    </IButton>
                  </Box>
                </Box>
              </Box>
            </a>
          );
      })}
    </Stack>
  );
};

export default UserList;
