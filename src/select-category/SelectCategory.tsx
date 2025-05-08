// hooks
import { useContext, useEffect, useState } from "react"

// Provider
import { useMyContext } from "../context/useMyContext";


function SelectCategory(){

    
    const {productData, setUserSelectedCategory} = useMyContext()

    const arrCategories: string[] = []

    productData.forEach((category) =>{
        arrCategories.push(category.productCategory)
    })

    const filtrarCategories = arrCategories.reduce((categories, category)=>{
        // si el arr de dep, categories, no incluye la categoria(valor)
        // pujearla
        // luego retornar para que se pueda usar
        if(!categories.includes(category)){
            categories.push(category)
        }

        return categories
    },['All'])

   const showCategory = (e: React.MouseEvent<HTMLDivElement>)=>{
    const button = e.target as HTMLButtonElement


    // verifica que sea una etiqueta button, y la instancia verifica que realmente se uno
    // que tenga las propiedaes de un button
    if(button.tagName === 'BUTTON' && button instanceof HTMLButtonElement){

        setUserSelectedCategory([button.value])
        // setUserSelectedCategory(prevCategories => [...prevCategories, button.value]);
    }

 

   }



    return (

        <div className="container-category bg-button p-2 roudend-md">
            
            <div className="inner-category">
                <div className="category flex items-center justify-center"
                 id="category" 
                 onClick={showCategory}>
                {
                filtrarCategories.map((category)=>(
                    <button
                    value={category}
                    key={category}>
                    {category}
                    </button>
                    ))
                }
                </div>
            </div>
            
        </div>

    )
}

export default SelectCategory