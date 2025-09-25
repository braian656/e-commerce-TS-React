
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

        <div className="text-white  sm:m-0 sm:p-2 flex items-center justify-center w-[100px] pointer hover:text-indigo-200">
            <h2 className="hidden sm:flex text-white text-center">
                {userFromDB?.name + ' ' + userFromDB?.surname}
            </h2>
            {/* <div className="pic w-[40px] h-[40px] overflow-hidden rounded-full ml-2">
                <img className="h-full w-full" src={picUser} alt="usuario-img"/>
            </div> */}

        </div>

    )
}

export default UserNav