// HOOKS
import { useState } from "react"
//REDUX
import { useSelector, useDispatch } from "react-redux";
import { useAppDispatch,useAppSelector } from "../store/hook";

import { addUser } from "../store/features/register"

// PROVIDER 
import { useMyContext } from "../context/useMyContext";


// COMPONENTS
import InputRegistro from "./InputRegistro"
import PicPerfil from "./PicPerfil"
// import ButtonPag from "../buttons-component/ButtonPag"
import ErrorComponent from "../errors-component/ErrorComponent"

//  TYPE
import { ActualUser } from "../context/types/typesApi";

// INTERFACE
interface InfoUserProp{
    actualUser : ActualUser | null;
    setActualUser: React.Dispatch<React.SetStateAction<ActualUser | null>>
}

interface ActualValueTypes{

    name: string | null,
    surname: string | null,
    email: string | null,
    password: string | null,
    password_repeat: string | null,

}
function InfoUser({actualUser, setActualUser}: InfoUserProp){
    // Componente que esta dentro del dashboard
    const dispatch = useAppDispatch()

  

    const {picUser} = useMyContext()

    const [actualValue , setActualValue] = useState<ActualValueTypes>(
        {
            name: actualUser!.name,
            surname: actualUser!.surname,
            email: actualUser!.email,
            password: actualUser!.password,
            password_repeat: actualUser!.password_repeat,
        }
    )
    const [newValues, setNewValues] = useState() /* Esto no se*/

    const [updateUserData, setUpdateUserData] = useState(false)
    const [modalVisible , setModalVisible] = useState(false)
    const [message, setMessage] = useState<string | string[]>("")
    
    // espera un string devuelve un boleano
    const nameLength = (name: string | null): boolean =>(
        name!.length > 3 
    )


    // espera un string devuelve un boleano
    const verifyPasswords = (pass: string): boolean=>{
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(pass);
    }


    // espera un string devuelve un boleano
    const verifyPassMatch = (pass:string): boolean=> pass === actualValue.password_repeat

    

    const validate = ()=>{
        const errors: string[] = []
        

        const name = actualValue.name
        const password = actualValue.password

        if(!nameLength(name)){
            errors.push('Nombre de usuario muy corto')
        }
        if(!verifyPasswords(password ?? '')){    
            errors.push('Las Contraseñas no coinciden')
        }
        if(!verifyPassMatch(password ?? '')){
            errors.push('Las Contraseñas no coinciden')
        }
    
        
        if(errors.length > 0){
            setMessage(errors)

            return
        }

    
            setMessage([])
            return true

    }

    const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()


        if(validate()){
            dispatch(addUser(actualValue))
            setActualUser(actualValue)
        }
        // else{

        //     return

        // }


    }
    
    function handleChange(evt: React.ChangeEvent<HTMLInputElement>){
        

        console.log(evt)
        const { target } = evt;
        const { name, value } = target;
        const newValues = {
            ...actualValue,
            [name]: value
        };
        setActualValue(newValues);         
    }
    const handleClassModal = ()=>{
        setModalVisible(false)
    }
    return(
    <>


        <div className="section-info">

            <ErrorComponent 
            visible={modalVisible} 
            messageModal="DESEA REALIZAR CAMBIOS??"
            txtButton="ACEPTAR"
            actualUser={null}
            colorBtn="bg-red-500"
            image="./images/danger.svg"
            title="Realizar cambios"
            handleModal={handleClassModal}>
            </ErrorComponent>
        
            <PicPerfil 
            picUser={picUser}>
            </PicPerfil>


           <div className="inputs-user">

                <InputRegistro 
                id="nombre" 
                name="name" 
                type="text"
                value={actualValue.name}
                onChange={handleChange}
                text="Nombre">
                </InputRegistro>


                <InputRegistro 
                id="apellido" 
                name="surname" 
                type="text"
                value={actualValue.surname}
                onChange={handleChange}
                text="Apellido">
                </InputRegistro>

           </div>
           
           <div className="inputs-user">
                <InputRegistro 
                id="contraseña" 
                name="password" 
                type="text"
                value={actualValue.password}
                onChange={handleChange}
                text="Contraseña">
                </InputRegistro>

                <InputRegistro 
                id="contraseña" 
                name="password" 
                type="text"
                value={actualValue.password_repeat}
                onChange={handleChange}
                text="Repetir Contraseña">
                </InputRegistro>
            </div>
            <div className="w-full flex justify-center items-center">
                <button 
                    onClick={handleSubmit}
                    className="button-infoUser">
                    Realizar Cambios
                </button>
            </div>
    
        </div>

    </>
        
    )
}

export default InfoUser