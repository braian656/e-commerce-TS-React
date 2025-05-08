// hooks
import React, {useEffect,useState} from 'react';

// Components
import ErrorComponent from '../errors-component/ErrorComponent';
import ProductCard from '../card-product-component/Card';
import EmptyCart from '../errors-component/EmpyCart';

// Provider
import { useMyContext } from '../context/useMyContext';


// types

import { ProductsWhishList } from '../context/types/typesApi'

interface ProductListType{
    setActiveComponents: React.Dispatch<React.SetStateAction<boolean>>;
    items: ProductsWhishList[];
    setList: React.Dispatch<React.SetStateAction<ProductsWhishList[]>>;
}

function ProductsList({ setActiveComponents,items, setList}: ProductListType){
    console.log('Lista Productos')

    const [ showModalError, setshowModalError] = useState(false)



    const { setPurchasedProducts ,actualUser } = useMyContext()

    const removeFromList = (e:React.MouseEvent<HTMLButtonElement>)=>{
        const target = e.currentTarget.parentElement?.parentElement as HTMLElement
        const remove = items.filter(prod => prod.id !== Number(target.id))
        setList(remove)
    }

    
    const mapWishList = items.map((item)=>(
        <ProductCard
            key={item.id}
            id={String(item.id)}  
            image={item.image}
            product={item.product} 
            description={item.description}
            price={item.price}
            onClick={removeFromList}
        ></ProductCard>
    ))

   
    const processPurchase = (e: React.MouseEvent<HTMLButtonElement>)=>{
        // 1) verificar que tenga cuenta
        // 2) si la tiene mostara un modal o algo asi
      
        if(actualUser !== null){

            items.forEach((product, i)=>{

                
                const newItems = {
                    producto: product.product,
                    price : product.price,
                    color : product.color,
                    cantidad : product.quantity,    
                }


                setPurchasedProducts(prevProducts => [...prevProducts, newItems]);

            })

            // mostrar modal


            setList([])
            
            // total de productos
            // pasarlo a mi cuenta, productos comprados
           
        }else{
            setshowModalError(true)

      

        }

    }

    const handleModalWishList = ()=>{

        setshowModalError(false)

    }



    useEffect(()=>{setActiveComponents(false)}, [])

    return(

        <section id="wishList">

            <ErrorComponent
            visible={showModalError} 
            messageModal="Registrate para continuar"
            txtButton='bg-blue-200'
            userFromDB={null}
            colorBtn='bg-green-500'
            title=''
            image="/images/hearts.svg"
            handleModal={handleModalWishList}>
            </ErrorComponent>

            <div className="title-wishList flex justify-between p-2">
                <h1 className='txt-wishList'>
                    Lista de deseos                    
                </h1>                
                {

                    items.length !== 0 
                    ? 
                    <button className="cursor-pointer px-4 py-2 bg-[#232323] text-gray-200 rounded-md flex items-center"  
                        onClick={processPurchase}>
                        Realizar compra

                        <div className='ml-2 current-count font-semibold w-[30px] h-[30px] bg-button text-white p-1 rounded-full flex justify-center items-center'>
                            {items.length}
                        </div>
                    </button>  
                    :
                    null
                }
            </div>
            <div className="min-h-screen flex justify-start items-start rounded-md flex-wrap">
                    {
                        items.length !== 0 
                        ? 
                        mapWishList
                        :  
                        <EmptyCart 
                        text="Aun no hay nada por aqui..."
                        zIndex=''>
                        </EmptyCart> 
                    }
            </div>
        </section>

    )
}

export default ProductsList