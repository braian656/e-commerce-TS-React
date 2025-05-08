


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
                cambiar foto
            </button>
        </div>
        </>
    )
}


export default PicPerfil