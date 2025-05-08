// context
import { useMyContext } from "../context/useMyContext"
import { Link } from "react-router-dom"
// hook
import { useState } from "react"
// redux
import { useSelector,useDispatch} from "react-redux"
import { RootState } from "../store"


import { addProduct, resetMessage} from "../store/features/cart"

// icon

import { Star ,ShoppingCart} from "lucide-react"




// components
import ServerError from '../errors-component/ServerError'
import ErrorComponent from "../errors-component/ErrorComponent"




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
    setSelectingPrice,
    
  } = useMyContext()


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

                  <div className="rating-product w-full flex justify-start px-2 py-1">
                    {
                      Array.from({length : Number(prod.productRatingRate)}, (_, i)=>(
                        <span key={i} className="text-button m-0.5">
                            <Star color="#f1ba2f" />
                        </span>
                      ))
                    }
                  </div>

                  <div className="box-info-product w-full flex flex-col justify-start align-start p-2">
                    <h2 
                    className="py-2 h-[80px] font-semibold	text-lg  text-button2">
                      {prod.productTitle}
                    </h2>

                    <p className="descr text-gray-600">
                        {prod.productDescription.slice(0,80)}...     
                    </p>
                  </div>

                  <div className="box-info-cost p-2 flex w-full">
                    <div className="cost flex justify-start align-center w-[70%]">

                      <h1 className="text-lg py-1 font-bold text-[#000] leading-5">
                        {prod.productPrice}$
                      </h1> 

                      <h3 className="py-1 ml-3 font-semibold text-gray-500 leading-5 line-through">
                        98.0$
                      </h3> 

                    </div>
                    <div className="descuento w-[30%]">
                        <div className="box-desc bg-[#28a745] px-2 py-1 rounded-xl">
                          <h2 className="desc font-semibold text-center text-body">
                            20% OFF
                          </h2>
                        </div>
                        
                    </div>
                  </div> 

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
                className="add_to_cart_btn w-full rounded-md duration-200 text-sm bg-button2 text-white font-bold py-2 px-4 hover:bg-button z-50 hover:bg-text">
                  <span className="icon-cart mr-2">
                      <ShoppingCart size={20} />
                  </span>
                  <span className="cursor-pointer text-btn-cart ml-2">
                      Añadir al carrito
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
      userFromDB={null}>
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