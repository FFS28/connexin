import React from "react";
import Button from "@mui/material/Button";
import { Theme } from "@emotion/react";
import { makeStyles, createTheme, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";

const containedTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          background: "linear-gradient(45deg, #7abdfb 30%, #3d94f8 90%)",
          borderRadius: 50,
          border: 0,
          color: "white",
          height: 48,
          padding: "0 30px",
          boxShadow: "0 3px 5px 2px rgba(105, 156, 255, .3)",
        },
      },
    },
  },
});

const outlinedTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: "1px solid #8ea9e4 !important",
          borderRadius: "25px !important",
          color: 'white',
          height: 48,
          padding: '0 30px',
          position: "relative"
        },
      },
    },
  },
});

const blacktextTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: "1px solid #8ea9e4 !important",
          borderRadius: "25px !important",
          color: 'black',
          height: 48,
          padding: '0 30px',
          position: "relative"
        },
      },
    },
  },
});

function ConnnexinBtn({ type, value, moveto, m_page }: {
  type: "contained" | "outlined" | "blacktext";
  value: string;
  moveto: (param: string) => void;
  m_page: string;
}) {
  return (
    <>
      <ThemeProvider theme={
        type == "contained" ? containedTheme : (
          type == "outlined" ? outlinedTheme : blacktextTheme
        )}>
        <Button variant={type == "blacktext" ? "outlined" : type } onClick={() => { moveto(m_page) }} fullWidth >
          {value}
        </Button>
      </ThemeProvider>
    </>
  );
}

export default ConnnexinBtn;
