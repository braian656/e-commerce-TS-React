
import { useState, useEffect , useMemo, ReactNode} from "react"
import { contextProducts } from "./context"
import {InfoApi, ActualProduct,CurrentInfo} from './types/typesApi'
import ProductCard from "../card-product-component/Card"


const ProductsContext = ({children}: {children: ReactNode})=>{


    const [currentInfo, setCurrentInfo] = useState<CurrentInfo | undefined>(undefined);

    const [ productData, setProductData ] = useState<InfoApi[]>([])

    const totalProducts = productData.length; /*Cantidad de Productos*/

    
    const [productsPerPage, setProductsPerPage] = useState<CurrentInfo['productsPerPage']>(6); /*Cantidad de productos que se van a mostrar*/
    const [currentPage, setCurrentPage] = useState<CurrentInfo['currentPage']>(1) /* Pagina actual De la paginacion */

    const lastIndex = currentPage * productsPerPage
    const firstIndex = lastIndex - productsPerPage

    console.log(firstIndex, lastIndex,  'index')

    const [openPagProduct, setOpenPagProduct] = useState<CurrentInfo['openPagProduct']>(false)
    // actualProduct, muestra la informacion del producto en una pag nueva
    const [actualProduct, setActualProduct] = useState<ActualProduct>(

      {
        index : 0,
        image : '',
        product : '',
        descr : '',
        total : 0,
        productCategory : '',
        rating: 0,
      }

  )


    const [totalPrice , setTotalPrice] = useState<CurrentInfo['totalPrice']>([])
    const [selectingPrice, setSelectingPrice] = useState<CurrentInfo['selectingPrice']>(null) 
    /*Selecciona el precio, luego lo usa total price, para sumar y dar el total*/

    // const [productCart, setProductCart] = useState([]);
    const [categories, setCategories] = useState<CurrentInfo['categories']>('')
    const [userSelectedCategory, setUserSelectedCategory] = useState<CurrentInfo['userSelectedCategory']>(['All']) /*Contiene todas las categorias*/
    const [someErr, setSomeErr] = useState<CurrentInfo['someErr']>('')
    const [purchasedProducts , setPurchasedProducts] = useState<CurrentInfo['purchasedProducts']>([])
    const [picUser, setPicUser] = useState<CurrentInfo['picUser']>('/images/profile.png')
    
    const getApiProducts = async()=>{
     try{
      const data = await fetch('https://fakestoreapi.com/products')
      const prod = await data.json()

      const collectionProduct: InfoApi[] = prod.map((product: { 
        id: number; 
        key: number; 
        image: string; 
        title: string; 
        price: number; 
        category: string;
        rating : {rate:number};
        descr: string;
      }) => ({
        // productId: product.id,
        // productKey: product.key,
        // productImage: product.image,
        // productTitle: product.title,
        // productPrice: product.price,
        // productCategory: product.category,
        // productDescription:  product.descr,
        // productRatingRate: product.rating.rate,

        productId: product.id ?? 0,  // Asegura que siempre haya un número
        productKey: product.key ?? 0,
        productImage: product.image || "",  // Evita valores undefined
        productTitle: product.title || "Sin título",
        productPrice: product.price ?? 0, 
        productCategory: product.category || "Desconocido",
        productDescription: product.descr || "Sin descripción",
        productRatingRate: product.rating?.rate ?? 0,
      }));

      
      // Guarda los datos en el estado
      // setProductData(prod)
      setProductData(collectionProduct)
      // console.log(prod)

      // productData.forEach((element: InfoApi) => {
      //   return setCategories(element.category)
      // });
      collectionProduct.forEach((element) => {
        setCategories(element.productCategory); // Asegúrate de que `ProductCategory` sea el nombre correcto
      });

     }catch(error){
      console.log('Error', error)
      setSomeErr('ALGO SALIO MAL...')
     }

     
    }

    useEffect(()=>{
      getApiProducts()

    },[])

    
  // se suponene que no funcionaba por que TS esperaba solo un parametro,y paso mucho
  // no entiendo una pija
    const pagProduct = ( product: ActualProduct )=>{
      // arreglar esta mierda ,no se que puta estoy haciendo aca
      setActualProduct(
        (
          {
            index: product.index,
            image: product.image,
            product: product.product,
            descr: product.descr,
            total: product.total,
            productCategory: product.productCategory,
            rating: product.rating
          }
        )
      );

      setOpenPagProduct(true)
      
    }

    // este esstado por defecto estaba en null
    const [activeItemId, setActiveItemId] = useState<CurrentInfo['activeItemId']>(null);

    // const [animate, setAnimate] = useState(false)

    // const productsSelecting = (e,id,image,product,price)=>{
    //   const buscarDuplicado = productCart.find((product)=> product.id == id)
    //   if(!buscarDuplicado){

    //     const item = {id:id, value:product, cost:price, img:image}
    //     setProductCart((prevProduct) => [...prevProduct, item]);
    //     setSelectingPrice(item.cost)

    //     // setAnimate(true); // Quita la clase de animación

    //     setActiveItemId(prevId => (prevId === id ? null : id));


    //   }

  
    // }


    // suma la cantidad de elementos dentro de algo?
    // const renderTotalPrice = useMemo(() => {
    //   const sumProducts = totalPrice.reduce((acc, curr) => acc + curr, 0);
    //   return sumProducts
    // }, [totalPrice]);
    

    const renderTotalPrice = useMemo<number>(() => {
      const sumProducts = totalPrice.reduce((acc, curr) => {
        if (typeof curr === 'number') {
          return acc + curr;
        }
        return acc; // Si el valor no es un número, lo ignoramos
      }, 0);
      return sumProducts;
    }, [totalPrice]);
    
    // totalPrice es un numero
    
    useEffect(() => {

      if (selectingPrice !== null && !totalPrice.includes(selectingPrice)) {
        setTotalPrice((prevPrice) => [...prevPrice, selectingPrice]);
        setSelectingPrice(null)
        // no lo limpiada, por eso quedaba guardado el ultimo numeoro
      }

    }, [selectingPrice]);
    // Añadimos totalPrice como dependencia
    
    console.log(userSelectedCategory)


   
    return(

        <contextProducts.Provider value={{
          productData, 
          setProductData, 
          actualProduct,
          setActualProduct,
          pagProduct, 
          totalPrice,
          setTotalPrice,
          renderTotalPrice,
          openPagProduct,
          setOpenPagProduct,
          totalProducts,
          productsPerPage,
          setProductsPerPage,
          currentPage,
          setCurrentPage,
          lastIndex, 
          firstIndex,
          categories,
          setCategories,
          someErr,
          setSomeErr,
          userSelectedCategory,
          setUserSelectedCategory,
          purchasedProducts,
          setPurchasedProducts,
          picUser,
          setPicUser,
          selectingPrice,
          setSelectingPrice,     
          activeItemId,
          setActiveItemId,
        }}>

        {children}

        </contextProducts.Provider>
    )
}

export default ProductsContext