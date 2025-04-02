
// icon
import {X} from 'lucide-react'

// ROuter
import { useNavigate } from "react-router-dom"

// type

import { ActualUser } from '../context/types/typesApi';

// component
import ButtonPag from "../buttons-component/ButtonPag"


interface ErrorComponetProp{
    visible : boolean;
    messageModal : string;
    txtButton: string;
    actualUser: ActualUser | null;
    colorBtn: string;
    title: string;
    image: string;
    handleModal: () => void;

    
}

function ErrorComponent ({visible, messageModal, txtButton,actualUser,colorBtn, image,title, handleModal}:ErrorComponetProp){
    const navigate = useNavigate()

    const pageSignIn = ()=>{
        navigate("/SignIn")
    }

    const visibility = visible ? 'flex' : 'hidden'


    return (
        <article className={`${visibility} modal-info`}>    
            <div className="content relative w-full">
                <span 
                onClick={handleModal} 
                className="close-modal bg-button2 p-3 pointer">
                    <X />
                </span>
                <div className="content-img">
                    <img className="w-24 h-24 object-cover" src={image} alt={image} />
                </div>           
                <div className="content-info">
                    <h1 className="title text-4xl text-white mb-2">
                        {title}
                    </h1>
                    <h2 className="text-extrabold text-text font-xlg">
                        {messageModal}
                    </h2>
                    {/* <ButtonPag 
                    text={txtButton} 
                    onClick={actualUser != null ? handleModal : pageSignIn} 
                    clr={colorBtn}
                    clrText="white">
                    </ButtonPag> */}
                </div>
            </div>
        </article>
    )


}


export default ErrorComponent

