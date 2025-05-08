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

    const handlePreference = (e: React.MouseEvent<HTMLDivElement>) => {

        e.preventDefault()

        const target = e.target as HTMLElement;

        console.log(target.dataset.clr)
        if(target.dataset.clr == undefined) return

        setColor(target.dataset.clr)  
        // guarda el clr en un estdo lo usa luego
    };

    return(
        <>
        <div className="preference flex  items-start sm:my-4">

            <div className="preference_box">
                <ChooseColor

                onClick={handlePreference} 
                clr1="bg-red-500" 
                clr2="bg-blue-500" 
                clr3="bg-green-500"

                ></ChooseColor>
            </div> 

            <div className="preference_box mx-5">

                <h3 className="quantity font-semibold text-button2 my-1.5 text-start">
                    Cantidad
                </h3>

                <Cantidad 
                    onClickIncrement={increment}
                    onClickDecrement={decrement}
                    count={quantity}>
                </Cantidad>
            </div>        
           


            <div className="preference_box">
                <h3 className="total text-button2 font-semibold my-1.5 text-start">
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