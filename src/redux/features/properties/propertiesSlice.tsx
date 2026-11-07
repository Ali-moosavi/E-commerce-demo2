import type { PROPERTIESINITIALSTATE } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { postFilterOptions } from "./propertiesService";

const initialState:PROPERTIESINITIALSTATE = {
    filteredProperties:[],
    filteredProducts: []
}

const propertiesSlice = createSlice({
  name: "propertiesSlice",
  initialState,
  reducers: {
    setfilteredProperties(state, action) {
      state.filteredProperties = action.payload;
      console.log(state.filteredProperties);
    },
  },
  extraReducers(builder) {
    builder.addCase(postFilterOptions.fulfilled , (state , action)=>{
      state.filteredProducts = action.payload
    })
  },
});

export default propertiesSlice.reducer
export const { setfilteredProperties } = propertiesSlice.actions