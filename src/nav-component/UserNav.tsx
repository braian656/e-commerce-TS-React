
// hooks react

import { useMyContext } from "../context/useMyContext";


// type
import { UserFromFirebase } from "../context/types/typesApi";

// interface TS
interface UserNavProp{

    userFromDB : UserFromFirebase | null;
    setUserLog : React.Dispatch<React.SetStateAction<boolean>>;
    setUserFromDB : React.Dispatch<React.SetStateAction<UserFromFirebase | null>>
    

}
function UserNav({userFromDB, setUserLog,setUserFromDB}:UserNavProp){

    console.log('NAV')

    const {picUser} = useMyContext()
   
    return(

        <div className="user py-1 px-2 mx-2 flex rounded-lg justify-center items-center z-90 transition ease-in-out">
            <h2 className="hidden sm:flex text-white text-center font-normal">
                {userFromDB?.name + ' ' + userFromDB?.surname}
            </h2>
            <div className="pic w-[40px] h-[40px] overflow-hidden rounded-full ml-2">
                <img className="h-full w-full" src={picUser} alt="usuario-img"/>
            </div>

        </div>

    )
}

export default UserNav