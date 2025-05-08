import React from "react"
// Verificar uso del los useHooks - check
interface AmountProp{
    count : number;
    // si el elemento  no recibe ningun elemento si lo puedo dejar asi;
    onClickIncrement : ()=> void;
    onClickDecrement : () => void;
}
function Cantidad({count,onClickIncrement, onClickDecrement}: AmountProp){
    console.log('COMPONENTE CANTIDAD')
   
    
    return (
        <div className="w-20 quantity_box p-1 flex border-2 border-solid border-text rounded-lg">
            <button className="plus text-text w-20"
            onClick={onClickIncrement}>
                +
            </button>
            
            <span className="num cursor-pointer text-button2 px-2">
                {count}
            </span>
            <button className="minus cursor-pointer text-text w-20"
            onClick={onClickDecrement}>
                -
            </button>
        </div>
    )
}

export default React.memo(Cantidad)