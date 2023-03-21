import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
    products:[],
}

const getProducts= createAsyncThunk("products/getProducts", async()=>{
    const res= await fetch("http://localhost:5000/products");
    const data= res.json();
    return data.data;
})

const productSlice= createSlice({
    name:"products",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getProducts.pending);
    },
})

export default productSlice.reducer;