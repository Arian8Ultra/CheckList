import { Form } from "react-router-dom";
import TextInput from "../../../components/TextInput";
import { Stack, Typography } from "@mui/material";
import LinkButton from "../../../components/LinkButton";
import { Center, Image } from "@chakra-ui/react";
import logo from "../../../assets/logo.svg";
import { useEffect, useState } from "react";
import {
  VisibilityOffRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import {
  Red,
  primary,
  primaryLightTransparent,
  secondary,
} from "../../../theme/Colors";
import { SIGNIN } from "../../../api/api";
import { usePersistStore } from "../../../stores/PersistStore";
import useAbilityStore from "../../../stores/abilityStore";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const setUser = usePersistStore((state) => state.setUser);
  const firstName = usePersistStore((state) => state.firstName);
  const lastName = usePersistStore((state) => state.lastName);
  const token = usePersistStore((state) => state.token);
  const addAbilityArray = useAbilityStore((state) => state.addAbilityArray);

  const handleSignIn = () => {
    setLoading(true);
    setError(false);
    SIGNIN({
      username: userName,
      password: password,
      onSuccess: (res: any) => {
        console.log(res);
        addAbilityArray([res.role.normalizedName]);
        setUser(res.firstName, res.lastName, res.token, res.role.normalizedName, res.userId);
        setLoading(false);
      },
      onFail: (err: any) => {
        console.error(err);
        setLoading(false);
        setError(true);
      },
    });
    // setUser('آرین','رضایی','123456789')
  };

  useEffect(() => {
    error && setTimeout(() => setError(false), 3000);
  }, [error]);
  return (
    <Form onSubmit={handleSignIn}>
      <Stack width={"100%"} spacing={5}>
        <Center my={"2rem"}>
          <Typography variant="h4" color={error ? Red : primary}>
            سامانه چک لیست
          </Typography>
        </Center>
        <TextInput
          id="username"
          name="userName"
          getText={setUserName}
          label="نام کاربری"
          dir="rtl"
          width={{
            xs: "100%",
            sm: "100%",
            md: "20vmax",
            lg: "20vmax",
            xl: "20vmax",
          }}
          error={error}
        />
        <TextInput
          id="password"
          name="password"
          getText={setPassword}
          label="رمز عبور"
          dir="rtl"
          type={showPassword ? "text" : "password"}
          width={{
            xs: "100%",
            sm: "100%",
            md: "20vmax",
            lg: "20vmax",
            xl: "20vmax",
          }}
          hasIcon
          icon={
            showPassword ? (
              <VisibilityOffRounded />
            ) : (
              <VisibilityRounded />
            )
          }
          iconClick={() => setShowPassword(!showPassword)}
          iconColor={error ? Red : primary}
          error={error}
        />
        <LinkButton
          width={"100%"}
          backgroundColor={error ? Red : primary}
          type="submit"
        >
          ورود
        </LinkButton>
        <LinkButton
          backgroundColor="transparent"
          textColor={error ? Red : primary}
          width={"100%"}
          hoverColor={primaryLightTransparent}
          link="/signup"
        >
          ثبت نام
        </LinkButton>
      </Stack>
    </Form>
  );
};

export default SignIn;
