import { useState } from 'react'
import { ActualUser } from '../context/types/typesApi'

// React Route
import { Routes, Route} from "react-router-dom"


// Components
import SignIn from '../registro-components/SignIn';
import Header from '../header-component/Header';
import SectionProducts from '../listProducts-component/Section_products';
// import Slider from '../slider-component/Slider';
import Slider from '../slider-component/SliderVersion2';
import Footer from '../footer-component/Footer'
import ProductsList from '../whishList-component/ProductsList'
import Registro from '../registro-components/Registro';
import DashboardUser from '../registro-components/DashboardUser';
import Pagina from '../page-product/Pagina';
import ContainerCardHome from './ContainerCardHome';
import Pagination  from '../pagination-btns/PaginationBtns';


// CSS
import '../global.css'
import '../style.css'
import '../index.css'

// import '../output.css'

//Provider
import ProductsContext from '../context/ProductsContext';

// TS Interfacr
import { ProductsWhishList } from '../context/types/typesApi'

interface stateApp{
  activeComponentes : boolean;
  actualUser : string | null;
  userLog : boolean;
  
}
// useEffect, permite ejecutar un codigo cuando nosotro lo necesitemos
// useMemo , evita el renderizado 
function App() {

  const [activeComponents, setActiveComponents] = useState<stateApp['activeComponentes']>(true)


  const [actualUser , setActualUser] = useState<ActualUser | null>(null)

  // USUARIO LOGEADO
  const [userLog, setUserLog] = useState<stateApp['userLog']>(false)


  const [list, setList] = useState<ProductsWhishList[]>([])


  const wishItems = (_id: number,_image:string,_product:string,_description:string,_price:number,_cantidad:number,_color:string)=>{

    const whishProduct: ProductsWhishList = {
      id: _id,
      image:_image,
      product: _product,
      description: _description,
      price: _price,
      quantity: _cantidad,
      color: _color
    }
  
    setList((prevWishList) => {
        const updatedWishList = [...prevWishList, whishProduct];
        
        
        return updatedWishList;
    });

}


  return (
    <>

  <ProductsContext>
    
      <Header 
      actualUser={actualUser} 
      setActualUser={setActualUser}
      setUserLog={setUserLog}>
      </Header>

      <main className='bg-body'>   

        {/* El estado es true los componentes se muestran */}
        {/* verifican que sea true para mostrar */}
        {activeComponents && <Slider activeComponents={activeComponents}></Slider>}
        {activeComponents && <ContainerCardHome activeComponents={activeComponents}></ContainerCardHome>}

        {/* En SectionProcuts se usa el estado activeComponents, para cambiarlo a true */}

          <Routes>
            <Route 
            path='/' 
            element={
              <SectionProducts 
              activeComponents={activeComponents}
              setActiveComponents={setActiveComponents}>
              </SectionProducts>
              }>
                
            </Route>

            {/* En pagina activeComponents es false, se ocultan */}
            {/* doble renderizacion */}
            <Route
              path='/products/:productId'
              element={
              <Pagina 
              actualUser={actualUser}
              onClick={wishItems} 
              setActiveComponents={setActiveComponents}>
              </Pagina>}>
            </Route>


            <Route path='/micuenta' 
            element={
            userLog 
              ?
            // en vez de volver a la seccion de producto, crear un componente que muestre datos, y registros de las compras
            <DashboardUser 
            // setSliderActive={setSliderActive} 
            setUserLog={setUserLog} 
            actualUser={actualUser} 
            setActualUser={setActualUser}
            ></DashboardUser>

            :        

            <Registro  
            activeComponents={activeComponents} 
            setActiveComponents={setActiveComponents}
            setUserLog={setUserLog} 
            setActualUser={setActualUser}>
            </Registro>
          }>


            </Route>


            <Route path='/wishlist' 
              element={
            // whislIst COmponente

              <ProductsList 
              actualUser = {actualUser}
              setActiveComponents={setActiveComponents} 
              items={list}
              setList={setList}/>
              }>
            </Route> 


           {/* componente registrarse */}

            <Route 
              path="/signin"
              element={activeComponents && <SignIn activeComponents={activeComponents} setActiveComponents={setActiveComponents}></SignIn>}>
            </Route>
          </Routes>

        {/* COmponente pagination */}
        {activeComponents && <Pagination activeComponents={activeComponents} setActiveComponents={setActiveComponents}></Pagination>}
              
      </main>

    
   
  </ProductsContext>
  <Footer></Footer>
    </>
  )
}

export default App
