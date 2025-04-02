
import React from 'react';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { AlignJustify } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux';


import { useMyContext } from '../context/useMyContext';
import { removeProduct } from '../store/features/cart';


import { RootState } from '../store';

// type
import { ActualUser } from '../context/types/typesApi';


// components
import ModalProductsUser from '../nav-component/ModalProductsUser';
import UserNav from '../nav-component/UserNav';
import EmptyCart from '../errors-component/EmpyCart'

// css
import '../index.css'

// actualUser no es un string, es un obj
interface HeaderProps{

  actualUser : ActualUser | null;
  setUserLog : React.Dispatch<React.SetStateAction<boolean>>;
  setActualUser : React.Dispatch<React.SetStateAction<ActualUser | null>>
  
}

function Header({ actualUser,setUserLog, setActualUser}: HeaderProps){

    const {
      // productCart,
      // setProductCart,
      totalPrice, 
      setTotalPrice,
      renderTotalPrice
    } = useMyContext()

    
    const [menuOpen, setMenuOpen] = useState<boolean>(false)
    const [modalProduct, setModalProduct] = useState<boolean>(false)


    const myCart = useSelector((state:RootState) => state.handleCart.items)
    // myCart solicita info de el carro de Compras

    const dispatch = useDispatch()

    const removeProductFromCart = useCallback((id:number, price:number)=>{


      dispatch(removeProduct(id))
        
      setTotalPrice((prevPrice)=>{
          const index = prevPrice.indexOf(price)

          if(index > -1){
            const updatePrice = [...prevPrice]
            updatePrice.splice(index, 1)
            return updatePrice
          }

          return prevPrice
      })

    }, [dispatch])

    // mostrar el carrito
    // 1 render solucionado

    // const showShoppingCart = myCart.map(({id, img, value, cost})=>(

    //   <ModalProductsUser
    //       key={id} 
    //       id={id} 
    //       image={img} 
    //       product={value} 
    //       price={cost}
    //       onClick={removeProductFromCart}>    
    //   </ModalProductsUser>
    // ))

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
  
    
     // abrir menu en dispositivos mobiles
     const openMenu = ()=>{
      setMenuOpen(!menuOpen)

      if(modalProduct === true){
        setModalProduct(false)
      }

    }

    const seeModalProduct = ()=>{
      setModalProduct(!modalProduct)

      if(menuOpen === true){
        setMenuOpen(false)
      }
      
    }

    const modalShow = modalProduct ? 'active-cart' : 'cart'
    // const handleClassMenu = menuOpen ? '-translate-y-full z-10' : 'translate-y-0 z-50'
    const handleClassMenu = menuOpen ? 'translate-y-0 z-50' : '-translate-y-full -z-10'

    const hanndleClassTotal =  totalPrice.length === 0 ? 'hidden' : 'flex'
  





    const boxUserProduct = useRef<HTMLUListElement | null>(null)
    const buttonSeeModal = useRef<HTMLButtonElement | null>(null)

    useEffect(()=>{
      // as/es una propiedad de ts
      // dice verifica este elemento como tal
      // en este caso verifica el evento como un elemento html

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



    const closeMenu = (event: React.MouseEvent<HTMLUListElement>)=>{

      if (!(event.target instanceof HTMLUListElement)) {
        return;
      }
    
      if(event.target?.dataset && event.target?.dataset.type == 'link') setMenuOpen(false)

      
    }
   
    return(
      <header className='bg-button p-2 sticky z-50 top-0 overflow-hidden'>

        <nav className='flex justify-between items-center'>

          <div className="logo w-10 h-10 z-50">
          <Link to="/">
            <img 
            className='w-full h-full' 
            data-type="img" 
            src="./images/ecommerce.svg" 
            alt="e-commerce" />
          </Link>   
          </div>


          {/* miniComponente menu */}
          <ul 
          onClick={closeMenu}
          className={`menu-sm ${handleClassMenu} bg-button sm:relative sm:top-0 sm:translate-y-0 sm:w-auto sm:h-auto sm:flex sm:flex-row sm:items-center sm:justify-center z-40`}>
            
            <li className='mb-5 sm:mb-0 ' >
              <Link 
              to="/" 
              data-type="link"
              className='text-anchor font-bold py-2 px-4'>
                INICIO
              </Link>
            </li>

            <li className='mb-5 sm:mb-0' >
              <Link 
              data-type="link"
              to="/wishlist" 
              className='text-anchor font-bold py-2 px-4'>
                MI LISTA
              </Link>        
            </li>

            <li className='bg-body px-1 py-2 mb-5 text-text rounded-lg sm:mb-0'>
              <Link 
              data-type="link"
              to="/micuenta" 
              className='text-button font-bold py-2 px-4'>
                MI CUENTA
              </Link>
            </li>
            
          </ul>  


        


          <div className="btns-cart flex z-50">


            {

            actualUser !== null 
            
            ? 

            <UserNav 
            setUserLog={setUserLog} 
            actualUser={actualUser} 
            setActualUser={setActualUser}
            ></UserNav>

            : 
            null
            
            }

            <button 
            ref={buttonSeeModal}
            className='btn-cart z-50 bg-body rounded-lg px-1 py-2 ease-out duration-700 border-2
            border-transparent hover:border-button2 
            hover:bg-button hover:scale-105 hover:text-button2'
            onClick={seeModalProduct}>

              <span className='text-red-500 px-1 font-semibold rounded-md -z-10'>
                {myCart.length}
              </span>
              
              <i className="fa-solid fa-cart-shopping -z-10"></i>

            </button>
            
            <button 
            className='btn-menu z-50 sm:hidden'
            onClick={openMenu}>   
            
            
            <AlignJustify 
             size={32} 
             color="#2b2c30"/>

            </button>
          </div>
        </nav>

        <div 
        className={`${modalShow}`}>
          
          <ul 
          className='ul-list-product'
          ref={boxUserProduct}>

            {/* esto no funcionaba por que tenia otra version de js*/}
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
    
      </header>
    )
}


export default Header