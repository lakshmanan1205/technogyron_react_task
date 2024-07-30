import { Box, Grid, useMediaQuery } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CircleIcon from "@mui/icons-material/Circle";
import HyphenIcon from "@mui/icons-material/Remove";
import {
  addUnSelecteditem,
  deleteSelectedItem,
} from "./schemaSlice";
import { CustomInput } from "../../ui/CustomInput";
import {
  RULE_AGE,
  RULE_CITY,
  RULE_GENDER,
  RULE_NAME,
  RULE_STATE,
} from "../../utils/formValidationRules";
import { AGE, CITY, GENDER, STATE } from "../../utils/helper";

export default function SelectedSchemaList({ control }) {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const dispatch = useDispatch();

  const selectedSchemaList = useSelector(
    (state) => state.schema.selectedSchemaList
  );
  function handleDeSelect(id) {
    if (!id) return;
    dispatch(deleteSelectedItem(id));
    dispatch(addUnSelecteditem(id));
  }
  return (
    <Box
      sx={{
        border: "2px solid #339af0",
        padding: !isSmallScreen ? "16px 8px" : "16px 2px",
      }}
    >
      {selectedSchemaList.map((selected) => (
        <Grid
          container
          alignItems="top"
          justifyContent="space-around"
          rowGap={2}
          mb={2}
        >
          <Grid item xs={1} sx={{ alignSelf: "center" }}>
            <CircleIcon
              color={selected.isUserTrait ? "success" : "error"}
              fontSize="10px"
            />
          </Grid>
          <Grid item xs={9}>
            <CustomInput
              control={control}
              label={selected.label}
              name={selected.apiLabel}
              value={selected.inputValue}
              type={selected.id === AGE ? "number" : "text"}
              rules={
                selected.id === GENDER
                  ? RULE_GENDER
                  : selected.id === AGE
                  ? RULE_AGE
                  : selected.id === CITY
                  ? RULE_CITY
                  : selected.id === STATE
                  ? RULE_STATE
                  : RULE_NAME
              }
            />
          </Grid>
          <Grid item xs={2} justifyContent="end">
            {" "}
            <button
              style={{
                border: "1px solid #339af0",
                backgroundColor: "#d0ebff",
                padding: "4px",
                borderRadius: "5px",
                width: "80%",
                marginLeft: "3px",
                cursor: "pointer",
              }}
              type="button"
              onClick={() => handleDeSelect(selected.id)}
            >
              <HyphenIcon color="disabled" />
            </button>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}
