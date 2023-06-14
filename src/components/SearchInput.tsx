/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { borderRadiuosTextField } from "../theme/Themes";

interface SearchInputProps {
  id: string;
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
  size?: "small" | "normal";
  mx?: any;
  my?: any;
  getText?: any;
  setValue?: any;
}

export default function SearchInput(props: SearchInputProps) {
  const label = props.label != null ? props.label : "label";
  const backgroundColor = props.backgroundColor != null ? props.backgroundColor : "";
  const margin = props.margin != null ? props.margin : {};
  const items = props.items != null ? props.items : [];
  const size = props.size != null ? props.size : "small";
  const mx = props.mx != null ? props.mx : {};
  const my = props.my != null ? props.my : {};

  const changeData = (data: any) => {
    props.getText(data);
  };
  return (
    <Autocomplete
      disablePortal
      id='combo-box-demo'
      options={items}
      onChange={(event, value) => changeData(value)}
      sx={{
        boxShadow: 0,
        height: 45,
        borderRadius: borderRadiuosTextField,
        margin: margin,
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          sx={{
            boxShadow: 0,
            height: 45,
            borderRadius: borderRadiuosTextField,
            margin: margin,
            mx: mx,
            my: my,
            backgroundColor: backgroundColor,
          }}
          InputProps={{
            ...params.InputProps,
            sx: { height: 45, borderRadius: borderRadiuosTextField },
          }}
          InputLabelProps={{
            size: size,
          }}
        />
      )}
    />
  );
}
