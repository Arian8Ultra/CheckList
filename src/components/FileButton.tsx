/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
import { Center } from "@chakra-ui/react";
import { Button } from "@mui/material";
import * as React from "react";
import {
  onPrimary,
  secondary,
  secondaryLight
} from "../theme/Colors";
import { borderRadiuosButton } from "../theme/Themes";

interface FileButtonProps {
  text?: string;
  link?: string;
  pageTitle: string;
  disabled?: boolean;
  fontSize?: number | object | string;
  height?: string | number | object;
  width?: string | number | object;
  minWidth?: string | number | object;
  textColor?: string | number | object;
  backgroundColor?: string | number | object;
  hoverColor?: string | number | object;
  position?: string | number | object;
  bottom?: string | number | object;
  right?: string | number | object;
  top?: string | number | object;
  left?: string | number | object;
  margin?: string | number | object;
  mt?: string | number | object;
  ml?: string | number | object;
  mr?: string | number | object;
  mb?: string | number | object;
  padding?: string | number | object;
  pt?: string | number | object;
  pl?: string | number | object;
  pr?: string | number | object;
  pb?: string | number | object;
  onClick?: Function;
  children?: any;
  fullWidth?: boolean;
  icon?: any;
  Endicon?: any;
  borderRadius?: string;
  boxShadow?: string | number | object;
  type?: string;
  variant?: any;
  border?: string;
  borderRight?: string;
  borderLeft?: string;
  borderTop?: string;
  borderBottom?: string;
  borderColor?: string;
  multiple?: boolean;
  setFiles?: Function;
  fileType?: string;
  [x: string]: any;
}

function FileButton(props: FileButtonProps) {
  const fontSize = props.fontSize != null ? props.fontSize : 16;
  const height = props.height != null ? props.height : "max-content";
  const width = props.width != null ? props.width : "max-content";
  const minWidth = props.minWidth != null ? props.minWidth : "max-content";
  const textColor = props.textColor != null ? props.textColor : onPrimary;
  const backgroundColor = props.backgroundColor != null ? props.backgroundColor : secondary;
  const hoverColor = props.hoverColor != null ? props.hoverColor : secondaryLight;
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
  const borderRadius = props.borderRadius != null ? props.borderRadius : borderRadiuosButton;
  const boxShadow = props.boxShadow != null ? props.boxShadow : {};
  const pt = props.pt != null ? props.pt : {};
  const pl = props.pl != null ? props.pl : {};
  const pr = props.pr != null ? props.pr : {};
  const pb = props.pb != null ? props.pb : {};
  const border = props.border != null ? props.border : "none";
  const borderRight = props.borderRight != null ? props.borderRight : "none";
  const borderLeft = props.borderLeft != null ? props.borderLeft : "none";
  const borderTop = props.borderTop != null ? props.borderTop : "none";
  const borderBottom = props.borderBottom != null ? props.borderBottom : "none";
  const borderColor = props.borderColor != null ? props.borderColor : "none";
  const multiple = props.multiple != null ? props.multiple : false;
  const fileType = props.fileType != null ? props.fileType : "image/*";
  const [fileName, setFileName] = React.useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [file, setFile] = React.useState(null);

  const handleFile = (e: { target: { files: any; }; }) => {
    const files = e.target.files;
    setFile(files[0]);
    props.setFiles && props.setFiles(files);
    setFileName(files[0].name);
  };

  return (
    <Button
      variant={props.variant}
      component='label'
      startIcon={props.icon}
      endIcon={props.Endicon}
      sx={{
        "width": width,
        "height": height,
        "borderRadius": borderRadius,
        "color": textColor,
        "backgroundColor": backgroundColor,
        "fontSize": fontSize,
        "position": position,
        "bottom": bottom,
        "left": left,
        "right": right,
        "top": top,
        "m": margin,
        "mt": mt,
        "mr": mr,
        "ml": ml,
        "mb": mb,
        "minWidth": minWidth,
        "padding": padding,
        "boxShadow": boxShadow,
        "border": border,
        "borderRight": borderRight,
        "borderLeft": borderLeft,
        "borderTop": borderTop,
        "borderBottom": borderBottom,
        "borderColor": borderColor,
        "pt": pt,
        "pl": pl,
        "pr": pr,
        "pb": pb,
        "&:hover": {
          backgroundColor: hoverColor,
          boxShadow: boxShadow,
        },
      }}
      disabled={props.disabled}
      fullWidth={props.fullWidth}
    >
      {/* input for file with format of fileType */}
      <input
        type='file'
        accept={fileType}
        multiple={multiple}
        onChange={handleFile}
        hidden
      />

      <Center height={"100%"}>
        {props.text}
        {props.children}
        {props.icon}
        {fileName}
      </Center>
    </Button>
  );
}

export default FileButton;
