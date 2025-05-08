// icons
import { CircleUserRound, ShoppingBasket ,LogOut } from "lucide-react"
import React from "react";
import { useMyContext } from "../../context/useMyContext";

import { useNavigate } from "react-router-dom"


import {  auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { UserFromFirebase } from "../../context/types/typesApi";

// type TS
interface AsideType{
    userFromDB: UserFromFirebase | null;
    sectionPurchaseHistory : boolean;
    setSectionPurchaseHistory : React.Dispatch<React.SetStateAction<boolean>>;
    setUserLog: React.Dispatch<React.SetStateAction<boolean>>;

}
function Aside ({sectionPurchaseHistory, setSectionPurchaseHistory,setUserLog,userFromDB}:AsideType){

    // al presionar signOUt queda el icon del user activado

    const navigate = useNavigate()
    const {setActualUser, setUserFromDB} = useMyContext()
    console.log('usuario actual',userFromDB)
    async function cerrarSesion(){

       
        setActualUser(null)


       

        try {
            

            signOut(auth) // Intenta cerrar la sesión del usuario autenticado
            .then(() => {
                // Aquí puedes poner lo que quieras hacer después de cerrar sesión, como redirigir al login
                 navigate('/signin')
                 setUserFromDB(null)
                 console.log('Sesión cerrada correctamente');

            })
            .catch((error) => {
            // Si ocurre un error al cerrar sesión, lo puedes manejar aquí
                console.error('Error al cerrar sesión:', error);
            });


           

           

          } catch (error) {
            console.error("Error al cerrar sesión:", error);
          }

        setUserLog(false)


    }

    function getPurchaseHistory(){
        console.log('COMPRA REALIZADAS')
        setSectionPurchaseHistory(true)
    }

    function getSectionUser(){
      console.log('SECCION USUARIO')
      setSectionPurchaseHistory(false)
    }


    return(
        <aside className="content-op bg-blue red">
                
            <button 
            className={
            `text-center ${!sectionPurchaseHistory ? 'active' : ''}`
            } 
            onClick={getSectionUser}>
                <CircleUserRound 
                className="icon-scale"
                size={20} 
                color="rgb(31 41 55)" 
                strokeWidth={1.5} />
                <h2 className="mr-2">Usuario</h2>
            </button>

            <button 
                className={
                `text-center ${sectionPurchaseHistory ? 'active' : ''}`
                } 
                onClick={getPurchaseHistory}>
                <ShoppingBasket 
                className="icon-scale" 
                size={20} 
                color="rgb(31 41 55)" 
                strokeWidth={1.5} />
                <h2 className="mr-2">Compras</h2>
            </button>     

            <button className={'text-center log-out hover:bg-red-500'} onClick={cerrarSesion}>
                
                <LogOut 
                className="icon-scale" 
                size={20} 
                color="rgb(31 41 55)" 
                strokeWidth={1.5}/>

                <h2 className="mr-2">Cerrar Sesion</h2>
            </button>                 
    </aside>
    )
}

export default Aside