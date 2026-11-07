import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppState } from "@/redux/setup/store";
import { productPropertyLinker } from "@/components/actions/actions";

type ProductProperty = Awaited<ReturnType<typeof productPropertyLinker>>;

interface asyncThunkConfig {
  rejectValue: {
    errorObj: {
      title: string;
      status: number;
      errormessage: string | null;
      message: string;
      responseCode: number;
      result: string;
    };
  };
  state: AppState;
}

export const postFilterOptions = createAsyncThunk<
  ProductProperty, // returned value: the rows from findMany
  string[], // argument: selected option IDs
  asyncThunkConfig
>("properties/postFilterOptions", async (optionIds, thunkAPI) => {
  try {
    return await productPropertyLinker(optionIds);
  } catch (error) {
    return thunkAPI.rejectWithValue({
      errorObj: {
        title: "Filter error",
        status: 500,
        errormessage: error instanceof Error ? error.message : null,
        message: "Failed to fetch product properties",
        responseCode: 500,
        result: "error",
      },
    });
  }
});
