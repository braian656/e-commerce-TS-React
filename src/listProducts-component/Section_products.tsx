import React, { useEffect } from 'react'
import Products from '../card-product-component/Products'

interface SectionProdProp{
    activeComponents : boolean;
    setActiveComponents : React.Dispatch<React.SetStateAction<boolean>>
}

function sectionProducts({setActiveComponents}: SectionProdProp){


    console.log('WRAPPER PRODUCTS')
    useEffect(()=>{setActiveComponents(true)}, [])

  

    

    return (
        <section id="products" className='p-2 bg-body flex justify-center items-center flex-wrap'>       
            <Products></Products>
        </section>

    )
}

export default sectionProducts