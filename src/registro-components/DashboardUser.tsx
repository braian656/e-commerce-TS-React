// hooks
import { useState , useEffect} from "react"


// Provider
import { useMyContext } from "../context/useMyContext"

// componenets
import LoadingDots from "../loading-dots-component/LoadingDots"
import Aside from './component-dashboard/Aside'
import Table from "./Table"
import InfoUser from "./InfoUser"


// interface

// firebase
import { auth } from "../firebase/firebase"
import { dataBase } from "../firebase/firebase"
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";


// type
import { UserFromFirebase } from "../context/types/typesApi"

interface DashboardUserProps{

  activeComponents: boolean;
  setActiveComponents: React.Dispatch<React.SetStateAction<boolean>>
  setUserLog: React.Dispatch<React.SetStateAction<boolean>>;

}

function DashboardUser({setUserLog, activeComponents, setActiveComponents}: DashboardUserProps){
    console.log('DASHBOARD')
    const {picUser, userFromDB, setUserFromDB } = useMyContext()
    const [sectionPurchaseHistory, setSectionPurchaseHistory] = useState(false)

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // const [userActive, setUserActive] = useState<UserFromFirebase | null>(null)  
   
    const getActualUser = async () => {
      setLoading(true)

      onAuthStateChanged(auth, async(user)=>{
       

       if(user){
        
        try {
          const docRef = doc(dataBase, "Usuarios", user.uid);
          const docSnap = await getDoc(docRef);
        
          if (docSnap.exists()) {

            const datos = docSnap.data() as UserFromFirebase;

            console.log(datos)
            // estas pasando un obj entero pelotudoooo
            setUserFromDB(datos);
            console.log('UserfromDB en dashboard', userFromDB)
          } else {
            setError("El usuario no existe.");
          }
        } catch (err) {
            console.error("Error al obtener el usuario:", err);
            setError("Ocurrió un error al cargar los datos.");
        } finally {
            setLoading(false);
        }
       }


      })

     
    };
  

    
    useEffect(()=>{

      setActiveComponents(false)
      getActualUser()

    }, [])

    if (loading) return <LoadingDots></LoadingDots>;
  
    return(
    
      <div className="section-dashboard">
          <div className="content-user bg-white  rounded-lg">
          <div className="image">
              
              <div className="image-user">
                <img src={picUser} alt="" loading="lazy"/>
              </div>
              <h1 className="name-user">
                {userFromDB?.name}
              </h1>
              <div className="cerrar-session">
                
              </div>
          </div>
            <div className="more-inf">
              <h2 className="mail">
                {userFromDB?.email}
              </h2>
            </div>
          </div>
          <div className="content-info-user mt-3">
            <Aside 
            sectionPurchaseHistory={sectionPurchaseHistory}
            setSectionPurchaseHistory={setSectionPurchaseHistory}   
            setUserLog={setUserLog}  
            userFromDB={userFromDB}       >
            </Aside>
           
            <div className="show-content display-content-info">
              {
                sectionPurchaseHistory 
                ? 
                <Table></Table>
                :
                <InfoUser 
                userFromDB={userFromDB}
                setUserFromDB={setUserFromDB}>
                </InfoUser>
              }

              
            </div>
          </div>
      </div>

    )
}

export default DashboardUser