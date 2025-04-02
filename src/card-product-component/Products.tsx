// context
import { useMyContext } from "../context/useMyContext"
import { Link } from "react-router-dom"
// hook
import { useState } from "react"
// redux
import { useSelector,useDispatch} from "react-redux"
import { RootState } from "../store"


import { addProduct, resetMessage} from "../store/features/cart"




// type 
import { InfoApi } from "../context/types/typesApi"

// components
import ServerError from '../errors-component/ServerError'
import ErrorComponent from "../errors-component/ErrorComponent"

import {ShoppingCart} from 'lucide-react'



function Products(){
  
  const {
    productData,
    pagProduct, 
    firstIndex, 
    lastIndex, 
    someErr, 
    userSelectedCategory,
    activeItemId,
    setActiveItemId,
    setTotalPrice,
    setSelectingPrice,
    setProductData
    
  } = useMyContext()


  // const cartState = useSelector((state:RootState)=> state.items)
  const message = useSelector((state : RootState) => state.handleCart.message)
  const dispatch = useDispatch()


  const [modalVisible, setModalVisible] = useState(true) 

  let first = firstIndex;
  let last = lastIndex

  const category = productData.filter((product) => {
      

      if(userSelectedCategory?.includes('All')){
        return product
      }

      if(userSelectedCategory?.includes(product.productCategory)){

        
        first = 0
        last = 6

        return product

      }

    
      // if(product.productCategory === userSelectedCategory){
      //   return product
      // }


  })


  const addToCart = (id:number, image:string, product:string, price:number)=>{    
    const item = {
      id:id, 
      value:product, 
      cost:price, 
      img:image
    }


    setSelectingPrice(item.cost)
    setActiveItemId(prevId => (prevId === id ? null : id));
    dispatch(addProduct(item))
  }
   
  if (!category || category.length === 0) {
      console.log("category aún no está disponible", category);
      return null; // O muestra un mensaje de carga
  }

  

  const showProduct = category?.map((prod)=>(

            <article 
            key={prod.productId} 
            // id={prod.productId} 
            data-id={prod.productId}
            className="cursor-pointer w-full sm:w-[380px] shadow-lg bg-white m-3 hover:drop-shadow-lg rounded-md">
              
              <Link 
              to={`/products/${prod.productId}/`}>

              <div 
                onClick={
                ()=>
                pagProduct(
                 {
                  index: prod.productId, 
                  image: prod.productImage, 
                  product: prod.productTitle, 
                  descr: prod.productDescription, 
                  total: Number(prod.productPrice), 
                  productCategory: prod.productCategory,
                  rating: prod.productRatingRate,
                 }
                )
                }>
                <div className='pic bg-white h-60 p-1'>

                  <img 
                  className="w-full h-full object-contain" 
                  src={prod.productImage} 
                  alt={prod.productTitle} />


                </div>

                <div className="flex items-center justify-between flex-col">

                  <h2 
                  className="py-2 h-[100px] font-semibold	text-lg text-center text-button tracking-widest w-full">
                    {prod.productTitle}
                  </h2>

                  <span className="text-2xl py-2 font-bold text-[#736969] leading-5">
                    {prod.productPrice}$
                  </span>  

                </div>

            
              </div>

            
              </Link>
              {activeItemId === prod.productId && (
                <p className="active_animation">PRODUCTOR AÑADIDO</p>

              )}
              <button 
                onClick={
                  ()=>
                    addToCart(prod.productId, prod.productImage, prod.productTitle, prod.productPrice)
                } 
                className="add_to_cart_btn w-full duration-200 text-sm bg-button2 text-white font-bold py-2 px-4 hover:bg-button z-50 hover:bg-text">
                  <span className="icon-cart mr-2">
                      <ShoppingCart size={20} />
                  </span>
                  <span className="text-btn-cart ml-2">
                      ADD TO CART
                  </span>
              </button>
            </article>


  )).slice(first, last)
 

  const handleModal = ()=>{
    setModalVisible(true)
    dispatch(resetMessage())
  }


    return (
    <>
      
    {
      
      message ?
      <ErrorComponent 
      visible={modalVisible} 
      handleModal={handleModal}
      messageModal={message}
      txtButton="ACEPTAR"
      colorBtn="bg-button2"
      title="UPSSS...!"
      image="./images/close.svg"
      actualUser={null}>
      </ErrorComponent>
      :
      null
    }
    
      {
        productData.length == 0 ? 
        <ServerError 
          errorComponent={someErr}>
        </ServerError>
        : 
        showProduct
      }

    </>
    )
}


export default Products