import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; //defaults to localStorage
import { persistStore, persistReducer } from "redux-persist";
import { booksSlice } from "../features/books/booksSlice";
import { categoriesSlice } from "../features/categories/categoriesSlice";
import { wishlistSlice } from "../features/wishlist/wishlistSlice";
import { cartSlice } from "../features/cart/cartSlice";
import { addressSlice } from "../features/address/adressSlice";
import { orderSlice } from "../features/orderhistory/orderHistorySlice";

// Defining persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["books", "wishlist", "cart"],
};

const rootReducer = combineReducers({
  books: booksSlice.reducer,
  categories: categoriesSlice.reducer,
  wishlist: wishlistSlice.reducer,
  cart: cartSlice.reducer,
  address: addressSlice.reducer,
  order: orderSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Clear all persisted data
// persistor.purge();

export default store;
