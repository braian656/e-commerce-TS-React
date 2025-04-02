import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// definit el tipo de slice

export interface UserType{
    name: string | null,
    surname: string | null,
    email: string | null,
    password: string | null,
    password_repeat: string | null,
}


export interface CartState{
    users: UserType[];
    message: string;
}

const initialState : CartState ={
    users : [],
    message : '',
}


const register = createSlice({
    name:'users',


    initialState,


    reducers:{

        addUser: (state, action : PayloadAction<UserType>)=>{
            state.users.push(action.payload)
        },

        findEmailDuplicated : (state, action)=>{
            const findDuplicated = state.users.find((user)=> user.email === action.payload);

        },

    },

})

export const {addUser} = register.actions
export default register.reducer