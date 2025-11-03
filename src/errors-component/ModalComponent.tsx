import { useState } from "react";
import { AlertCircle, SquareCheckBig } from "lucide-react"; // ícono de error

import { UserFromFirebase } from '../context/types/typesApi';

interface ModalComponentProps{
    visible : boolean;
    messageModal : string;
    txtButton: string;
    userFromDB: UserFromFirebase | null;
    clrModal: string;
    title: string;
    addIcon: boolean;
    handleModal: () => void;  
}


export default function ModalComponent({visible, messageModal, txtButton,userFromDB,clrModal, addIcon,title, handleModal}: ModalComponentProps) {

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-md shadow-xl w-[90%] max-w-md p-6 text-center relative animate-[fadeIn_0.3s_ease]">
        
        {/* Icono */}
        <div className="flex justify-center mb-4">
           
          <div className={`bg-gray-800 p-3 rounded-full`}>
            {
              addIcon ? <SquareCheckBig className={`w-8 h-8`} /> : <AlertCircle className={`w-8 h-8`}/>
            }
    {/* className="text-red-600 dark:text-red-300 w-8 h-8" */}
          </div>
        </div>

        {/* Título */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          {title}
        </h2>

        {/* Mensaje dinámico */}
        <p className="text-gray-600 dark:text-gray-300 mb-6">{messageModal}</p>

        {/* Botón */}
        <button
          onClick={handleModal}
          className={`w-full cursor-pointer ${clrModal} text-white font-medium py-2 px-4 rounded-md transition-colors`}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
