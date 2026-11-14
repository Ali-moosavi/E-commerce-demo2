import { configureStore } from "@reduxjs/toolkit";
import propertiesSlice from "../features/properties/propertiesSlice"
// import SettingSlice from '../features/Setting/SettingSlice'
// import CategoriesSlice from '../features/Categories/CategoriesSlice'
// import ProductSlice from '../features/Products/ProductSlice'
// import PropertiesReducer from "../features/Properties/PropertiesSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      PropertyState: propertiesSlice,
    },
  });
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export default store
