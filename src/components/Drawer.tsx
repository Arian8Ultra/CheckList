/* eslint-disable @typescript-eslint/no-empty-function */
import { Drawer as MUIDrawer } from "@mui/material";
import React from "react";

interface DrawerProps {
  open?: boolean;
  onClose?: () => void;
  anchor?: "left" | "right" | "top" | "bottom";
  width?: number | string | object;
  height?: number | string | object;
  backgroundColor?: string;
  children: React.ReactNode;
  top?: number | string | object;
  bottom?: number | string | object;
  left?: number | string | object;
  right?: number | string | object;
  PaperProps?: object;
  variant?: "permanent" | "persistent" | "temporary";
  sx?: object;
  border?: string | object | number;
  borderRadius?: string | object | number;
}
function Drawer(props: DrawerProps) {
  const width = props.width || {};
  const height = props.height || "100%";
  const backgroundColor = props.backgroundColor || "white";
  const top = props.top || {};
  const bottom = props.bottom || {};
  const left = props.left || {};
  const right = props.right || {};
  const border = props.border || "none";

  return (
      <MUIDrawer
        open={props.open}
        onClose={props.onClose}

        anchor={props.anchor}
        sx={{
          "width": width,
          "height": height,
          "top": top,
          "bottom": bottom,
          "left": left,
          "right": right,
          "flexShrink": 0,
          "& .MuiDrawer-paper": {
            width: width,
          },
          ...props.sx,
        }}
        PaperProps={{
          sx: {
            backgroundColor: backgroundColor,
            border: border,
            height: height,
            top: top,
            bottom: bottom,
            left: left,
            right: right,
            borderRadius: props.borderRadius,
            ...props.PaperProps,
          },
        }}
        variant={props.variant}
      >
        {props.children}
      </MUIDrawer>
  );
}

export default Drawer;
