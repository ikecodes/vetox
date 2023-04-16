import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import userReducer from "./userSlice";
import navReducer from "./navSlice"
import storage from "redux-persist/lib/storage"
import hardSet from "redux-persist/lib/stateReconciler/hardSet"

const rootPersistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: hardSet,
  // blacklist: ["user"],
}

const rootReducer = combineReducers({
  user: userReducer,
  nav: navReducer,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
