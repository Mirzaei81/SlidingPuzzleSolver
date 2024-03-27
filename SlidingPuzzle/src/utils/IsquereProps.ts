import { Dispatch, SetStateAction, TransitionEventHandler } from "react"

export default interface ISquereProps {
    num: number
    idx: number
    emptyIdx: number
    TranEndCalback: TransitionEventHandler
    onHover:Dispatch<SetStateAction<number>>
}