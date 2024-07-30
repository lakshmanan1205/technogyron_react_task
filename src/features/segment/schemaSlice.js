import { createSlice } from "@reduxjs/toolkit";
import {
  ACCOUNTNAME,
  AGE,
  CITY,
  FIRSTNAME,
  GENDER,
  LASTNAME,
  STATE,
} from "../../utils/helper";
const schemaOptions = [
  // {
  //   label: "Add schema to segment",
  //   value: SELECT,
  // },
  {
    id: FIRSTNAME,
    label: "First Name",
    value: FIRSTNAME,
    inputValue: null,
    isUserTrait: true,
    apiLabel: "first_name",
  },
  {
    id: LASTNAME,
    label: "Last Name",
    value: LASTNAME,
    inputValue: null,
    isUserTrait: false,
    apiLabel: "last_name",
  },
  {
    id: GENDER,
    label: "Gender",
    value: GENDER,
    inputValue: null,
    isUserTrait: false,
    apiLabel: "gender",
  },
  {
    id: AGE,
    label: "Age",
    value: AGE,
    inputValue: null,
    isUserTrait: false,
    apiLabel: "age",
  },
  {
    id: ACCOUNTNAME,
    label: "Account Name",
    value: ACCOUNTNAME,
    inputValue: null,
    isUserTrait: false,
    apiLabel: "account_name",
  },
  {
    id: CITY,
    label: "City",
    value: CITY,
    inputValue: null,
    isUserTrait: false,
    apiLabel: "city",
  },
  {
    id: STATE,
    label: "State",
    value: STATE,
    inputValue: null,
    isUserTrait: false,
    apiLabel: "state",
  },
];

const initialState = {
  schemaName: null,
  schemaMaster: schemaOptions,
  selectedSchemaList: [],
  unSelectedSchemaList: schemaOptions,
  selectedSchema: null,
};

const schemaSlice = createSlice({
  name: "schema",
  initialState,
  reducers: {
    setSchemaName(state, action) {
      state.schemaName = action.payload;
    },
    setSelectedSchema(state, action) {
      state.selectedSchema = action.payload;
    },
    addSelectedItem(state, action) {
      const selectedItem = state.schemaMaster.find(
        (schema) => schema.id === action.payload
      );
      state.selectedSchemaList.push(selectedItem);
    },
    deleteSelectedItem(state, action) {
      const updatedSelectedSchemaList = state.selectedSchemaList.filter(
        (schema) => schema.id !== action.payload
      );
      state.selectedSchemaList = updatedSelectedSchemaList;
    },
    addUnSelecteditem(state, action) {
      const selectedItem = state.schemaMaster.find(
        (schema) => schema.id === action.payload
      );
      const updatedUnselectedSchemaList = [
        ...state.unSelectedSchemaList,
        selectedItem,
      ]?.sort((a, b) => a.id - b.id);
      state.unSelectedSchemaList = updatedUnselectedSchemaList;
    },
    deleteUnselectedItem(state, action) {
      if (!state.selectedSchema) return;
      state.unSelectedSchemaList = state.unSelectedSchemaList.filter(
        (schema) => schema.id !== action.payload
      );
    },
    setSelectedSchemaListInput: {
      prepare(id, value) {
        return { payload: { id, value } };
      },
      reducer(state, action) {
        const selectedID = action.payload.id;
        const selectedValue = action.payload.value;
        const updatedSelectedSchemaList = state.selectedSchemaList.map(
          (schema) =>
            schema.id === selectedID
              ? { ...schema, inputValue: selectedValue }
              : schema
        );
        state.selectedSchemaList = updatedSelectedSchemaList;
      },
    },
    reset(state) {
      state.schemaMaster = initialState.schemaMaster;
      state.selectedSchemaList = initialState.selectedSchemaList;
      state.unSelectedSchemaList = initialState.unSelectedSchemaList;
    },
  },
});

export const {
  setSchemaName,
  setSelectedSchema,
  setSelectedSchemaListInput,
  addSelectedItem,
  deleteSelectedItem,
  addUnSelecteditem,
  deleteUnselectedItem,
  reset,
} = schemaSlice.actions;
export default schemaSlice.reducer;
