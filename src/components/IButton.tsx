/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { onSecondary, secondary } from "../theme/Colors";

interface IButtonProps {
  title?: string;
  text?: string;
  link?: string;
  pageTitle?: string;
  disabled?: boolean;
  fontSize?: number;
  height?: string|number|object;
  width?: string|number|object;
  minWidth?: string|number|object;
  position?: string|number|object;
  bottom?: string|number|object;
  right?: string|number|object;
  top?: string|number|object;
  left?: string|number|object;
  margin?: string|number|object;
  mt?: string|number|object;
  ml?: string|number|object;
  mr?: string|number|object;
  mb?: string|number|object;
  padding?: string|number|object;
  icon?: any;
  borderRadius?: string;
  boxShadow?: string|number|object;
  hoverColor?: string|number|object;
  fun?: any;
  color?: string;
  backgroundColor?: string;
  children?: any;
  url?: string;
  label?: string;
}

export default function IButton(props: IButtonProps) {
  const fontSize = props.fontSize != null ? props.fontSize : 20;
  const height = props.height != null ? props.height : {};
  const width = props.width != null ? props.width : {};
  const minWidth = props.minWidth != null ? props.minWidth : {};
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
  const borderRadius = props.borderRadius != null ? props.borderRadius : '10px';
  const hoverColor = props.hoverColor != null ? props.hoverColor : {};
  const color = props.color != null ? props.color : onSecondary;
  const backgroundColor = props.backgroundColor != null ? props.backgroundColor : secondary;

  const navigate = useNavigate();

  const handleClick = () => {
    if (props.fun) {
      props.fun();
    }
    if (props.pageTitle) {
      console.log(props.pageTitle);
      document.title = props.pageTitle;
    }
    if (props.link) {
      navigate(`${props.link}`);
    }
    if (props.url) {
      window.open(props.url, "_blank");
    }
  };

  return (
    <IconButton
    title={props.title}
    aria-label={props.label}
      sx={{
        "width": width,
        "height": height,
        "borderRadius": borderRadius,
        "bottom": bottom,
        "left": left,
        "right": right,
        "top": top,
        "m": margin,
        "mt": mt,
        "mr": mr,
        "ml": ml,
        "mb": mb,
        "color": color,
        "backgroundColor": backgroundColor,
        "minWidth": minWidth,
        "fontSize": fontSize,
        "padding": padding,
        "&:hover": {
          backgroundColor: hoverColor,
        },
      }}
      onClick={handleClick}
      disabled={props.disabled}
    >
      {props.icon}
      {props.children}
    </IconButton>
  );
}
