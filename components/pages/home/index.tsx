import type { NextPage } from "next";

import * as React from "react";
import TextMarker from "../../elements/markups/TextMarker";
import ImageMarker from "../../elements/markups/ImageMarker";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const CustomBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(${theme.palette.primary.dark}, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
  minHeight: "100vh",
  height: "100%",
  paddingTop: "30vh",
  textAlign: "center",
}));

const ConnexinHome: NextPage = () => {
  return (
    <CustomBox>
      <TextMarker />
      <ImageMarker type="white" />
    </CustomBox>
  );
};

export default ConnexinHome;
