interface ServerErrorProp{
    errorComponent : string;
}

function ServerError({errorComponent}: ServerErrorProp){
    return(
        <div className="content-error">
            <h1>{errorComponent}</h1>
        </div>
        
    )
}

export default ServerError