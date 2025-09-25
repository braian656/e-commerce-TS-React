import { h } from "framer-motion/dist/types.d-DsEeKk6G";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    text? : string;
    clr? : string;
    clrText?: string;
    border? : string;
    width? : string;
    hoverButton?: string;
    cursorPointer? : string;
    customClass? : string
}

function CustomButton ({text, clr,clrText,customClass, border, width, hoverButton, cursorPointer,children ,...rest}: ButtonProps){
    const defaultClass = `add ${cursorPointer}  mt-3 text-${clrText} font-bold rounded-md ${clr} p-4 ${width} ${border} ease-out duration-300 ${hoverButton}`
    const activeClass = customClass ? customClass : defaultClass

    return(
         <button 
            {...rest}
            className={activeClass}>
                {children}
        </button>
    )
    


}

export default CustomButton