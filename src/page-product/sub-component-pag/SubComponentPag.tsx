// poner los subcomponentes aca
// hooks
import React, { memo } from "react"
import { useMyContext } from "../../context/useMyContext"

// components
import ChooseColor from "./ChooseColor"
import Cantidad from "./Cantidad"

interface SubCompProp{
    setColor : React.Dispatch<React.SetStateAction<string>>;
    setQuantity : React.Dispatch<React.SetStateAction<number>>;
    quantity : number;
}

function SubComponentPag({setColor,setQuantity,quantity}: SubCompProp){

   
    const {actualProduct} = useMyContext();

    const increment = ()=>{
        setQuantity(quantity + 1)            
    }

    const decrement = ()=>{
        setQuantity(quantity > 0 ? quantity-1 : 0)
    }

    const handlePreference = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        const target = e.currentTarget as HTMLElement;
        if(target.dataset.clr == undefined) return
        setColor(target.dataset.clr)  
        // guarda el clr en un estdo lo usa luego
    };

    return(
        <>
        <div className="preference flex items-center sm:my-5">

            <div className="preference_box mx-4">

                <h3 className="quantity text-white my-1.5 text-center">
                    Cantidad
                </h3>

                <Cantidad 
                    onClickIncrement={increment}
                    onClickDecrement={decrement}
                    count={quantity}>
                </Cantidad>
            </div>        
            <div className="preference_box mx-4">
                <ChooseColor
                onClick={handlePreference} 
                clr1="bg-red-500" 
                clr2="bg-blue-500" 
                clr3="bg-green-500"
                ></ChooseColor>
            </div> 


            <div className="preference_box">
                <h3 className="total text-white my-1.5 mx-4 text-center">
                    Total
                </h3>
                <div className="w-20 p-1 flex justify-center items-center border-2 border-solid border-text rounded-lg">
                    <span className="total text-text">
                        ${actualProduct.total * quantity}
                    </span>
                </div>
            </div>        
        </div>
        </>
    )
}

export default memo(SubComponentPag)