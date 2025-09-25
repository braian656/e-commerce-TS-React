import { useState } from 'react'

// React Route
import { Routes, Route} from "react-router-dom"


// Components
import SignIn from '../registro-components/SignIn';
import SectionProducts from '../listProducts-component/Section_products';
import Slider from '../slider-component/SliderVersion2';
import Footer from '../footer-component/Footer'
import ProductsList from '../whishList-component/ProductsList'
import Registro from '../registro-components/Registro';
import DashboardUser from '../registro-components/DashboardUser';
import Pagina from '../page-product/Pagina';
import Pagination  from '../pagination-btns/PaginationBtns';
import Navigation from '../header-component/Navigation';
import Features from './NewCardHome';

import '../global.css'

//Provider

import ProductsContext from '../context/ProductsContext';

// TS Interfacr
import { ProductsWhishList } from '../context/types/typesApi'



// mover esta mierda, al type
interface stateApp{
  
  activeComponentes : boolean;
  userLog : boolean;
  
}
// useEffect, permite ejecutar un codigo cuando nosotro lo necesitemos
// useMemo , evita el renderizado 
function App() {

  console.log('Renderizando sitio')
  const [activeComponents, setActiveComponents] = useState<stateApp['activeComponentes']>(true)


  const [userLog, setUserLog] = useState<stateApp['userLog']>(false)

  // USUARIO LOGEADO


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

// implementar lazy loading en los router


  return (
    <>

  <ProductsContext>
        <Navigation setUserLog={setUserLog} activeComponents={activeComponents}items={list}></Navigation>

    
      {/* <Header setUserLog={setUserLog}></Header> */}
      <main className='bg-body'>   

        {/* El estado es true los componentes se muestran */}
        {/* verifican que sea true para mostrar */}
        {activeComponents && <Slider activeComponents={activeComponents}></Slider>}
        {/* {activeComponents && <ContainerCardHome activeComponents={activeComponents}></ContainerCardHome>} */}
        
        {activeComponents && <Features></Features> }

        {/* En SectionProcuts se usa el estado activeComponents, para cambiarlo a true */}

          <Routes>
            <Route 
              path='/' 
              element={<SectionProducts activeComponents={activeComponents} setActiveComponents={setActiveComponents}></SectionProducts>}>    
            </Route>
            <Route
              path='/products/:productId'
              element={
              <Pagina onClick={wishItems} setActiveComponents={setActiveComponents}></Pagina>}>
            </Route>
            <Route path='/micuenta' 
                  element={
                    userLog 

                      ?
                    <DashboardUser activeComponents={activeComponents} setActiveComponents={setActiveComponents} setUserLog={setUserLog}></DashboardUser>

                    :  
                    <SignIn  activeComponents={activeComponents} setActiveComponents={setActiveComponents} setUserLog={setUserLog}></SignIn> 

                  }>

            </Route>


            <Route path='/wishlist' 
              element={<ProductsList setActiveComponents={setActiveComponents} items={list} setList={setList}/>}>
            </Route> 

    
            <Route path="/register" element={<Registro activeComponents={activeComponents} setActiveComponents={setActiveComponents} setUserLog={setUserLog}></Registro>}></Route>

            <Route 
              path="/signin"
              element={<SignIn activeComponents={activeComponents} setActiveComponents={setActiveComponents} setUserLog={setUserLog}></SignIn>}>
            </Route>

            <Route path='/dashboard' 
              element={<DashboardUser activeComponents={activeComponents} setActiveComponents={setActiveComponents} setUserLog={setUserLog}></DashboardUser>}>
            </Route> 



          </Routes>

        {/* COmponente pagination */}
        {activeComponents && <Pagination activeComponents={activeComponents}></Pagination>}
              
      </main>

    
   
  </ProductsContext>
  <Footer></Footer>
    </>
  )
}

export default App
