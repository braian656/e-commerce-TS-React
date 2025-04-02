import { configureStore } from "@reduxjs/toolkit";
import { createStore, combineReducers } from 'redux';

import cart from './features/cart'
import register  from "./features/register";



export const store = configureStore({
    reducer:{
        handleCart : cart,
        registerUser : register,
    },
})

export type RootState = ReturnType<typeof store.getState>; // Obtenemos el tipo del estado global
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
export default store;


// export default store