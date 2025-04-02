import ButtonPag from "../buttons-component/ButtonPag"
interface PicPerfilType{
    picUser: string;
}
function PicPerfil({picUser}: PicPerfilType){

    
    return(
        <>
        <div className="pic-content">
            <div className="actual-pic">
                <img src={picUser} alt="" />
            </div>
            <button className="profile-button">
                CAMBIAR FOTO
            </button>
        </div>
        </>
    )
}


export default PicPerfil