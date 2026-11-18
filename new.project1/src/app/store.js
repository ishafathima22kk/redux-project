import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productsSlice";
const store = configureStore({
  reducer: {
    products: productReducer,
  },
});
export default store;