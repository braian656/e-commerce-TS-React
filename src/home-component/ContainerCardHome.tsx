// Icons
import { CreditCard ,ShoppingCart, Laptop} from 'lucide-react'

// Components
import CardHome from './CardHome'

interface ContainerCardHomeProp {
  activeComponents : boolean;
}
function ContainerCardHome({activeComponents}: ContainerCardHomeProp){       
    console.log('CONTENEDOR CARD HERO')

    const handleClass = !activeComponents ? 'hidden' : 'block'

    return(
        <section className={`${handleClass} bg-body container-card-home p-3`}>
            
            
          <div className='wrapper-card' >
          <CardHome
            title="TODOS LOS MEDIOS DE PAGOS"
            textP="Paga de forma segura"
            Icon={CreditCard}>
            </CardHome>

            <CardHome
            title="ENVIOS INMEDIATO"
            textP="Productos accesibles"
            Icon={ShoppingCart}
            ></CardHome>

            <CardHome
            title="PRODUCTOS DE CALIDAD"
            textP="Lo mas vendido"
            Icon={Laptop}
            ></CardHome>

          </div>

        </section>
    )
}

