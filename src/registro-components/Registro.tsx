import React from "react";

// Hooks
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom';


// react-router
import { useNavigate } from "react-router-dom";




import { useAppSelector, useAppDispatch } from "../store/hook";
import { addUser } from "../store/features/register";

// types
import { ValidationErrors } from "../context/types/typesApi";


// component
import InputRegistro from "./InputRegistro"
import { useMyContext } from "../context/useMyContext";

// firebase
import { auth } from "../firebase/firebase";
import {createUserWithEmailAndPassword} from 'firebase/auth'
import { User } from "firebase/auth";

import { dataBase } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore"; 


interface SliderProp{

    activeComponents: boolean;
    setActiveComponents:  React.Dispatch<React.SetStateAction<boolean>>;
    setUserLog: React.Dispatch<React.SetStateAction<boolean>>;
    
}

interface DataUserType{

    name: string,
    surname: string,
    email: string,
    password: string,
    password_repeat: string;

}


  

const Registro : React.FC<SliderProp> = ({activeComponents,setActiveComponents,setUserLog})=>{

    console.log('COMPONTE REGISTRO')
    const {setUserFromDB} = useMyContext()
    const [haveErr, setHaveErr] = useState(false)
    const [error, setError] = useState<ValidationErrors[]>([]);

    const [isValid, setIsValid] = useState(true)

    const dispatch = useAppDispatch()
    const dataUsers = useAppSelector((state) => state.registerUser.users)


    const navigate = useNavigate()
    // el componete siempre necesita un estado inicial:
    // mover la logica de comparacion a otro componente
    const [dataUser, setDataUser] = useState<DataUserType>(
        {
            name: "",
            surname: '',
            email: '',
            password: '',
            password_repeat: '',
            
        }
    )
    const nameLength = (name: string): boolean=>(
        name.length > 3 
    )

    const verifyEmail = (email: string): boolean=>{
        return /\S+@\S+\.\S+/.test(email);
    }

    const verifyPasswords = (pass: string) : boolean=>{
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(pass);
    }

    const verifyPassMatch = (pass: string) : boolean=>{
        const repeatPassword = dataUser.password_repeat
        return pass === repeatPassword
    }



    async function saveDataFirebase(user:User):Promise<void>{
        const {name, surname, email} = dataUser

        try{

            await setDoc(doc(dataBase, "Usuarios", user.uid), {
                name,
                surname, 
                email
            });
            console.log('Datos almacenados correctamente')

        }catch(err: unknown){

            console.log('hubo un error al crear la cuenta', err)
            
        } 
    }

        
    
    function validate(){
        const errors: ValidationErrors[] = []

        const name = dataUser.name
        const email = dataUser.email
        const password = dataUser.password

        // verificar la coincidicendia de el password y seguir
       


      
        // Al menos un dígito.
        // Al menos una letra minúscula.
        // Al menos una letra mayúscula.
        // Al menos 8 caracteres en total.
        
    
        if(!nameLength(name)){
            errors.push({name: 'Nombre de usuario muy corto'})
        }
    
        if(!verifyEmail(email)){
            errors.push({email: 'Correo Invalido'})
    
        }

        if(!verifyPasswords(password)){                  
            errors.push({password: `La contraseña no coincide`})
    
        }
        if(!verifyPassMatch(password)){
            errors.push({password_repeat: 'Las Contraseñas no coinciden'})
        }

        if(dataUsers.length !== 0){
          

            const findDuplicated = dataUsers.find((user)=> user.email === email);
            console.log(findDuplicated)

            if(findDuplicated){
                errors.push({email: 'Correo en uso'})

                return
            }
        }else{
            console.log('Estoy Bien vacio')
        }


        if(errors.length > 0){
            setIsValid(false)
            setError(errors)
            setHaveErr(true)

            return
        }

            setIsValid(true)
            setError([])
            return true

        
    }


   
    function handleSubmit(evt: React.FormEvent<HTMLFormElement>){
        evt.preventDefault() 
    
    
        if(validate()){
    
            const { email,password } = dataUser

            createUserWithEmailAndPassword(auth, email, password)

                .then((userCredential) => {
                    const user = userCredential.user;

                    navigate('/dashboard')
                    return saveDataFirebase(user)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    console.log(errorCode)
                    console.log(errorMessage)
            
             });


            // guardar los datos en un arr, por ahora, pero luego
            // addUsers((prevItems) => [...prevItems,dataUser]);
            dispatch(addUser(dataUser))
            // aca iria el state de redux


            // info del usuario que se muostrara en el dashboard,remplaza a setActualUser
            setUserFromDB(dataUser)

            setUserLog(true)
            setDataUser(
                {
                    name: "",
                    surname: '',
                    email: '',
                    password: '',
                    password_repeat: '',
                }
            )


        



        }
    }

    function handleChange(evt: React.ChangeEvent<HTMLInputElement>){
            const { target } = evt;
            const { name, value } = target;
            const newValues = {
                ...dataUser,
                [name]: value
            };
            setDataUser(newValues);        
    }
    
    useEffect(()=>{ setActiveComponents(false)},[])

    return (

        <section className="bg-body flex justify-center items-center flex-col relative">
            
            <div className="center flex justify-center items-center w-full flex-col sm:flex-row">
                <div className="sm:w-4/5 h-[320px] sm:h-[720px] flex justify-center items-center overflow-hidden">
                    <img
                        className="rounded-lg sm:rounded-none shadow-lg sm:shadow-none sm:object-cover h-full w-full"
                        // src="./images/bg-signin.jpg"
                        src="https://img.freepik.com/foto-gratis/composicion-vista-frontal-cyber-monday_23-2149055978.jpg?t=st=1727474471~exp=1727478071~hmac=09898073361987f45e1a6a40b8ef82099ed1a4641a5b956d3ba47c60fdb542c2&w=740"
                        alt="Compras"
                    />
                </div>

                <form onSubmit={handleSubmit} className="bg-[#f2f2f2] w-full sm:w-1/2 h-[620px] p-5">
                    <InputRegistro 
                    id="name"
                    name="name" 
                    type="text" 
                    text="Nombre"
                    value={dataUser.name} 
                    onChange={handleChange}
                    haveErrs={haveErr}
                    setHaveErrs={setHaveErr}
                    err={error}
                    textPassword={null}
                    customWidth="w-4/5">     
                    </InputRegistro> 

                    <InputRegistro 
                    id="surname" 
                    name="surname" 
                    type="text"
                    text="Apellido"
                    value={dataUser.surname} 
                    onChange={handleChange}
                    setHaveErrs={setHaveErr}
                    haveErrs={haveErr}
                    err={error}
                    textPassword={null}
                    customWidth="w-4/5">                    
                    </InputRegistro>

                    <InputRegistro 
                    id="email" 
                    name="email" 
                    type="email"
                    text="Correo"
                    value={dataUser.email} 
                    onChange={handleChange}
                    setHaveErrs={setHaveErr}
                    haveErrs={haveErr}
                    err={error}
                    textPassword={null}
                    customWidth="w-4/5">          
                    </InputRegistro>

                    <InputRegistro 
                    id="password"
                    name="password"
                    type="password" 
                    text="Contraseña"
                    value={dataUser.password} 
                    onChange={handleChange}
                    setHaveErrs={setHaveErr}
                    haveErrs={haveErr}
                    err={error}
                    customWidth="w-4/5"
                    textPassword='La contaseña debe tener: Al menos un dígito.
                                Al menos una letra minúscula.
                                Al menos una letra mayúscula.
                                Al menos 8 caracteres en total'>           
                    </InputRegistro>

                    <InputRegistro 
                    id="password_repeat"
                    name="password_repeat" 
                    type="password"
                    text="Repetir Contraseña"
                    value={dataUser.password_repeat} 
                    onChange={handleChange}
                    setHaveErrs={setHaveErr}
                    haveErrs={haveErr}
                    err={error}
                    textPassword={null}
                    customWidth="w-4/5">
                    </InputRegistro>

                    
                    <div className="btns flex justify-center items-center flex-col">
                        
                        <button className="font-semibold cursor-pointer hover:underline">
                             <Link to="/register">Ya tengo una cuenta</Link>
                         </button>
                        <button 
                            type="submit"
                            className="mt-3 rounded-lg text-[#f2f2f2] font-semibold  bg-button py-2 px-3 w-1/2 ease-out duration-700 hover:bg-button2  shadow-md hover:shadow-lg transition-shadow ...">
                                Registrarse
                        </button>
                    </div>
                </form>
            </div>
       

        </section>
    
    )

}

export default Registro