import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";

export default function ImageMarker({ type }: { type: string }) {
  return (
    <Box sx={{ m: "auto", py: 4 }}>
      {type == "white" ? (
        <Image
          src={"/images/logo_white.png"}
          alt={"connexin logo"}
          width={"150px"}
          height={"40px"}
        />
      ) : null}
      {type == "red" ? (
        <Image
          src={"/images/red.png"}
          alt={"connexin logo"}
          width={"150px"}
          height={"40px"}
        />
      ) : null}
      {type == "big" ? (
        <Image
          src={"/images/logo_big.png"}
          alt={"connexin logo"}
          width={"150px"}
          height={"40px"}
        />
      ) : null}
      {type == "big1" ? (
        <Image
          src={"/images/logo_big.png"}
          alt={"connexin logo"}
          width={"200px"}
          height={"50px"}
        />
      ) : null}
    </Box>
  );
}
