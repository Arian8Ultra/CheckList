import { Center } from "@chakra-ui/react";
import {
  VisibilityOffRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import { LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { SIGNIN } from "../../../api/api";
import LinkButton from "../../../components/LinkButton";
import TextInput from "../../../components/TextInput";
import { usePersistStore } from "../../../stores/PersistStore";
import useAbilityStore from "../../../stores/abilityStore";
import { Red, primary } from "../../../theme/Colors";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../../GraphQL/MutationsUsers";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const setUser = usePersistStore((state) => state.setUser);
  const addAbilityArray = useAbilityStore(
    (state) => state.addAbilityArray
  );
  const addAbility = useAbilityStore((state) => state.addAbility);

  const [
    userLogin,
    { loading: userLoginLoading, error: userLoginError },
  ] = useMutation(LOGIN_USER, {
    variables: {
      userName: userName,
      password: password,
    },
    onCompleted(data, clientOptions) {
      console.log(data);
      data.user_signIn.result.user?.userRoles &&
      data.user_signIn.result.user?.userRoles.map((role: any) => {
        addAbility(role.roleType);
        console.log(role.roleType);
      });
      setUser(
        data.user_signIn.result.user.firstName,
        data.user_signIn.result.user.lastName,
        data.user_signIn.result.token,
        data.user_signIn.result.user.userCurrentRole,
        data.user_signIn.result.user.id
      );
      setLoading(false);
    },
    onError(error, clientOptions) {
      console.log(error);
      setLoading(false);
      setError(true);
    },
  });

  const handleSignIn = () => {
    setLoading(true);
    setError(false);
    userLogin()
  };

  useEffect(() => {
    document.title = "ورود";
  }, []);

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
        <LinearProgress
          sx={{
            width: "100%",
            height: "0.5rem",
            borderRadius: "0.5rem",
            backgroundColor: "transparent",
            display: loading ? "block" : "none",
          }}
        />
        {/* <LinkButton
          backgroundColor="transparent"
          textColor={error ? Red : primary}
          width={"100%"}
          hoverColor={primaryLightTransparent}
          link="/signup"
        >
          ثبت نام
        </LinkButton> */}
      </Stack>
    </Form>
  );
};

export default SignIn;
