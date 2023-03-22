import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../components/ProductCard";
import { toogle, toogleBrands } from "../../features/filter/filterSlice";
import { getProducts } from "../../features/products/productsSlice";

const Home = () => {
  // const [products, setProducts]= useState([]);
  const dispatch= useDispatch();
  const filter= useSelector((state)=>state.filter);
  const {products, isLoading}= useSelector((state)=>state.product);
  const {brands, stock}= filter;


  useEffect(() => {
   
    // fetch('http://localhost:5000/products')
    // .then(res=> res.json())
    // .then(data=>{
    //   setProducts(data.data)
    //   console.log(data.data);
    // })

    dispatch(getProducts());


  }, []);

  if(isLoading){
    return <h1>Loading....</h1>
  }

  const activeClass= "text-white bg-indigo-500 border-white";

  let content;


  if (products.length) {
  content=  products.map((product) => (
      <ProductCard key={product.model} product={product} />
    ))
  }

  if(products.length && (filter.stock||filter.brands.length)){
    content= products.filter(product=>{
      if(stock){
        return product.status===true;
      }
      return product;
    })
    .filter((product)=>{
      if(filter.brands.length){
        return filter.brands.includes(product.brand)
      }
      return product;
    }).map((product)=><ProductCard key={product.model} product={product}/> )
  }
  
  // const activeClass = "text-white  bg-indigo-500 border-white";

  return (
    <div className='max-w-7xl gap-14 mx-auto my-10'>
      <div className='mb-10 flex justify-end gap-5'>
        <button 
          onClick={()=>dispatch(toogle)}
          className={`border px-3 py-2 rounded-full font-semibold ${stock? activeClass:null}`}
        >
          In Stock
        </button>
        <button className={`border px-3 py-2 rounded-full font-semibold  ${brands.includes('amd') ? activeClass:null}`} onClick={()=>dispatch(toogleBrands('amd'))}>
          AMD
        </button>
        <button  className={`border px-3 py-2 rounded-full font-semibold ${brands.includes('intel') ? activeClass:null}`} onClick={()=>dispatch(toogleBrands('intel'))}>
          Intel
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14'>
        {content}
      </div>
    </div>
  );
};

export default Home;
