
// Provider
import { useMyContext } from "../context/useMyContext"

// Components
import TableItems from "./TableItems"


function Table(){


   
    const {purchasedProducts} = useMyContext()


    const isEmpty = purchasedProducts.length !== 0 ? 'flex' :  'hidden'
    const classTitle = purchasedProducts.length !== 0 ? 'hidden' : 'flex'


    console.log(purchasedProducts)
    return(
        <>
        
    

        <div className="section-info p-5"> 

            <h1 className={`ml-[24px] text-center text-2xl font-bold text-gray-500 ${classTitle} mt-3`}>
                AUN NO HAY COMPRAS REALIZADAS
            </h1>
            <div className="content-products">
  
              <TableItems 
                items={purchasedProducts}>
              </TableItems>

            </div>
        </div>
        </>
    )
}

export default Table