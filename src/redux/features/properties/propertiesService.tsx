import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppState } from "@/redux/setup/store";
import { productPropertyLinker } from "@/components/actions/actions";

type ProductProperty = Awaited<ReturnType<typeof productPropertyLinker>>;

export type PostFilterOptionsPayload = {
  filterOptions: string[];
  pathname: string;
};

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
  ProductProperty, 
  PostFilterOptionsPayload,
  asyncThunkConfig
>("properties/postFilterOptions", async (userData, thunkAPI) => {
  const { filterOptions, pathname } = userData;
  try {
    return await productPropertyLinker(filterOptions, pathname);
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
