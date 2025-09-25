import {Heart} from 'lucide-react'

import ButtonPag from '../buttons-component/ButtonPag';
import CustomButton from '../buttons-component/CustomButton'

interface ProductCardType{
  id: string;
  image: string;
  product: string;
  description: string;
  price: number;
  onClick: (e:React.MouseEvent<HTMLButtonElement>)=>void;
}

function ProductCard({id,image,product, description,price, onClick}: ProductCardType){


  

    return(
        <article id={id} className="relative bg-white p-2 w-sm rounded-md w-full overflow-hidden shadow-lg  m-3 sm:w-[400px] hover:drop-shadow-lg">
  
          <div className='flex justify-around items-center flex-col'>
            <div className='pic w-full h-48 overflow-hidden'>
              <img className="object-cover h-full m-auto"
              src={image} 
              alt={product} />
            </div>
            <div className="flex w-full items-start justify-between flex-col">
              <h2 className="font-semibold text-button2 text-lg">
                {product}
              </h2>
              <div className="content-price flex justify-between w-full">
                <h2 className="text-2xl pt-2 font-bold text-button2 leading-5">
                  ${price}
                </h2> 
                <span className='font-semibold text-sm border-1 border-solid border-green-400 px-2 py-2 bg-green-100 text-green-400 rounded-xl'>
                  in Stock
                </span>
              </div>
               
            </div>

              {/* <CustomButton 
              text='Remover' 
              onClick={onClick}
              type='button'
              clr='bg-white'
              clrText='red-500'
              border='border-1 border-solid border-gray-400'
              width='w-full'
              hoverButton='hover:bg-red-100 hover:border-red-200'
              cursorPointer='cursor-pointer'>
              </CustomButton> */}

              <ButtonPag 
              text='Remover' 
              onClick={onClick}
              clr='bg-white'
              clrText='red-500'
              border='border-1 border-solid border-gray-400'
              width='w-full'
              hoverButton='hover:bg-red-100 hover:border-red-200'
              cursorPointer='cursor-pointer'>
              </ButtonPag>
                
          </div>
        </article>
    )
}

export default ProductCard