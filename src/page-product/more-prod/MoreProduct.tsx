


import { ActualProduct } from "../../context/types/typesApi";

import { useMyContext } from "../../context/useMyContext";


interface MoreProductType{
    actualProduct : ActualProduct;
}
function MoreProduct({actualProduct}: MoreProductType){

    console.log('ASIDE MAS PRODUCT')

    const { productData }= useMyContext()


    const more = productData.map((item, i)=>{
       if(actualProduct.productCategory == item.productCategory){
        return  <div key={i} className="product-five-stars  shadow-md w-3xs cursor-pointer hover:shadow-lg m-2">
                    <div className="image w-full h-[220px] bg-white">
                        <img className="w-full h-full object-contain" src={item.productImage} alt={item.productTitle} />
                    </div>
                    <div className="text-image bg-white py-4 px-2 flex justify-between  h-[100px]">
                        <h2> {item.productTitle} </h2>
                        <span className="price">
                            <h2 className="font-semibold text-black"> {item.productPrice}$ </h2>
                        </span>
                    </div>
                </div>

       }
    })


    // mostrar productos de la misma categoria

    return(

        <section className="more_products p-2 w-full">

            <h1 className="font-bold text-lg my-2">Productos relacionados</h1>

            <div className="content-products-five-stars flex flex-wrap">


                {more}

            </div>
            

        </section>

    )
}

export default MoreProduct