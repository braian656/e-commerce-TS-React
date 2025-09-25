// Hooks
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from 'react-router-dom';

// Redux
import {  useAppSelector } from "../store/hook"

// Components
import InputRegistro from "./InputRegistro"

// firebase
import { auth} from "../firebase/firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useMyContext } from "../context/useMyContext";



interface SliderProp{
    activeComponents: boolean;
    setActiveComponents: React.Dispatch<React.SetStateAction<boolean>>;
    setUserLog: React.Dispatch<React.SetStateAction<boolean>>

}

const SignIn : React.FC<SliderProp> = ({activeComponents,setActiveComponents, setUserLog})=>{

    console.log('COMPONENTE SIGNINT')
    const {userFromDB} = useMyContext()
    // se renderiza muchas veces
    const dataUsers = useAppSelector((state) => state.registerUser.users)

    const [verifyAccount,setVerifyAccount] = useState(
        { 
            email : '',
            password : '',
        }
    ) 
    const navigate = useNavigate()
    

    const submitForm = async (e:  React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
    
       

        try{

            await signInWithEmailAndPassword(auth,verifyAccount.email, verifyAccount.password)
            setUserLog(true)
            navigate('/dashboard')
            
        }catch(err : unknown){
            console.log('Error de login',err)
        }


        

    }



  
    const changeForm = (e: React.ChangeEvent<HTMLInputElement>)=>{
        

        const { target } = e;
        const { name, value } = target;
        const newValues = {
            ...verifyAccount,
            [name]: value
        };
        setVerifyAccount(newValues)
    }

    useEffect(()=>{ setActiveComponents(false)},[])
    
    return(
        <section className="sign-in flex justify-center items-center relative w-full  h-[600px] bg-white">
           <div className="content-form w-lg rounded-md border-1 border-solid border-gray-300">
           <form onSubmit={submitForm} className="form-signIn shadow-lg">
                    <h1 className="text-center font-bold text-3xl text-button2">Ingresar</h1>
                    <p className="text-center text-gray-500 my-2">Ingresa tu correo para acceder</p>
                        <InputRegistro 
                        id="email" 
                        name="email" 
                        type="email"
                        text="Correo"
                        value={verifyAccount.email}
                        onChange={changeForm}
                        autocomplete="username"
                        customWidth="w-full">          
                        </InputRegistro>
                        {/* ponerlo dentro de un form */}
                        <InputRegistro 
                        id="password"
                        name="password"
                        type="password" 
                        text="Contraseña"
                        value={verifyAccount.password}
                        onChange={changeForm}
                        autocomplete="current-password"
                        customWidth="w-full">           
                        </InputRegistro>


                        <div className="btns flex justify-center items-center flex-col">
                            <button className="enviar bg-indigo-800 w-full py-2 my-3 font-medium rounded-sm cursor-pointer text-white hover:bg-indigo-400 transition-colors duration-300"  type="submit">Aceptar</button>       
                            <div className="flex">

                                <span className="text-signIn text-gray-500 my-2"> Aun no tienes una cuenta?</span>
                                <button className="font-semibold cursor-pointer ml-1 hover:underline">
                                    <Link to="/register">Registrarse</Link>
                                </button>

                            </div>
                        </div>
            </form>
           </div>
        </section>
    )


}


export default SignIn