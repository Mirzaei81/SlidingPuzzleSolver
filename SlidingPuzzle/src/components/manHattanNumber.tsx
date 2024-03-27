import React from "react"

function ManHattanNumber(Props:{mn:number}){
    return(
        <div className="">Mn:{Props.mn}</div>
    )

}
export default React.memo(ManHattanNumber)