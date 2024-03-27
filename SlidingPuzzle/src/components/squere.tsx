import React from "react";
import ISquereProps from "../utils/IsquereProps"
import "./squere.css"
import { useEffect, useState } from "react";

function Squere(Props:ISquereProps){
    const [clicked, clickChanged] = useState(false);

    const OnHover = () => {

        const num = Props.num
        const key = Props.idx
        const goalRow = Math.floor((num - 1) / 3);// real distance of given number in puzzle to it's actuall poss(eg.{1;0,3:0,3:1})
        const goalCol = (num - 1) % 3;// real distance of gicen number in puzzle to it's actual posy
        const dx = Math.floor(key / 3 - goalRow)
        const dy = Math.floor((key % 3) - goalCol)
        Props.onHover(dx + dy)

    }

    let Style: string;

    useEffect(() => {
        Style = ""
    })

    switch (Props.emptyIdx) {

        case Props.idx - 1:
            Style = "right"
            break
        case Props.idx + 1:
            Style = "left"
            break
        case Props.idx - 3:
            Style = "down"
            break
        case Props.idx + 3:
            Style = "up"
            break
        default:
            Style = "wiggle"
    }
    return (
        <div onTransitionEnd={Props.TranEndCalback} onClick={() => { clickChanged(!clicked)}} onMouseEnter={OnHover} className={`text-5xl border-2 bg-primary shadow-lg 
            border-black text-black bg-white p-5 box ${clicked ? Style : ""}`}>
            {Props.num == 0 ? "" : Props.num}
        </div>
    )
}
export default React.memo(Squere)
