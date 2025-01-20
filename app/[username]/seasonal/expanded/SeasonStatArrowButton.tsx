import { PiArrowLeftBold, PiArrowRightBold } from "react-icons/pi"
import { useSingleSeasonContext } from "../reducer/SeasonalContext"
import { useState } from "react"

export default function SeasonStatArrowButton({onClick, type}: {onClick: () => void, type: "left" | "right"}){
    //const { altBackgroundColor } = useSingleSeasonContext()!
    const [hovered, setHovered] = useState(false)
    return (
        <button
            onClick={onClick}
            className={`absolute ${type == "left" ? "left-0" : "right-0"}
             ${hovered? "bg-zinc-600" : "bg-zinc-800"} top-1/4 transition-colors duration-300 rounded-full p-2`}
            //style={{backgroundColor: hovered? altBackgroundColor : "#27272A"}}
            aria-label={type == "left" ? "Previous Stat" : "Next Stat"}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {type == "left"? <PiArrowLeftBold/> : <PiArrowRightBold/>}
        </button>
    )
}