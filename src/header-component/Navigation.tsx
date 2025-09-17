import Dropdown from "./Dropdown"
import UserNav from "../nav-component/UserNav";
import ModalProductsUser from "../nav-component/ModalProductsUser";
import EmptyCart from "../errors-component/EmpyCart";
import SelectCategory from "../select-category/SelectCategory";
import { Link } from 'react-router-dom';
import { useSelector , useDispatch} from "react-redux";
import { useMyContext } from '../context/useMyContext';

import { removeProduct } from '../store/features/cart';

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
// ts
import { RootState } from '../store';

import { motion, AnimatePresence } from "framer-motion";

import {User, ShoppingCart,Heart, Search} from 'lucide-react'

// css
import '../index.css'
interface NavigationProps{

    activeComponents : boolean;
    setUserLog : React.Dispatch<React.SetStateAction<boolean>>;
  
}

function Navigation({setUserLog, activeComponents}:NavigationProps){

    const {totalPrice, setTotalPrice,renderTotalPrice,userFromDB,setUserFromDB} = useMyContext()
    
    // const [isOpen, setIsOpen] = useState<boolean>(false)
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [modalProduct, setModalProduct] = useState<boolean>(false)

    const hanndleClassTotal =  totalPrice.length === 0 ? 'hidden' : 'flex'

    
    const modalShow = modalProduct ? 'active-cart' : 'cart'
    
    const myCart = useSelector((state:RootState) => state.handleCart.items)
    // myCart solicita info de el carro de Compras

    const dispatch = useDispatch()

    const removeProductFromCart = useCallback((id:number, price:number)=>{


      dispatch(removeProduct(id))
        
      setTotalPrice((prevPrice: any)=>{
          const index = prevPrice.indexOf(price)

          if(index > -1){
            const updatePrice = [...prevPrice]
            updatePrice.splice(index, 1)
            return updatePrice
          }

          return prevPrice
      })

    }, [dispatch])


     // abrir menu en dispositivos mobiles
    const openMenu = ()=>{
      setMenuOpen(!menuOpen)
      if(modalProduct)setModalProduct(false)
    }

    const seeModalProduct = ()=>{
      setModalProduct(!modalProduct)
      console.log('puta')
    }

    const selectedCategory = ()=>{
    
        window.scrollTo({
            top: 1000,
            behavior: 'smooth'
        })

    }


    const cartProducts = useMemo(()=>{
        return myCart.map((pr)=>(
    
            <ModalProductsUser
                    key={pr.id} 
                    id={pr.id} 
                    image={pr.img} 
                    product={pr.value} 
                    price={pr.cost}
                    onClick={removeProductFromCart}>    
            </ModalProductsUser>
      
        ))
    },[myCart, removeProductFromCart])

    const {productData, setUserSelectedCategory} = useMyContext()

    const arrCategories: string[] = []

    productData.forEach((category) =>{
        arrCategories.push(category.productCategory)
    })

    const boxUserProduct = useRef<HTMLUListElement | null>(null)
    const buttonSeeModal = useRef<HTMLButtonElement | null>(null)

    useEffect(()=>{
          // as/es una propiedad de tsnpm
          // dice verifica este elemento como tal
          // en este caso verifica el evento como un elemento htm
        
    
        const handleClick = (e: MouseEvent)=>{    
            if(!boxUserProduct.current?.contains(e.target as  HTMLUListElement)
              && !buttonSeeModal.current?.contains(e.target as HTMLButtonElement)){
              setModalProduct(false)
            }
        }
    
        document.addEventListener('click', handleClick)
    
        return () => {
            document.removeEventListener('click', handleClick);
        };

    },[])

    return (

        <div className="content-nav bg-gray-900 px-2 py-3">

            <nav className="flex flex-col sm:flex-row sm:justify-between sm:items-center sm:mx-2">

                <div className="flex w-full">
                    <div className="logo p-1">
                        <Link  to="/" data-type="link">

                                  <h2 className="text-2xl font-bold text-white mb-4">ShopX</h2>

                        </Link>
                    </div>

                    <div className="input-search w-[60%] sm:w-sm relative m-auto">
                        <input type="search" className="py-1  px-2 bg-white rounded-full border-none outline-none w-full" placeholder="Buscar Producto..." />
                        <span className="icon absolute right-[5px] top-[4px]">
                            <Search color="#2d2a2a" />
                        </span>
                    </div>
                </div>
                
                

               <div className="flex items-center">
                <Link data-type="link" to="/micuenta">
                    <button className="text-white m-3 sm:m-0 sm:p-2 flex items-center justify-center pointer hover:text-indigo-200">
                        <span  className="m-1">
                            <User />
                        </span>

                         {
                        
                            userFromDB !== null 
                                    
                            ? 
                        
                            <UserNav 
                            setUserLog={setUserLog} 
                            userFromDB={userFromDB} 
                            setUserFromDB={setUserFromDB}
                            ></UserNav>
                        
                            : 

                            null
                                    
                        }
                        Cuenta
                    </button>
                </Link>
                <Link data-type="link" to="/wishlist">
                    <button className="relative text-white m-3 sm:m-0 sm:p-2 flex items-center justify-center pointer hover:text-indigo-200">
                        <span className="m-1">
                            <Heart/>
                        </span>
                        <span className="absolute right-[-10px] top-[-10px] sm:right-[-5px] sm:top-[0px] w-[20px] h-[20px] bg-red-400 flex justify-center items-center rounded-full text-white">0</span>
                        Whishlist
                    </button>
                </Link>
                
                <button 
                ref={buttonSeeModal}
                onClick={()=> setMenuOpen(!menuOpen)} 
                className="relative text-white m-3 sm:m-0 sm:p-2  flex items-center justify-center pointer hover:text-indigo-200">
                     <span  className="m-1">
                        <ShoppingCart/>
                    </span>
                    <span className="absolute right-[-10px] top-[-10px] sm:right-[-5px] sm:top-[0px] w-[20px] h-[20px] bg-red-400 flex justify-center items-center rounded-full text-white">{myCart.length}</span>

                    Cart
                </button>

                <button className="sm:hidden ml-3">

                    <Dropdown onclick={selectedCategory} arrCategories={arrCategories}></Dropdown>

                </button>
               </div>

            </nav>


            <div className="categories hidden  sm:flex sm:justify-between sm:items-center sm:p-1">
                <div className="flex">

                    {activeComponents && <SelectCategory onclick={selectedCategory}></SelectCategory> }
                    
                </div>


                <button className="shop-now cursor-pointer font-semibold p-1 bg-white w-56 mx-2">Comprar ahora</button>

                <div 
                        className={`${modalShow}`}>
                          
                          <ul className='ul-list-product' ref={boxUserProduct}>
                            {
                              Object.values(myCart).length == 0
                
                              ? 
                
                              <EmptyCart 
                                zIndex="z-50"
                                text="Looks like you haven't added anything to your cart yet.">
                              </EmptyCart> 
                
                              : 
                
                              ''
                            }
                
                
                            {cartProducts}      
                
                          </ul>
                          
                          <div className={`${hanndleClassTotal} text-white bg-button2 p-2 rounded-lg total_price justify-around items-center`}>
                  
                              <span className="total_title">Total</span>
                              <span className="total font-normal text-xl">
                                ${totalPrice.length === 0 ? null : renderTotalPrice}
                              </span>
                  
                          </div>
                </div>

                <AnimatePresence>
                    {
                     menuOpen && (
                        
                    

                        <motion.div 
                            className='active-cart'
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                             <motion.div

                                initial={{ y: -100, opacity: 0, scale: 0.9 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                exit={{ y: 100, opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                            <ul className="ul-list-product">
                                    {
                                    Object.values(myCart).length == 0
                        
                                    ? 
                        
                                    <EmptyCart 
                                        zIndex="z-50"
                                        text="Looks like you haven't added anything to your cart yet.">
                                    </EmptyCart> 
                        
                                    : 
                        
                                    ''
                                    }

                                    {cartProducts}      


                            </ul>
                             <div className={`${hanndleClassTotal} text-white bg-button2 p-2 rounded-lg total_price justify-around items-center`}>
                  
                                <span className="total_title">Total</span>
                                <span className="total font-normal text-xl">
                                    ${totalPrice.length === 0 ? null : renderTotalPrice}
                                </span>
                  
                            </div>

                            </motion.div>
                           
                            
                        </motion.div>
                     )   
                    }
                </AnimatePresence>

            </div> 
        </div>
    )

}

export default Navigation