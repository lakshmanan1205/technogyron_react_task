import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";

export default function Title({ children, onClick }) {
  return (
    <div className="bgHeader">
      {/* <span className="headerArrow">{String.fromCharCode(60)}</span> */}
      <IconButton onClick={onClick}>
        <ArrowBackIcon
          // color="disabled"
          fontSize="small"
          className="headerArrow"
        />
      </IconButton>
      <p className="headerText">{children}</p>
    </div>
  );
}
