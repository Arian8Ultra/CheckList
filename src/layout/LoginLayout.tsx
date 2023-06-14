import { Box } from "@mui/material";
import gandonPattern from "../assets/backgroundPattern.svg";
import { Image } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { primary, primaryLight } from "../theme/Colors";

interface LoginLayoutProps {
  children?: React.ReactNode;
  id?: string;
}
const LoginLayout = (props: LoginLayoutProps) => {
  return (
    <Box
      height={"100dvh"}
      width={"100dvw"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      position={"relative"}
    >
      <Image
        src={gandonPattern}
        position={"absolute"}
        top={"50%"}
        left={"50%"}
        height={"100%"}
        width={"100%"}
        objectFit={"cover"}
        objectPosition={"center"}
        zIndex={-1}
        transform={"translate(-50%, -50%)"}
      />
      <Box
        width={"100%"}
        height={"max-content"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        padding={"2rem"}
        sx={{
            "@media (max-width: 600px)": {
                flexDirection: "column",
                width: "max-content",
            },
            "@media (min-width: 600px)": {
                flexDirection: "row",
                width: "max-content",
            },
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            borderRadius: "35px",
            backdropFilter: "blur(10px)",
            border: `1.5px solid ${primaryLight}`,
        }}
      >
        <Outlet/>
        {props.children}
      </Box>
    </Box>
  );
};

export default LoginLayout;
