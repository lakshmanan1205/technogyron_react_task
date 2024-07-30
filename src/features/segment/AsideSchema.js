import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import Title from "../../ui/Title";
import TextFieldSelect from "../../ui/TextFieldSelect";
import HyphenIcon from "@mui/icons-material/Remove";
import { useDispatch, useSelector } from "react-redux";
import {
  addSelectedItem,
  deleteUnselectedItem,
  reset,
  setSchemaName,
  setSelectedSchema,
} from "./schemaSlice";
import SelectedSchemaList from "./SelectedSchemaList";
import { useState } from "react";
import { CustomInput } from "../../ui/CustomInput";
import { useForm } from "react-hook-form";
import { RULE_NAME } from "../../utils/formValidationRules";
import { capitalizeFirstLetter, createSegment } from "../../services/Services";
import toast from "react-hot-toast";
import { AGE } from "../../utils/helper";

export default function AsideSchema({ onCancel }) {
  const dispatch = useDispatch();
  const schemaName = useSelector((state) => state.schema.schemaName);
  const schemaMaster = useSelector((state) => state.schema.schemaMaster);
  const selectedSchema = useSelector((state) => state.schema.selectedSchema);
  const selectedSchemaList = useSelector(
    (state) => state.schema.selectedSchemaList
  );
  const unSelectedSchemaList = useSelector(
    (state) => state.schema.unSelectedSchemaList
  );
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const isMediumScreen = useMediaQuery(
    "(min-width:601px) and (max-width:960px)"
  );
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    defaultValues: { schemaName: "" },
  });
  const { handleSubmit, control } = form;

  function handleSelect() {
    if (!selectedSchema) return;
    dispatch(addSelectedItem(selectedSchema));
    dispatch(deleteUnselectedItem(selectedSchema));
    dispatch(setSelectedSchema(null));
  }
  function handleBack() {
    dispatch(reset());
    onCancel();
  }
  const onSubmitData = (data) => {
    if (selectedSchemaList.length === 0 || isLoading) return;
    setIsLoading(true);
    const apiSchemalist = selectedSchemaList.map((schema) => ({
      [schema.apiLabel]:
        schema.id === AGE
          ? Number(data[schema.apiLabel])
          : capitalizeFirstLetter(data[schema.apiLabel]),
    }));
    const formData = {
      segment_name: data.segment_name,
      schema: apiSchemalist,
    };
    console.log("schema", formData);
    createSegment(formData)
      .then((res) => {
        toast.success("Segment Created Successfully");
        dispatch(reset());
        onCancel();
        setIsLoading(false);
      })
      .catch((err) => {
        toast.error("Something went wrong,Try again!");
        setIsLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmitData)} noValidate>
      <Stack
        sx={{
          maxWidth: isSmallScreen
            ? "300px"
            : isMediumScreen
            ? "500px"
            : "700px",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Title onClick={handleBack}>Saving Segment</Title>
        {/* FORM */}
        <Container sx={{ overflowY: "auto" }}>
          <Stack rowGap={2} sx={{ marginTop: "16px" }}>
            <Typography variant="body1">
              Enter the Name of the Segment
            </Typography>

            {/* <TextInput
              label="Name of the segment"
              value={schemaName}
              onChange={(e) => dispatch(setSchemaName(e.target.value))}
              required
            /> */}
            <CustomInput
              control={control}
              label="Name of the segment"
              name="segment_name"
              value={schemaName}
              rules={RULE_NAME}
              onChange={(e) => dispatch(setSchemaName(e.target.value))}
              // required
            />
            <Typography variant="body2">
              To save your segment, you need to add the schemas to build the
              query
            </Typography>
            {/* TRAITS */}
            <Stack direction="row" alignItems="center" justifyContent="end">
              <Typography variant="caption" sx={{ marginRight: "8px" }}>
                <CircleIcon color="success" fontSize="12px" /> - User Traits
              </Typography>
              <Typography variant="caption">
                <CircleIcon color="error" fontSize="12px" /> - Group Traits
              </Typography>
            </Stack>
            {/* SELECTED SCHEMAS */}
            {selectedSchemaList?.length > 0 && (
              <SelectedSchemaList control={control} />
            )}
            {/* UNSELECTED SCHEMAS */}
            <Box>
              {!(selectedSchemaList.length === schemaMaster.length) && (
                <>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-around"
                    rowGap={2}
                    padding="6px"
                  >
                    <Grid item xs={1}>
                      <CircleIcon color="disabled" fontSize="10px" />
                    </Grid>
                    <Grid item xs={9}>
                      <TextFieldSelect
                        label="Add schema to segment"
                        selectOptions={unSelectedSchemaList}
                        value={selectedSchema}
                        onChange={(e) =>
                          dispatch(setSelectedSchema(e.target.value))
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
                      >
                        <HyphenIcon color="disabled" />
                      </button>
                    </Grid>
                  </Grid>
                  {/* LINK BUTTON */}

                  <button
                    style={{
                      display: "inline-block",
                      border: "none",
                      background: "none",
                      borderBottom: "2px solid #20c997",
                      color: "#0ca678",
                      paddingBottom: "5px",
                      cursor: "pointer",
                      margin: "16px 0px",
                    }}
                    onClick={handleSelect}
                    type="button"
                  >
                    + Add new schema
                  </button>
                </>
              )}
            </Box>
          </Stack>
        </Container>
        {/* FOOTER */}
        <Box
          sx={{
            padding: "16px 0px",
            backgroundColor: "#e9ecef",
            marginTop: "auto",
          }}
        >
          <Container>
            <Button
              variant="contained"
              color="success"
              size="small"
              sx={{ textTransform: "none", marginRight: "8px" }}
              type="submit"
              disabled={selectedSchemaList.length === 0}
            >
              {isLoading ? "Loading ..." : "Save the segment"}
            </Button>
            <Button
              variant="contained"
              color="inherit"
              size="small"
              type="button"
              sx={{
                backgroundColor: "#fff",
                color: "#f03e3e",
                textTransform: "none",
              }}
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Container>
        </Box>
      </Stack>
    </form>
  );
}
