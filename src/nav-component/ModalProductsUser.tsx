

interface modalProductProps {
    id : number;
    image: string;
    product: string;
    price: number;
    onClick: (id: number, price: number) => void; // onClick ahora toma id y price como parámetros

}
function ModalProductsUser({id,image,product,price, onClick}: modalProductProps){

    console.log('MODAL NAV')



    return (
            

            <>
                <li 
                id={String(id)} 
                className="p-4 m-2 flex items-center justify-between gap-4 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div 
                    className="image w-20 overflow-hidden rounded-md flex-shrink-0">
                        <img 
                        src={image} 
                        alt={product}
                        className="object-cover w-full h-full"/>
                    </div>
                    <div className="info text-left flex-1">
                        <h1 className="title text-white font-normal text-lg">
                            {product}
                        </h1>
                        <h2 className="precio text-lg py-2 font-normal text-gray-400">
                            {price}$
                        </h2>
                    </div>
                    <button 
                    onClick={() => onClick(id, price) } 
                    className="bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transform hover:scale-105 transition-transform duration-300">
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </li>
            </>
                
    )
}

export default ModalProductsUser