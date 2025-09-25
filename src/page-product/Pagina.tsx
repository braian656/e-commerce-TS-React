// hooks
import {
        useEffect,
        useState,
        useCallback } from "react"




// components
import ModalComponent from "../errors-component/ModalComponent"
import ErrorComponent from "../errors-component/ErrorComponent"
import SubComponentPag from './sub-component-pag/SubComponentPag'
import ButtonPag from "../buttons-component/ButtonPag"
import MoreProduct from "./more-prod/MoreProduct"


// Provider
import { useMyContext } from "../context/useMyContext"

import {Star} from 'lucide-react'

// Verificar uso del los useHooks - check
interface SliderProp{
    setActiveComponents: React.Dispatch<React.SetStateAction<boolean>>;
    onClick: (
        _id: number, 
        _image: string, 
        _product: string, 
        _description: string, 
        _price: number, 
        _cantidad: number, 
        _color: string
      ) => void;
}


function Pagina({onClick,setActiveComponents} : SliderProp){

    console.log('COMPONENTE PAGINA')

    const { actualProduct,
            productData, 
            setPurchasedProducts,
            userFromDB,    
        } =  useMyContext()

    
    const [noUser, setNoUser] = useState(true) /*Verifico si el user tiene cuenta o no*/
    const [showMesaggeErr, setShowMessageErr] = useState(false) /*Muestra el modal msj si es true*/
    const [message, setMessage] = useState('')  /*Mensaje a mostrar en el modal*/
    const [txtButton , setTxtButton] = useState('')
    const [imgError, setImgError] = useState('') /*titulo del boton en el modal*/
    const [titleModal, setTitleModal] = useState('')
    const [wishListModal, setWishListModal] = useState(false)

    const [quantity, setQuantity] = useState(1) /*Cantidad de producto a ordenar, por defecto siempre 1*/
    const [color,setColor] = useState('')


    const handleData = useCallback(()=>{

        if (userFromDB === null) {
            setNoUser(false);
            setMessage('Inicia sesion para realizar la compra.');
            setTxtButton('IR A MI CUENTA');
            setShowMessageErr(true);
            setImgError('/images/sad-circle.svg')
            setTitleModal('Accede para Continuar')

            return;
        }
        if (quantity !== 0 && color !== '') {
            let allFieldsFilled = true;
        
            if (allFieldsFilled) {

                const preference = {

                    producto: actualProduct.product, 
                    price : actualProduct.total ,
                    color: color, 
                    cantidad: quantity,
    
                };

                
                // Si todos los campos son válidos
                setPurchasedProducts(prevProducts => [...prevProducts, preference]);
                // esto evita un anidado de arr
                setMessage(actualProduct.product);
                setTxtButton('Aceptar');
                setShowMessageErr(true);
                setImgError('/images/check.svg')
                setTitleModal('¡Compra realizada con éxito!')
    
                return
            } else {
                // Si algún campo es inválido
                setMessage('Rellene los campos necesarios para realizar su compra');
                setTxtButton('CERRAR');
                setShowMessageErr(true);
                setImgError('/images/ghost.svg')
                setTitleModal('Informacion requerida')

            }
        } else {
            // Si no hay ninguna preferencia
            setMessage('Rellene los campos necesarios para realizar su compra');
            setTxtButton('CERRAR');
            setShowMessageErr(true);
            setImgError('/images/ghost.svg')
            setTitleModal('Informacion requerida')


        }




        
    },[color,quantity])


    const [num, setNum] = useState<number>(0);

    const showStars = Array.from({ length: num }, (_, i) => (


    <span className="m-0.5">

        <Star key={i} className="fill-yellow-400 text-yellow-400"/>

    </span>

    
    ));


    useEffect(()=>{

        
        setActiveComponents(false)


        productData.forEach(item => {
                if(item.productId === actualProduct.index){
                    // Esta actualizando un estado setNum
                    // fijar que apunte correctamente al rate
                    setNum(Math.round(item.productRatingRate))
                }
        });


    },[actualProduct.index, productData])


    const handleModal = ()=>{
        setShowMessageErr(false)
        setImgError('')

    }

    // por aca akgi me pide no se

    const addToWishList = ()=>{    
        if (quantity !== 0 && color !== ''){

            onClick(

                actualProduct.index,
                actualProduct.image,
                actualProduct.product,
                actualProduct.descr,
                actualProduct.total,
                quantity, 
                color

            )
    
            setWishListModal(true)
        }

        // optimizar esto
        if (userFromDB === null) {
            setNoUser(false);
            setMessage('Inicia sesion para realizar la compra.');
            setTxtButton('IR A MI CUENTA');
            setShowMessageErr(true);
            setImgError('/images/sad-circle.svg') /*No estoy usando esta img*/
            setTitleModal('Accede para Continuar')

            return;
        }
    
        
    }
    const handleModalWishList = ()=>{

        setWishListModal(false)

    }

   
    // optimizar aca, pagina ya esta cargada, solo queremos renderizar los elmentos
    // interactivo dentro
    return(

    <section 
    className={`${showMesaggeErr || wishListModal ? 'bg-opacity' : 'bg-body'} p-2  flex justify-center items-center flex-col`}>

   
        {
            showMesaggeErr

            &&
            <ModalComponent
            visible={showMesaggeErr} 
            handleModal={handleModal}
            messageModal={message}
            txtButton={txtButton}
            userFromDB = {userFromDB}
            colorBtn='bg-green-500'
            image={imgError}
            title={titleModal}>
                
            </ModalComponent>
        }
    

        {
            wishListModal 

            &&
            
            <ErrorComponent 
            visible={wishListModal} 
            handleModal={handleModalWishList}
            messageModal="Producto Agregado a la lista de deseos"
            txtButton={txtButton}
            userFromDB = {userFromDB}
            colorBtn='bg-green-500'
            image="/images/hearts.svg"
            title="Producto agregado"
            >
            </ErrorComponent>
        }

        <div 
        id={String(actualProduct.index)} 
        className="p-2 product-pag rounded-xl my-[2vh] sm:flex sm:justify-between  sm:items-center">
            {/*    sm:min-w-[220px] */}
            <div 
            className="product_image flex flex-col justify-center items-center shadow-md sm:w-[44%] sm:min-w-[220px]">
                <div className="img-1">
                    {/* sm:h-full sm:h-auto sm:w-auto */}

                    <img 
                    src={actualProduct.image}
                    alt={actualProduct.product}
                    className="w-full h-full sm:h-[510px] object-contain object-center " 
                    loading="lazy"/>

                </div>

                <div className="img-sec flex justify-start">
                    
                    {/* dinamico */}
                    <div className="mini-img p-1 m-1 border-2 border-gray-500 rounded-md">
                        <img 
                        src={actualProduct.image}
                        alt={actualProduct.product}
                        className="w-[80px] h-[80px] object-contain object-center pointer" 
                        loading="lazy"/>

                    </div>

                    <div className="mini-img p-1 m-1 pointer border-2 border-gray-500 rounded-md">
                        <img 
                        src={actualProduct.image}
                        alt={actualProduct.product}
                        className="w-[80px] h-[80px] object-contain object-center " 
                        loading="lazy"/>

                    </div>

                    
                   
                    
                </div>
                
            </div>

            <div className="producto_detail p-5 sm:w-[56%] flex justify-center items-center">
                <div className="detail w-full">

                    <span className="category text-button font-semibold text-xs">
                        {actualProduct.productCategory}
                    </span>

                    <h1 className="name text-button2 text-xl font-semibold sm:my-3 sm:text-3xl">
                        {actualProduct.product}
                    </h1>

                    <div className="price flex justify-start items-start sm:my-4 flex-col">

                        <div className="review_star flex text-2xl">
                            {showStars}     
                        </div>

                        <h2 className="text-button2 font-bold text-2xl">
                            ${actualProduct.total}
                        </h2>
                    </div>

                    <div className="descrption justify-center items-center flex-col sm:my-5">
                        
                        <p className="text-gray-600 sm:my-2">
                            {actualProduct.descr}
                        </p>
                    </div>



                    <SubComponentPag 
                    setColor={setColor} 
                    setQuantity={setQuantity} 
                    quantity={quantity}>

                    </SubComponentPag>

                    <ButtonPag 
                        text="Agregar a la lista de deseo" 
                        onClick={addToWishList} 
                        clr="bg-zinc-900"
                        clrText="white"
                        width="w-full"
                        border="border border-solid border-white cursor-pointer"
                        hoverButton="hover:text-zinc-900 hover:bg-gray-500">
                        
                    </ButtonPag>
                    <ButtonPag 
                        text="COMPRAR" 
                        onClick={handleData} 
                        clr="bg-button"
                        clrText="white"
                        width="w-full"
                        border="none"
                        hoverButton="hover:border-button2 cursor-pointer hover:bg-red-600">                  
                    </ButtonPag>
                </div>
            </div>

        </div>




        <MoreProduct actualProduct={actualProduct}></MoreProduct>
       
    </section>
    )
}

export default Pagina