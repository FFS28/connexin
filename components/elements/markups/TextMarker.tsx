import React from "react";
import { Box, Typography } from "@mui/material";

export default function TextMarker() {
  return (
    <>
      <Box sx={{ mt: 1, mb: 1 }}>
        <Typography
          variant={"h4"}
          gutterBottom
          component={"label"}
          color={"white"}
        >
          My{" "}
        </Typography>
        <Typography
          variant={"h2"}
          gutterBottom
          component={"label"}
          color={"white"}
          fontStyle={"italic"}
          fontWeight={"bold"}
        >
          Pre-Op
        </Typography>
      </Box>
    </>
  );
}
