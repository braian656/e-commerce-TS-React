import {Heart} from 'lucide-react'

interface ProductCardType{
  id: string;
  image: string;
  product: string;
  description: string;
  price: number;
}

function ProductCard({id,image,product, description,price}: ProductCardType){

    return(
        <article id={id} className="card-wishlist relative cursor-pointer w-full overflow-hidden shadow-lg  m-3 sm:w-80 hover:drop-shadow-lg">
          <span className="icon-favorite absolute top-[10px] right-[10px]">
            <Heart 
            size={32} 
            color="#f66a6a" 
            className='hover:text-[#b90e0e] hover:scale-75'/>
          </span>
          <div className='flex justify-around items-center flex-col'>
            <div className='pic w-full  overflow-hidden'>
              <img className="w-full h-full"
              src={image} 
              alt={product} />
            </div>
            <div className="px-6 flex items-center justify-between flex-col">
              <h2 className="py-2 font-bold uppercase	text-lg text-center text-button tracking-widest w-full">
                {product}
              </h2>
            </div>
            <div className="p-2 flex justify-center items-center">
            <span className="text-2xl py-2 font-semibold text-button2 leading-5">
              {price}$
            </span>      
            </div>
          </div>
        </article>
    )
}

export default ProductCard