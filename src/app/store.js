import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage' //defaults to localStorage
import { persistStore, persistReducer } from 'redux-persist'
import { booksSlice } from "../features/books/booksSlice"
import { categoriesSlice } from "../features/categories/categoriesSlice"
import { wishlistSlice } from "../features/wishlist/wishlistSlice"
import { cartSlice } from "../features/cart/cartSlice"
import { addressSlice } from "../features/address/adressSlice"

// Defining persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['books', 'wishlist', 'cart']
}

// Combining reducers
const rootReducer = combineReducers({
  books: booksSlice.reducer,
  categories: categoriesSlice.reducer,
  wishlist: wishlistSlice.reducer,
  cart: cartSlice.reducer,
  address: addressSlice.reducer
})

// Creating persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configuring the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer
})

// Creating persistor
export const persistor = persistStore(store)

export default store