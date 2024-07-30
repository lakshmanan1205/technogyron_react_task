import React, { useState } from "react";
import { Button, Drawer } from "@mui/material";
import { useDispatch } from "react-redux";

import Title from "../../ui/Title";
import AsideSchema from "./AsideSchema";
import { reset } from "./schemaSlice";

export default function Segment() {
  const [canOpenSchema, setCanOpenSchema] = useState(false);
  const dispatch = useDispatch();
  function handleSave() {
    setCanOpenSchema((prevSchema) => !prevSchema);
  }
  function handleCancel() {
    setCanOpenSchema(false);
    dispatch(reset());
  }
  return (
    <div>
      <Title>View Audience</Title>
      <div
        style={{
          margin: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button variant="outlined" onClick={handleSave}>
          Save segment
        </Button>
      </div>
      <Drawer open={canOpenSchema} anchor="right">
        <AsideSchema onCancel={handleCancel} />
      </Drawer>
    </div>
  );
}
