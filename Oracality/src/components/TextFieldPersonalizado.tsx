import { TextField, TextFieldProps } from "@mui/material";

export function TextFieldPersonalizado(props: TextFieldProps): JSX.Element {
  return (
    <TextField
      onChange={props.onChange}
      label={props.label}
      variant={props.variant}
      fullWidth
      autoComplete={props.autoComplete}
      type={props.type}
      sx={{
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: "10px",
        height: "40px",
        margin: "none",
        outline: "none",
        borderColor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "black",
      }}
      InputProps={{
        sx: {
          input: {
            color: "black", // Força a cor do texto para preto
          },
          "&:focus": {
            outline: "none",
            color: "black", // Cor do texto no foco
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent", // Borda padrão transparente
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent", // Borda no hover
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent", // Borda no foco
          },
        },
      }}
      InputLabelProps={{
        sx: {
          color: "#000", // Cor da label normal
          "&.Mui-focused": {
            color: "#000", // Cor da label quando focado
          },
        },
      }}
    />
  );
}
