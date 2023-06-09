import { loadProducts } from "../../actions/productAction";

const loadProductsData=()=>{
    return async (dispatch, getState)=>{
        const res= await fetch("http://localhost:5000/products");
        const data= await res.json();

        if (data.data.length){
            dispatch(loadProducts(data.data))
        }
    }
}

export default loadProductsData;