/* eslint-disable react-hooks/exhaustive-deps */
import { Center } from "@chakra-ui/react";
import {
  AccountCircleRounded,
  ArrowCircleLeftRounded,
  DashboardRounded,
  HomeRounded,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import mainLayoutBackground from "../assets/wave-background.svg";
import { usePersistStore } from "../stores/PersistStore";
import useAbilityStore from "../stores/abilityStore";
import useLayoutStore from "../stores/layoutStore";
import {
  GlassBackground,
  Red,
  onPrimary,
  primary,
  primaryDark,
  primaryLight,
  secondary,
} from "../theme/Colors";
import { borderRadiuos } from "../theme/Themes";
import NewModal from "../components/Modals";
import TextInput from "../components/TextInput";
import LinkButton from "../components/LinkButton";
import CAN from "../components/CAN";
import { convertRoleToPersian } from "../functions/function";
import { CHANGE_PASSWORD } from "../GraphQL/MutationsUsers";
import { useMutation } from "@apollo/client";
import Navbar from "../components/Navbar";

function MainLayout() {
  let pageName = useLayoutStore((state) => state.pageName);
  const firstName = usePersistStore((state) => state.firstName);
  const lastName = usePersistStore((state) => state.lastName);
  const logout = usePersistStore((state) => state.logout);
  const changePageName = useLayoutStore((state) => state.changePageName);
  const clearAbilities = useAbilityStore(
    (state) => state.clearAbilities
  );
  // const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  let role = usePersistStore((state) => state.role);
  role = convertRoleToPersian(role);
  pageName = pageName ? pageName : "صفحه اصلی";
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [changePasswordModal, setChangePasswordModal] = useState({
    open: false,
    oldPassword: "",
    oldPasswordError: false,
    oldPasswordHelperText: "",
    newPassword: "",
    newPasswordError: false,
    newPasswordHelperText: "",
    newPasswordConfirm: "",
    newPasswordConfirmError: false,
    newPasswordConfirmHelperText: "",
  });

  const [addUserModal, setAddUserModal] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    nationalCode: "",
    role: "",
    open: false,
  });

  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD, {
    variables: {
      userId: usePersistStore((state) => state.id),
      oldPassword: changePasswordModal.oldPassword,
      newPassword: changePasswordModal.newPassword,
      confirmPassword: changePasswordModal.newPasswordConfirm,
    },
    onCompleted: (data) => {
      setChangePasswordModal({
        newPassword: "",
        newPasswordConfirm: "",
        oldPassword: "",
        oldPasswordError: false,
        newPasswordConfirmError: false,
        newPasswordConfirmHelperText: "",
        newPasswordError: false,
        newPasswordHelperText: "",
        oldPasswordHelperText: "",
        open: false,
      });
      alert("رمز عبور با موفقیت تغییر کرد");
      window.location.reload();
    },
    onError(error, clientOptions) {
      setChangePasswordModal({
        ...changePasswordModal,
        oldPasswordError: true,
        newPasswordError: true,
        newPasswordConfirmError: true,
      });
    },
  });

  const userId = usePersistStore((state) => state.id);
  const token = usePersistStore((state) => state.token);

  useEffect(() => {
    if (!token) {
      clearAbilities();
      logout();
    }
  }, [token, logout]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePasswordModal = () => {
    setChangePasswordModal({
      ...changePasswordModal,
      open: !changePasswordModal.open,
    });
  };

  return (
    <Box
      width={"100dvw"}
      height={"max-content"}
      minHeight={"100vh"}
      position={"relative"}
      display={"flex"}
      alignContent={"center"}
      justifyContent={"center"}
      paddingY={10}
      sx={{
        background: `url(${mainLayoutBackground})`,
        // background: `linear-gradient(180deg, ${primary} 0%, ${primary} 50%, ${onPrimary} 50%, ${onPrimary} 100%)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        // fix background on scroll
        backgroundAttachment: "fixed",
        backgroundPosition: "center center",
      }}
    >
      <Box
        width={{
          xs: "100%",
          sm: "100%",
          md: "100%",
          lg: "85%",
        }}
        marginX={"auto"}
        height={"max-content"}
        padding={{
          xs: 0,
          sm: 0,
          md: 0,
          lg: 5,
          xl: 8,
        }}
        paddingTop={{
          xs: 0,
          sm: 0,
          md: 0,
          lg: 0,
          xl: 0,
        }}
        sx={{
          backgroundColor: GlassBackground,
          backdropFilter: "blur(10px)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "start 100%",
          borderRadius: borderRadiuos,
          border: "1px solid #E0E0E0",
          position: "relative",
        }}
      >
        <Box
          position={"sticky"}
          top={5}
          display={"grid"}
          gridTemplateColumns={{
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr",
            lg: "1fr 1fr 1fr",
            xl: "1fr 1fr 1fr",
          }}
          gap={2}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            backgroundColor: primaryLight,
            padding: 2,
            borderRadius: borderRadiuos,
            marginTop: "-2rem",
            boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
            zIndex: 100,
          }}
        >
          <Box
            position={"absolute"}
            width={"20%"}
            gap={2}
            sx={{
              backgroundColor: primary,
              padding: 1,
              borderRadius: borderRadiuos,
              marginTop: "-2rem",
              boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
              zIndex: 101,
              transform: "translate(50%,50%)",
              top: {
                xs: "100%",
                md: "90%",
              },
              right: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Tooltip title={"خانه"}>
              <IconButton
                sx={{
                  backgroundColor: primary,
                  color: secondary,
                  padding: 0,
                  "&:hover": {
                    backgroundColor: primary,
                  },
                }}
                onClick={() => {
                  navigate("/home");
                }}
              >
                <HomeRounded
                  sx={{
                    width: "30px",
                    height: "30px",
                    color: primaryLight,
                  }}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title={"داشبورد"}>
              <IconButton
                sx={{
                  backgroundColor: primary,
                  color: secondary,
                  padding: 0,
                  "&:hover": {
                    backgroundColor: primary,
                  },
                }}
                onClick={() => {
                  window.open('http://dashboard-srv.mporg.ir/Reports/powerbi/test/%D8%B3%D8%A7%D9%85%D8%A7%D9%86%D9%87%20%DA%86%DA%A9%20%D9%84%DB%8C%D8%B3%D8%AA')
                }}
              >
                <DashboardRounded
                  sx={{
                    width: "30px",
                    height: "30px",
                    color: primaryLight,
                  }}
                />
              </IconButton>
            </Tooltip>
            {/* <CAN permissionNeeded={"ADMIN"}>
              <Tooltip title={"داشبورد"}>
                <IconButton
                  sx={{
                    backgroundColor: primary,
                    color: secondary,
                    padding: 0,
                    "&:hover": {
                      backgroundColor: primary,
                    },
                  }}
                  onClick={() => {
                    alert("این بخش در حال توسعه میباشد");
                    // navigate("/home");
                  }}
                >
                  <DashboardRounded
                    sx={{
                      width: "30px",
                      height: "30px",
                      color: primaryLight,
                    }}
                  />
                </IconButton>
              </Tooltip>
            </CAN> */}
            <Tooltip title={"خروج"}>
              <IconButton
                sx={{
                  color: secondary,
                  width: "30px",
                  height: "30px",
                  padding: 0,
                }}
                onClick={logout}
              >
                <Center
                  bgColor={primary}
                  width={"100%"}
                  height={"100%"}
                  borderRadius={"100%"}
                >
                  <svg
                    width="23"
                    height="24"
                    viewBox="0 0 23 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_217_1318)">
                      <path
                        d="M3.72697 18.686C2.89868 18.686 2.45774 19.6168 3.07066 20.174C4.30406 21.2951 5.78242 22.1395 7.40357 22.6363C9.67899 23.3336 12.1204 23.3109 14.3819 22.5713C16.6434 21.8318 18.6104 20.4129 20.0043 18.5156C21.3981 16.6184 22.1482 14.339 22.1482 12.0003C22.1482 9.66159 21.3981 7.38218 20.0043 5.48494C18.6104 3.58769 16.6434 2.1688 14.3819 1.42924C12.1204 0.689678 9.67899 0.666949 7.40357 1.36427C5.78242 1.86109 4.30406 2.70546 3.07066 3.8266C2.45774 4.38373 2.89868 5.31456 3.72697 5.31456H4.43193C4.67223 5.31456 4.90314 5.22628 5.09118 5.07666C6.34845 4.07633 7.85733 3.4222 9.46256 3.18523C11.1918 2.92996 12.9593 3.16963 14.5531 3.87546C16.1469 4.5813 17.4992 5.72332 18.4478 7.16449C19.3964 8.60565 19.901 10.2847 19.901 12.0003C19.901 13.7158 19.3964 15.3949 18.4478 16.8361C17.4992 18.2772 16.1469 19.4193 14.5531 20.1251C12.9593 20.8309 11.1918 21.0706 9.46256 20.8153C7.85733 20.5784 6.34845 19.9242 5.09118 18.9239C4.90314 18.7743 4.67223 18.686 4.43193 18.686H3.72697Z"
                        fill={primaryLight}
                        stroke={primaryLight}
                      />
                      <path
                        d="M5.61121 9.42871V10.643H11.926H12.426V11.143V12.8573V13.3573H11.926H5.61121V14.5716V15.5753L4.81002 14.9707L1.40261 12.3992L0.873758 12.0001L1.40261 11.601L4.81002 9.02961L5.61121 8.42498V9.42871Z"
                        fill={primaryLight}
                        stroke={primaryLight}
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_217_1318">
                        <rect
                          width="23"
                          height="24"
                          transform="matrix(-1 0 0 1 23 0)"
                          fill="white"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </Center>
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            display={"flex"}
            justifyContent={{
              xs: "center",
              md: "flex-start",
            }}
            alignItems={"center"}
          >
            <Typography
              sx={{
                color: primary,
                fontWeight: "bold",
                fontSize: "x-large",
              }}
            >
              {String(pageName)}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={2}
          >
            <Typography
              sx={{
                color: primary,
                fontWeight: "bold",
                fontSize: {
                  xs: "medium",
                  md: "large",
                  lg: "x-large",
                },
              }}
            >
              سامانه چک لیست
            </Typography>
          </Box>
          <Box
            display={"grid"}
            gridTemplateColumns={"auto auto"}
            justifyContent={{
              xs: "center",
              md: "end",
            }}
            alignItems={"center"}
            sx={
              {
                // outline: "1px solid red",
              }
            }
          >
            <Stack
              mx={3}
              justifyContent={"center"}
              alignItems={"flex-end"}
              sx={
                {
                  // outline: "1px solid blue",
                }
              }
            >
              <Typography
                sx={{
                  color: primary,
                  fontWeight: "normal",
                  fontSize: {
                    xs: "small",
                    sm: "medium",
                    md: "medium",
                  },
                  textAlign: "left",
                }}
              >
                {firstName} {lastName}
              </Typography>
              <Typography
                sx={{
                  color: primary,
                  fontWeight: "normal",
                  fontSize: "medium",
                  textAlign: "left",
                }}
              >
                {role}
              </Typography>
            </Stack>
            <Box
              display={"flex"}
              justifyContent={"flex-end"}
              alignItems={"center"}
              gap={1}
            >
              <Center>
                <IconButton
                  sx={{
                    color: secondary,
                    width: {
                      xs: "40px",
                      sm: "40px",
                      md: "53px",
                    },
                    height: {
                      xs: "40px",
                      sm: "40px",
                      md: "53px",
                    },
                    padding: 0,
                  }}
                  onClick={handleMenu}
                >
                  <AccountCircleRounded
                    sx={{
                      width: {
                        xs: "40px",
                        sm: "40px",
                        md: "53px",
                      },
                      height: {
                        xs: "40px",
                        sm: "40px",
                        md: "53px",
                      },
                      color: primary,
                    }}
                  />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleChangePasswordModal}>
                    تغییر رمزعبور
                  </MenuItem>
                  {/* <CAN permissionNeeded="addUser">
                    <MenuItem onClick={handleChangePasswordModal}>
                      افزودن کاربر
                    </MenuItem>
                  </CAN> */}
                  <CAN permissionNeeded="ADMIN">
                    <MenuItem
                      onClick={() => {
                        changePageName("مدیریت کاربران");
                        navigate("/admin/users");
                      }}
                    >
                      مدیریت کاربران
                    </MenuItem>
                  </CAN>
                </Menu>
              </Center>
              <Center>
                {window.location.pathname === "/home" ? (
                  <IconButton
                    sx={{
                      color: secondary,
                      width: {
                        xs: "35px",
                        md: "45px",
                      },
                      height: {
                        xs: "35px",
                        md: "45px",
                      },
                      padding: 0,
                    }}
                    onClick={logout}
                  >
                    <Center
                      bgColor={primary}
                      width={"100%"}
                      height={"100%"}
                      borderRadius={"100%"}
                    >
                      <svg
                        width="23"
                        height="24"
                        viewBox="0 0 23 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_217_1318)">
                          <path
                            d="M3.72697 18.686C2.89868 18.686 2.45774 19.6168 3.07066 20.174C4.30406 21.2951 5.78242 22.1395 7.40357 22.6363C9.67899 23.3336 12.1204 23.3109 14.3819 22.5713C16.6434 21.8318 18.6104 20.4129 20.0043 18.5156C21.3981 16.6184 22.1482 14.339 22.1482 12.0003C22.1482 9.66159 21.3981 7.38218 20.0043 5.48494C18.6104 3.58769 16.6434 2.1688 14.3819 1.42924C12.1204 0.689678 9.67899 0.666949 7.40357 1.36427C5.78242 1.86109 4.30406 2.70546 3.07066 3.8266C2.45774 4.38373 2.89868 5.31456 3.72697 5.31456H4.43193C4.67223 5.31456 4.90314 5.22628 5.09118 5.07666C6.34845 4.07633 7.85733 3.4222 9.46256 3.18523C11.1918 2.92996 12.9593 3.16963 14.5531 3.87546C16.1469 4.5813 17.4992 5.72332 18.4478 7.16449C19.3964 8.60565 19.901 10.2847 19.901 12.0003C19.901 13.7158 19.3964 15.3949 18.4478 16.8361C17.4992 18.2772 16.1469 19.4193 14.5531 20.1251C12.9593 20.8309 11.1918 21.0706 9.46256 20.8153C7.85733 20.5784 6.34845 19.9242 5.09118 18.9239C4.90314 18.7743 4.67223 18.686 4.43193 18.686H3.72697Z"
                            fill={primaryLight}
                            stroke={primaryLight}
                          />
                          <path
                            d="M5.61121 9.42871V10.643H11.926H12.426V11.143V12.8573V13.3573H11.926H5.61121V14.5716V15.5753L4.81002 14.9707L1.40261 12.3992L0.873758 12.0001L1.40261 11.601L4.81002 9.02961L5.61121 8.42498V9.42871Z"
                            fill={primaryLight}
                            stroke={primaryLight}
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_217_1318">
                            <rect
                              width="23"
                              height="24"
                              transform="matrix(-1 0 0 1 23 0)"
                              fill="white"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </Center>
                  </IconButton>
                ) : (
                  <IconButton
                    sx={{
                      color: secondary,
                      width: "53px",
                      height: "53px",
                      padding: 0,
                    }}
                    onClick={() => navigate(-1)}
                  >
                    <ArrowCircleLeftRounded
                      sx={{
                        width: {
                          xs: "40px",
                          sm: "40px",
                          md: "53px",
                        },
                        height: {
                          xs: "40px",
                          sm: "40px",
                          md: "53px",
                        },
                        color: primary,
                      }}
                    />
                  </IconButton>
                )}
              </Center>
            </Box>
          </Box>
        </Box>
        <Box padding={2}>
          <Outlet />
        </Box>
      </Box>

      <NewModal
        open={changePasswordModal.open}
        onClose={handleChangePasswordModal}
        name="تغییر رمزعبور"
        isCloseable={true}
        backgroundColor="white"
        color={primary}
      >
        <Stack spacing={2} padding={2} width={"100%"}>
          <TextInput
            label="رمزعبور فعلی"
            type="password"
            width={"100%"}
            value={changePasswordModal.oldPassword}
            error={changePasswordModal.oldPasswordError}
            getText={(e: any) =>
              setChangePasswordModal({
                ...changePasswordModal,
                oldPassword: e,
              })
            }
          />
          <TextInput
            label="رمزعبور جدید"
            type="password"
            width={"100%"}
            value={changePasswordModal.newPassword}
            error={changePasswordModal.newPasswordError}
            helperText={changePasswordModal.newPasswordHelperText}
            getText={(e: any) =>
              setChangePasswordModal({
                ...changePasswordModal,
                newPassword: e,
              })
            }
          />
          <TextInput
            label="تکرار رمزعبور جدید"
            type="password"
            width={"100%"}
            value={changePasswordModal.newPasswordConfirm}
            error={changePasswordModal.newPasswordConfirmError}
            helperText={
              changePasswordModal.newPasswordConfirmHelperText
            }
            getText={(e: any) =>
              setChangePasswordModal({
                ...changePasswordModal,
                newPasswordConfirm: e,
              })
            }
          />

          <LinkButton
            onClick={changePassword}
            backgroundColor={primary}
          >
            تغییر رمزعبور
          </LinkButton>
        </Stack>
      </NewModal>
    </Box>
  );
}

export default MainLayout;
