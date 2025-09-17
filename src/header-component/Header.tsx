// hooks
import React from 'react';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState, useCallback, useMemo } from 'react';



// reduxt
import { useDispatch, useSelector } from 'react-redux';
import { useMyContext } from '../context/useMyContext';
import { removeProduct } from '../store/features/cart';

// ts
import { RootState } from '../store';

// type
// icons
import { motion, AnimatePresence } from "framer-motion";


// components
import ModalProductsUser from '../nav-component/ModalProductsUser';
// css
import '../index.css'

// actualUser no es un string, es un obj
interface HeaderProps{

  setUserLog : React.Dispatch<React.SetStateAction<boolean>>;
  
}

// actualUser verifica que no se
function Header({setUserLog}: HeaderProps){

    console.log('HEADER')
    const [isOpen, setIsOpen] = useState(false); /*DE practica*/

    const {totalPrice, setTotalPrice,renderTotalPrice,userFromDB,setUserFromDB} = useMyContext()
    
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
    const handleClassMenu = menuOpen ? 'translate-y-0 z-50' : '-translate-y-full -z-10'

    const hanndleClassTotal =  totalPrice.length === 0 ? 'hidden' : 'flex'
  





    const boxUserProduct = useRef<HTMLUListElement | null>(null)
    const buttonSeeModal = useRef<HTMLButtonElement | null>(null)

    useEffect(()=>{
      // as/es una propiedad de ts
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


    const closeMenu = (event:React.MouseEvent<HTMLUListElement>)=>{
    
      const target = event.target as HTMLLIElement;


      if(!target)return
        
      if(target?.dataset && target?.dataset.type == 'link') setMenuOpen(false)
    

      
    }
   
    return(
 

      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Botón para abrir */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
      >
        Abrir Modal
      </button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-xl p-6 w-96"
              initial={{ y: -100, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h2 className="text-xl font-semibold mb-4">🚀 Modal animado</h2>
              <p className="text-gray-600 mb-6">
                Este modal se abre y se cierra con animación.
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    )
}


export default Header