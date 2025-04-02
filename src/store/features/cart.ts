import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface DataCart{


    id:number;
    img:string;
    value:string;
    cost: number;



}

interface CartState{
    items : DataCart[];
    message : string;
}

const initialState : CartState ={
    items : [],
    message : '',
}
const cart = createSlice({ 
    name:'cart',

    initialState,

    reducers:{


        addProduct:(state, action: PayloadAction<DataCart>)=>{
            const isDuplicated = state.items.find((product)=>product.id == action.payload.id);
            if(!isDuplicated){
                state.items.push(action.payload)
            }
            if(isDuplicated){
                state.message = 'Producto recientemente añadido';
                console.log(state.message)

            }
        },


        removeProduct : (state, action:  PayloadAction<number>)=>{
            console.log(state.items)
            state.items = state.items.filter(prod => prod.id !== action.payload)
        },

        resetMessage : (state)=>{
            state.message = '';
        }

    }
})


export const {
            addProduct, 
            removeProduct,
            resetMessage
            } = cart.actions

            
export default cart.reducer