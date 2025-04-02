

interface ButtonPagProp{
    text: string;
    type?: 'submit' | 'reset' | 'button' | undefined;
    onClick : (e:React.MouseEvent<HTMLButtonElement>)=>void;
    clr : string;
    width: string;
    clrText?: string;
    border?: string;
    hoverButton?: string;

}
function ButtonPag({text, type,onClick, clr, width,clrText, border, hoverButton}: ButtonPagProp){

    return(
        <button 
        type={type}
        onClick={(e)=>onClick(e)} 
        className={`add  mt-3 text-${clrText} font-bold rounded-md ${clr}  p-4 ${width} ${border} ease-out duration-300 ${hoverButton}`}>
            {text}
        </button>
    )

}

export default ButtonPag