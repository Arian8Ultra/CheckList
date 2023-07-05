/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as React from "react";
// @ts-ignore
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
// @ts-ignore
import { borderRadiuosTextField } from "../theme/Themes";
// @ts-ignore

interface SelectorProps {
  id?: string | undefined;
  label?: string | undefined;
  items?:
    | string[]
    | object[]
    | {
        id: string | number | readonly string[] | undefined;
        name: string;
        value: string | number | readonly string[] | undefined;
        label: React.ReactNode;
      }[]
    | undefined;
  getValue?: Function;
  fullWidth?: boolean | undefined;
  width?: string | object | undefined;
  height?: string | undefined;
  variant?: "standard" | "outlined" | "filled" | undefined;
  fontColor?: string | undefined;
  border?: string | undefined;
  firstValue?: string | undefined;
  mt?: number | string | never;
  mb?: number | string | never;
  backgroundColor?: string | undefined;
  borderRadius?: string | number | undefined;
  display?: string | undefined;
  fontSize?: number | undefined;
  size?: "small" | "medium" | undefined;
  disabled?: boolean | undefined;
  menuHeight?: string | undefined;
  itemType?: "string" | "object" | undefined;
  valueOut?: "value" | "id" | undefined;
}

export default function Selector(props: SelectorProps) {
  const id = props.id != null ? props.id : "";
  const label = props.label != null ? props.label : "";
  const items = props.items != null ? props.items : [];
  const getValue = props.getValue != null ? props.getValue : () => {};
  const fullWidth = props.fullWidth != null ? props.fullWidth : false;
  const width = props.width != null ? props.width : {};
  const height = props.height != null ? props.height : "max-content";
  const variant = props.variant != null ? props.variant : "outlined";
  const fontColor =
    props.fontColor != null ? props.fontColor : "black";
  const border = props.border != null ? props.border : "none";
  const firstValue = props.firstValue != null ? props.firstValue : "";
  const mt = props.mt != null ? props.mt : 0;
  const mb = props.mb != null ? props.mb : 0;
  const backgroundColor =
    props.backgroundColor != null
      ? props.backgroundColor
      : "transparent";
  const borderRadius =
    props.borderRadius != null ? props.borderRadius : "15px";
  const display = props.display != null ? props.display : "flex";
  const fontSize = props.fontSize != null ? props.fontSize : 16;
  const size = props.size != null ? props.size : "small";
  const menuHeight =
    props.menuHeight != null ? props.menuHeight : "30%";
  const [value, setValue] = React.useState(firstValue);

  const handleChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(event.target.value);
    getValue && getValue(event.target.value);
  };

  return (
    <FormControl
      fullWidth={fullWidth}
      sx={{ borderRadius: borderRadiuosTextField,width:width,height:height }}
      variant={variant}
    >
      <InputLabel id={label}>{label}</InputLabel>
      <Select
        labelId={label}
        id={id}
        value={value}
        label={label}
        onChange={handleChange}
        // defaultValue={firstValue}
        disabled={props.disabled}
        // without any border
        sx={{
          borderRadius: borderRadius,
          backgroundColor: backgroundColor,
          color: fontColor,
          width: width,
          height: height,
          border: border,
          marginTop: mt,
          mb: mb,
          display: display,
          fontSize: fontSize,
          "&:hover": {
            border: border,
          },
          icon: {
            color: fontColor,
          },
        }}
        size={size}
        // disableUnderline={variant === "standard" ? true : false}
        // change icon color of the select component
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "center",
          },
          transformOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          anchorPosition: {
            top: 0,
            left: 0,
          },
          style: {
            height: menuHeight,
            zIndex: 35001,
            borderRadius: borderRadiuosTextField,
          },
          PaperProps: {
            style: {
              borderRadius: borderRadiuosTextField,
            },
          },
        }}
        inputProps={{
          style: {
            borderRadius: borderRadiuosTextField,
            color: fontColor,
            backgroundColor: backgroundColor,
            fontSize: fontSize,
            height: height,
            // width: width,
            border: border,
            marginTop: mt,
            marginBottom: mb,
            display: display,
          },
        }}
      >
        {/* check if the items are object or string */}

        {props.itemType === "string"
          ? items.map((option) => (
              // @ts-ignore
              <MenuItem
                key={option}
                value={option}
                sx={{ zIndex: 20 }}
              >
                {option}
              </MenuItem>
            ))
          : items.map(
              // @ts-ignore
              (option: {
                id: string | number | readonly string[] | undefined;
                name: string;
                value:
                  | string
                  | number
                  | readonly string[]
                  | undefined;
                label: React.ReactNode;
              }) => (
                // @ts-ignore
                <MenuItem
                  // @ts-ignore
                  key={option.id}
                  value={
                    props.valueOut === "value"
                      ? option.value
                      : option.id
                  }
                  sx={{ zIndex: 20 }}
                >
                  {option.name}
                </MenuItem>
              )
            )}
      </Select>
    </FormControl>
  );
}
