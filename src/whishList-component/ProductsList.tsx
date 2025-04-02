// hooks
import React, { useContext, useEffect, useRef ,useState} from 'react';

// Components
import Cantidad from '../page-product/sub-component-pag/Cantidad'
import ErrorComponent from '../errors-component/ErrorComponent';
import ProductCard from '../card-product-component/Card';
import ButtonPag from '../buttons-component/ButtonPag';
import EmptyCart from '../errors-component/EmpyCart';


// Provider
import { useMyContext } from '../context/useMyContext';
import { contextProducts } from "../context/context"


// types

import { ActualUser } from '../context/types/typesApi';
import { ProductsWhishList } from '../context/types/typesApi'

interface ProductListType{
    actualUser : ActualUser | null;
    setActiveComponents: React.Dispatch<React.SetStateAction<boolean>>;
    items: ProductsWhishList[];
    setList: React.Dispatch<React.SetStateAction<ProductsWhishList[]>>;
}

function ProductsList({actualUser, setActiveComponents,items, setList}: ProductListType){

    const [ showModalError, setshowModalError] = useState(false)



    const {
        purchasedProducts,
        setPurchasedProducts
        } = useMyContext()

    const mapWishList = items.map((item)=>(
        <ProductCard
            key={item.id}
            id={String(item.id)}  
            image={item.image}
            product={item.product} 
            description={item.description}
            price={item.price}
        ></ProductCard>
    ))
// cuando se guarde aca , se debe mostrar siempre
    const processPurchase = (e: React.MouseEvent<HTMLButtonElement>)=>{
        // 1) verificar que tenga cuenta
        // 2) si la tiene mostara un modal o algo asi
        console.log('Comprar mierdas 2.0')  
        console.log(items)

        console.log(items.length, 'cantidad de producto a comprar')
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



    useEffect(()=>{
        setActiveComponents(false)


    }, [])

    return(

        <section id="wishList" 
        // className="p-2 flex justify-center items-center flex-col flex-wrap"
        >

        <ErrorComponent
        visible={showModalError} 
        messageModal="Registrate para continuar"
        txtButton='bg-blue-200'
        actualUser={null}
        colorBtn='bg-green-500'
        title=''
        image="/images/hearts.svg"
        handleModal={handleModalWishList}>
        </ErrorComponent>

            <div className="title-wishList">

                <h1 className='h1-wishList'>
                    Tu Lista de Deseos
                </h1>

                <div className="underline">

                </div>
            </div>

            <div className="content-wishList min-h-screen flex justify-center items-center flex-wrap">
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
            <div className='button-buy'>
                {
                    items.length !== 0
                    ? 
                    <ButtonPag 
                    text="REALIZAR COMPRA"
                    clr="bg-button"
                    clrText="white"
                    width="w-auto"
                    onClick={processPurchase}>
                    </ButtonPag>
                    :
                    null
                }
            </div>
        </section>

    )
}

export default ProductsList