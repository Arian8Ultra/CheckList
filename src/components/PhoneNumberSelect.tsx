/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";
import { countries } from "../assets/Strings";
import { borderRadiuosTextField } from "../theme/Themes";
interface PhoneNumberSelectProps {
  id?: string;
  label?: string;
  type?: string;
  idNum?: number;
  autoComplete?: string;
  disabled?: boolean;
  fontSize?: number;
  height?: any;
  width?: any;
  textColor?: string;
  backgroundColor?: string;
  hoverColor?: string;
  position?: any;
  bottom?: any;
  right?: any;
  top?: any;
  left?: any;
  margin?: any;
  text?: string;
  value?: any;
  items?: any;
  helperText?: string;
  error?: boolean;
  size?: "small" | "medium";
  mx?: any;
  my?: any;
  getText?: any;
  setValue?: any;
  fullWidth?: boolean;
  firstValue?: string;
  borderRadius?: string;
  mt?: any;
  mb?: any;
  border?: string;
  display?: string;
  variant?: "standard" | "filled" | "outlined";
  getValue: Function;
}

function PhoneNumberSelect(props: PhoneNumberSelectProps) {
  const id = props.id != null ? props.id : "";
  const label = props.label != null ? props.label : "";
  const width = props.width != null ? props.width : "100px";
  const height = props.height != null ? props.height : {};
  const fontSize = props.fontSize != null ? props.fontSize : 14;
  const textColor = props.textColor != null ? props.textColor : "black";
  const backgroundColor = props.backgroundColor != null ? props.backgroundColor : "";
  const size = props.size != null ? props.size : "medium";
  const firstValue = props.firstValue != null ? props.firstValue : "";
  const borderRadius = props.borderRadius != null ? props.borderRadius : "15px";
  const mt = props.mt != null ? props.mt : 0;
  const mb = props.mb != null ? props.mb : 0;
  const border = props.border != null ? props.border : "none";
  const display = props.display != null ? props.display : "flex";

  const [countryCode, setCountryCode] = React.useState("+1");

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setCountryCode(event.target.value);
    props.getValue(event.target.value);
  };

  return (
    <FormControl
      fullWidth={props.fullWidth}
      sx={{ borderRadius: borderRadiuosTextField }}
      variant={props.variant}
    >
      <InputLabel id={props.label}>{props.label}</InputLabel>
      <Select
        id={id}
        value={countryCode}
        label={label}
        onChange={handleChange}
        defaultValue={firstValue}
        // without any border
        sx={{
          "borderRadius": borderRadius,
          "backgroundColor": backgroundColor,
          "color": textColor,
          "width": width,
          "height": height,
          "border": border,
          "marginTop": mt,
          "mb": mb,
          "display": display,
          "fontSize": fontSize,
          "&:hover": {
            border: border,
          },
          "icon": {
            color: textColor,
          },
        }}
        size={size}
        // disableUnderline={variant === "standard" ? true : false}
        // change icon color of the select component
        MenuProps={{
          style: { zIndex: 35001, borderRadius: borderRadiuosTextField },
          PaperProps: {
            style: {
              borderRadius: borderRadiuosTextField,
            },
          },
        }}
        inputProps={{
          style: {
            borderRadius: borderRadiuosTextField,
            color: textColor,
            backgroundColor: backgroundColor,
            fontSize: fontSize,
            height: height,
            width: width,
            border: border,
            marginTop: mt,
            marginBottom: mb,
            display: display,
          },
        }}
      >
        {countries.map(
          (option:any) => (
            <MenuItem
              key={option.code}
              value={option.dial_code}
              sx={{ zIndex: 20 }}
            >
              <img
                loading='lazy'
                width='20'
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt=''
              />
              {option.code}
              {option.dial_code}
            </MenuItem>
          ),
        )}
      </Select>
    </FormControl>
  );
}

export default PhoneNumberSelect;
