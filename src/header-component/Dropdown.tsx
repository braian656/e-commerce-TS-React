import { ChevronDown } from "lucide-react";


interface DropdownProp {    
   arrCategories: string[];
   onclick : ()=> void
   

}


function Dropdown({arrCategories, onclick}: DropdownProp){
    const filtrarCategories = arrCategories.reduce((categories, category)=>{
        // si el arr de dep, categories, no incluye la categoria(valor)
        // pujearla
        // luego retornar para que se pueda usar


        if(!categories.includes(category)){
            categories.push(category)
        }

        return categories
    },['Todo'])

    console.log(filtrarCategories)


    return (
        <div className="dropdown inline-flex w-auto mx-2 justify-center gap-x-1.5  text-sm font-semibold text-white inset-ring-1 inset-ring-white/5 cursor-pointer hover:text-indigo-800">
            <button className="dropbtn px-3 py-2"> Categorias <ChevronDown /></button>
            <div className="dropdown-content">        
                {
                   filtrarCategories.map((category)=>(
                        <button
                        onClick={onclick}
                        className="text-black p-2 hover:text-indigo-800"
                        value={category}
                        key={category}>
                        {category}
                        </button>
                    ))
                }
            </div>
        </div>

    )
}

export default Dropdown