import { useContext } from "react";
import { contextProducts } from "./context";

export function useMyContext(){
    const context = useContext(contextProducts);
    
    if (!context) {
      throw new Error("Error al llamar al provider");
    }
  
    return context;

}