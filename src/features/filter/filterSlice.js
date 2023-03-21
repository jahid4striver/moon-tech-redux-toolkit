import { createSlice } from "@reduxjs/toolkit";

const initialState={
    stock:false,
    brands:[],
    keywords:"",
}

const filterSlice= createSlice({
    name: 'cart',
    initialState,
    reducers:{
        toogle: (state)=>{
            state.stock= !state.stock;
        },
        toogleBrands: (state, action)=>{
            if(!state.brands.includes(action.payload)){
                state.brands.push(action.payload)
            }else{
                state.brands= state.brands.filter(brand=> brand!==action.payload)
            }
        }
    }
});

export const {toogle ,toogleBrands}= filterSlice.actions;
export default filterSlice.reducer;