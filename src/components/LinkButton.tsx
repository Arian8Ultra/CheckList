/* eslint-disable @typescript-eslint/ban-types */
import { Center } from "@chakra-ui/react";
import { Button } from "@mui/material";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { onPrimary, primary, primaryLight } from "../theme/Colors";
import { borderRadiuosButton } from "../theme/Themes";

interface LinkButtonProps {
  text?: string;
  link?: string;
  pageTitle?: string;
  disabled?: boolean;
  fontSize?: number;
  height?: object | number | string;
  width?: object | number | string;
  minWidth?: object | number | string;
  textColor?: object | number | string;
  backgroundColor?: string;
  hoverColor?: string;
  position?: object | number | string;
  bottom?: object | number | string;
  right?: object | number | string;
  top?: object | number | string;
  left?: object | number | string;
  margin?: object | number | string;
  mt?: object | number | string;
  ml?: object | number | string;
  mr?: object | number | string;
  mb?: object | number | string;
  padding?: object | number | string;
  pt?: object | number | string;
  pl?: object | number | string;
  pr?: object | number | string;
  pb?: object | number | string;
  onClick?: Function;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: ReactNode | object | any;
  fun?: Function;
  fullWidth?: boolean;
  icon?: string;
  Endicon?: string;
  borderRadius?: string;
  boxShadow?: object | number | string;
  type?: "button" | "submit" | "reset";
  variant?: "contained" | "text" | "outlined";
  border?: object | number | string;
  borderRight?: string;
  borderLeft?: string;
  borderTop?: string;
  borderBottom?: string;
  borderColor?: string;
  href?: string;
}

export default function LinkButton(props: LinkButtonProps) {
  const disabled = props.disabled != null ? props.disabled : false;
  const fontSize = props.fontSize != null ? props.fontSize : 18;
  const height = props.height != null ? props.height : "max-content";
  const width = props.width != null ? props.width : "100%";
  const minWidth = props.minWidth != null ? props.minWidth : "max-content";
  const textColor = props.textColor != null ? props.textColor : onPrimary;
  const backgroundColor = props.backgroundColor || primary;
  const hoverColor = props.hoverColor != null ? props.hoverColor : primaryLight;
  const position = props.position != null ? props.position : {};
  const bottom = props.bottom != null ? props.bottom : {};
  const right = props.right != null ? props.right : {};
  const top = props.top != null ? props.top : {};
  const left = props.left != null ? props.left : {};
  const margin = props.margin != null ? props.margin : {};
  const mt = props.mt != null ? props.mt : {};
  const ml = props.ml != null ? props.ml : {};
  const mr = props.mr != null ? props.mr : {};
  const mb = props.mb != null ? props.mb : {};
  const padding = props.padding != null ? props.padding : {};
  const fullWidth = props.fullWidth != null ? props.fullWidth : false;
  const borderRadius = props.borderRadius != null ? props.borderRadius : borderRadiuosButton;
  const boxShadow = props.boxShadow != null ? props.boxShadow : {};
  const pt = props.pt != null ? props.pt : {};
  const pl = props.pl != null ? props.pl : {};
  const pr = props.pr != null ? props.pr : {};
  const pb = props.pb != null ? props.pb : {};
  const type = props.type != null ? props.type : "button";
  const border = props.border != null ? props.border : "none";
  const borderRight = props.borderRight != null ? props.borderRight : "none";
  const borderLeft = props.borderLeft != null ? props.borderLeft : "none";
  const borderTop = props.borderTop != null ? props.borderTop : "none";
  const borderBottom = props.borderBottom != null ? props.borderBottom : "none";
  const borderColor = props.borderColor != null ? props.borderColor : "none";

  const navigate = useNavigate();

  const handleClick = () => {
    props.onClick &&
    props.onClick();
    if (props.fun) {
      props.fun();
    }
    if (props.pageTitle) {
      console.log(props.pageTitle);
      document.title = props.pageTitle ? props.pageTitle : "";
    }
    if (props.link) {
      navigate(`${props.link}`);
    }
    if (props.href) {
      window.open(props.href, "_blank");
    }
  };

  return (
    <Button
      variant={props.variant}
      type={type}
      startIcon={props.icon}
      endIcon={props.Endicon}
      sx={{
        width: width,
        height: height,
        borderRadius: borderRadius,
        color: textColor,
        backgroundColor: backgroundColor,
        fontSize: fontSize,
        position: position,
        bottom: bottom,
        left: left,
        right: right,
        top: top,
        m: margin,
        mt: mt,
        mr: mr,
        ml: ml,
        mb: mb,
        minWidth: minWidth,
        padding: padding,
        boxShadow: boxShadow,
        border: border,
        borderRight: borderRight,
        borderLeft: borderLeft,
        borderTop: borderTop,
        borderBottom: borderBottom,
        borderColor: borderColor,
        pt: pt,
        pl: pl,
        pr: pr,
        pb: pb,
        "&:hover": {
          backgroundColor: hoverColor,
          boxShadow: boxShadow,
        },
      }}
      onClick={handleClick}
      disabled={disabled}
      fullWidth={fullWidth}
    >
      <Center height={"100%"}>
        {props.text}
        {props.children}
      </Center>
    </Button>
  );
} 