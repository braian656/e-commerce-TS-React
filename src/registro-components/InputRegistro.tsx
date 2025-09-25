import React, { useEffect, useState } from "react"

import { ValidationErrors } from "../context/types/typesApi";


interface InputRegistroTypes{
    id: string;
    name: string;
    type: string;
    text: string;
    value?: string | null; 
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    haveErrs?: boolean;
    setHaveErrs?: React.Dispatch<React.SetStateAction<boolean>>; 
    err?: ValidationErrors[];
    textPassword?: string | null;
    autocomplete?: string;
    customWidth: string;
}

// err array de obj, 

function InputRegistro({id ,name, type, text,value, onChange, err, setHaveErrs, haveErrs,textPassword, autocomplete, customWidth}: InputRegistroTypes){
    console.log('INPUTS')

    const [actualErr, setActualErr] = useState('');
    const [activeMsj, setActiveMsj] = useState(false)


    function handleErrors() {
        if(err !== undefined){
            if (haveErrs) {
            const filterError  = err.find((error) => Object.keys(error).includes(name));

            if (filterError) {
                setActualErr(filterError[name]);
                setActiveMsj(true)
            } else {
                setActualErr('');
                setActiveMsj(false)
            }


            } else {
                setActualErr(''); 
                setActiveMsj(false)
            }

        }

       

    }

    // useEffect para ejecutar `handleErrors` cada vez que `err` o `haveErrs` cambien
    useEffect(() => {
        handleErrors();

        const timeoutId = setTimeout(()=>{
            setActiveMsj(false)
        }, 1000)

        return () => clearTimeout(timeoutId);

    }, [err, haveErrs]);

    // med original del input 
    return(
        <div className="input-form flex items-center flex-col pt-2 relative">
            <div className={`${customWidth} justify-start items-center`}>
                <label htmlFor={name} className="font-semibold text-gray-800">
                    {text}
                </label> 
            </div>
            
            <input 
            id={id}
            name={name}
            value={value ?? ''}
            onChange={onChange}
            className={`bg-white  border border-solid border-[#ccc] focus:shadow-md outline-none rounded-lg text-slate-500 px-1 py-2 m-2 ${customWidth}`} 
            type={type} 
            placeholder={text} 
            autoComplete={autocomplete}
            required
            /> 
            <p className="text-xs text-start text-wrap text-red-500 w-4/5">
                {textPassword}
            </p>
            <span className="absolute top-10 -right-2 text-xs font-bold"> 
                {activeMsj && <p className="text-red-600 duration-300 ease-out">{actualErr}</p>}
            </span>
        </div>
    )
}
export default InputRegistro