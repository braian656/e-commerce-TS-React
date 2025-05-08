import { ShoppingBag } from "lucide-react"
import React from 'react';


// Verificar uso del los useHooks - check
interface EmptyCartProp{
  text: string;
  zIndex: string;
}
const EmptyCart = React.memo(({ text,zIndex }:EmptyCartProp) => {

  console.log('Renderizando EmpyCart')
  
  return (
      <div className={`empty-cart flex items-center justify-center my-2 min-h-[400px] px-4 py-8 bg-background ${zIndex} m-auto`}>
        <div className=" flex-col flex justify-center items-center">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground"/>
          <h2 className="mt-4 text-2xl font-semibold text-foreground">
            Your cart is empty
          </h2>
          <p className="mt-2 text-muted-foreground">
            {text}
          </p>
        </div>
  
      </div>
  )
});


export default EmptyCart