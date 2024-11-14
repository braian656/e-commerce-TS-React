import CardHome from './CardHome'
import SelectCategory from '../select-category/SelectCategory'
import { CreditCard ,ShoppingCart, Laptop} from 'lucide-react'

function ContainerCardHome({setSliderActive, sliderActive}){       


    const handleClass = !sliderActive ? 'hidden' : 'block'

    return(
        <section className={`${handleClass} bg-body container-card-home p-3`}>
            
            
          <div className='wrapper-card' >
          <CardHome
            title="MEDIOS DE PAGOS"
            textP="Paga de forma segura"
            Icon={CreditCard}
            ></CardHome>

            <CardHome
            title="MENOS DE $20.000"
            textP="Productos accesibles"
            Icon={ShoppingCart}
            ></CardHome>

            <CardHome
            title="MAS VENDIDOS"
            textP="Lo mas vendido"
            Icon={Laptop}
            ></CardHome>

          </div>

          <div>
            <SelectCategory></SelectCategory>
          </div>

            

        </section>
    )
}

export default ContainerCardHome