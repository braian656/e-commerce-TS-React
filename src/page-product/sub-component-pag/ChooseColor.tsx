import React from "react";

interface ChooseColorProp{
    clr1: string; 
    clr2: string; 
    clr3: string;
    onClick: (e: React.MouseEvent<HTMLDivElement>)=>void;

}

function ChooseColor ({clr1, clr2, clr3, onClick}: ChooseColorProp){
    const colors = [clr1, clr2, clr3]
    console.log('COMPONENTE CHOOSECOLOR')

    return (

        <div className="preference_box">
            <h3 className="color font-semibold text-button2 my-1.5 text-start">
                Color
            </h3>
            <div className="flex" onClick={(e)=>onClick(e)}>
                        {
                            colors.map((clr, index)=>(
                                <button 

                                key={index}
                                name="Color"
                                data-clr={clr} 
                                className={`block p-4 mr-1.5 w-4 ${clr} cursor-pointer rounded-full border-2 border-solid border-[#ccc] hover:border-2 hover:border-solid hover:border-white`}>
                        
                                </button>
                            ))
                        }
            </div>
        </div>

    )
}

export default ChooseColor