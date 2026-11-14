import type { PROPERTIESINITIALSTATE } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postFilterOptions } from "./propertiesService";

const initialState: PROPERTIESINITIALSTATE = {
  filteredProperties: [],
  filteredProducts: null, // Changed from [] to null so all products show initially!
  products: []
};

const propertiesSlice = createSlice({
  name: "propertiesSlice",
  initialState,
  reducers: {
    setfilteredProperties(state, action) {
      state.filteredProperties = action.payload;
    },
    // Added this action so Filter.tsx can update the product IDs instantly!
    setfilteredProducts(state, action: PayloadAction<string[] | null>) {
      state.filteredProducts = action.payload;
    },
    setProducts(state , action){
      state.products = action.payload
      console.log(state.products)
    }
  },
  extraReducers(builder) {
    builder.addCase(postFilterOptions.fulfilled, (state, action) => {
      state.filteredProducts = action.payload ?? [];
    });
  },
});

export default propertiesSlice.reducer;
export const { setfilteredProperties, setfilteredProducts, setProducts } =
  propertiesSlice.actions;
