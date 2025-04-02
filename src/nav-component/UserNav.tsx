
// hooks react

import { useMyContext } from "../context/useMyContext";


// type
import { ActualUser } from "../context/types/typesApi";

// interface TS
interface UserNavProp{

    actualUser : ActualUser | null;
    setUserLog : React.Dispatch<React.SetStateAction<boolean>>;
    setActualUser : React.Dispatch<React.SetStateAction<ActualUser | null>>
    

}
function UserNav({actualUser, setUserLog,setActualUser}:UserNavProp){

    const {picUser} = useMyContext()
   
    return(

        <div className="user py-1 px-2 mx-2 flex rounded-lg justify-center items-center z-90 transition ease-in-out">
            <h2 className="hidden sm:flex text-white text-center font-normal">
                {/* ? verifica si hay un valor */}
                {actualUser?.name + ' ' + actualUser?.surname}
            </h2>
            <div className="pic w-[40px] h-[40px] overflow-hidden rounded-full ml-2">
                <img className="h-full w-full" src={picUser} alt="usuario-img"/>
            </div>

        </div>

    )
}

export default UserNav