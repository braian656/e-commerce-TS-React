// import { Icon } from "lucide-react"
interface CardHomeProp{
  title : string;
  textP : string;
// icon componente JSX  
  Icon : React.ElementType;  
}
function CardHome({title, textP, Icon}:CardHomeProp){

  console.log('CARD HERO')

    return(
    <article className="card-home  pointer hover:shadow-lg">
        <div className="icon text-button2 text-3xl relative">
           <Icon  className="w-[32px] sm:w-[44px] sm:h-[44px]"  color="#c8222f" strokeWidth={1.5}></Icon>
        </div>

        <div className="text">
            <h2 className="font-bold text-center text-xs sm:text-sm text-white mb-1">{title}</h2> 
            <p className="text-xs text-white sm:text-sm text-center">{textP}</p>
        </div>
    </article>
    )
}

export default CardHome