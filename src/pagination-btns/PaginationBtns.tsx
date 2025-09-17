// Hooks

// Icons
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Provider
import { useMyContext } from "../context/useMyContext";


// type datos
interface PaginationType{
  activeComponents : boolean;
  // setActiveComponents: React.Dispatch<React.SetStateAction<boolean>>
}

function Pagination ({activeComponents}: PaginationType){

    const {
      totalProducts, 
      productsPerPage,
      currentPage,
      setCurrentPage, 
      userSelectedCategory
    }  = useMyContext()

    
    const pageNumber = [];


    for(let i = 0; i <= Math.ceil(totalProducts / productsPerPage); i++){
      pageNumber.push(i)
    }


    const previousPage = ()=>{
        setCurrentPage(currentPage -1)

        window.scrollTo({
          top: 420,
          behavior: 'smooth',
        });

      
    }
    const nextPage = ()=>{
        setCurrentPage(currentPage +1)

        window.scrollTo({
          top: 420,
          behavior: 'smooth',
        });


    }


    const handleClass = !activeComponents || !userSelectedCategory.includes('All') ? 'hidden' : 'flex'
    

    return (

    
      <div  className={`btns-pagination  p-3 ${handleClass} justify-center items-center`}>

      <button 
      disabled={currentPage <= 1 ? true : false}
      onClick={previousPage} 
      className={`mr-1 cursor-pointer rounded-md ${currentPage == 1 ? 'button-disabled' : 'bg-indigo-800'}`}>
        <ChevronLeft 
        size={48} 
        color="#ffff" 
        strokeWidth={1.5}/>
      </button>

      <span className="mx-4 font-bold">
        {currentPage}
      </span>

      <button 
      disabled={currentPage >= pageNumber.length-1 ? true : false}
      onClick={nextPage} 
      className={`ml-1 cursor-pointer rounded-md ${currentPage >= pageNumber.length-1 ? 'button-disabled' : 'bg-indigo-600'}`}>

        <ChevronRight 
        size={48} 
        color="#ffff" 
        strokeWidth={1.5}/>

      </button>
    </div> 
        

    )
}

export default Pagination