import { useContext } from "react"
import { HistoryContext } from "@/providers/HistoryProvider"

import variables from '@/style/vars.module.scss'

const decideColor = variables => {
    var colors = []
    Object.keys(variables).forEach(key => {
        if (key !== '__checksum') {
            colors.push(variables[key])
        }
    })
    return colors[Math.floor(Math.random()*colors.length)]
}

const MapPoint = ({ color }) => {
    const [history] = useContext(HistoryContext)

    return (
        <svg
            style={{ transform: `scale(${history.mapPointScale})`, width: 20, height: 28 }}
            viewBox="0 0 20 28"
            fill={decideColor(variables)}
        >
            <path 
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M16.01 20.262C17.176 20.865 18 21.596 18 22.5C18 23.203 17.472 23.804 16.7 24.331C15.19 25.36 12.746 26 10 26C7.254 26 4.81 25.36 3.3 24.331C2.528 23.804 2 23.203 2 22.5C2 21.598 2.82 20.867 3.984 20.265C4.474 20.011 4.664 19.407 4.41 18.917C4.158 18.427 3.552 18.235 3.062 18.489C1.1 19.506 0 20.976 0 22.5C0 23.785 0.762 25.02 2.174 25.983C3.942 27.188 6.786 28 10 28C13.214 28 16.058 27.188 17.826 25.983C19.238 25.02 20 23.785 20 22.5C20 20.974 18.898 19.503 16.93 18.485C16.44 18.232 15.836 18.424 15.582 18.914C15.328 19.404 15.52 20.008 16.01 20.262Z" 
            />
            <path  
                fillRule="evenodd" 
                clipRule="evenodd" 
                d="M9.99999 0C5.95299 0 2.66699 3.286 2.66699 7.333C2.66699 8.458 3.24699 10.427 4.10299 12.622C5.98199 17.443 9.11299 23.462 9.11299 23.462C9.28499 23.792 9.62699 24 9.99999 24C10.373 24 10.715 23.792 10.887 23.462C10.887 23.462 14.018 17.443 15.897 12.622C16.753 10.427 17.333 8.458 17.333 7.333C17.333 3.286 14.047 0 9.99999 0ZM9.99999 4C8.34399 4 6.99999 5.344 6.99999 7C6.99999 8.656 8.34399 10 9.99999 10C11.656 10 13 8.656 13 7C13 5.344 11.656 4 9.99999 4Z" 
            />
        </svg>
    )
}

export default MapPoint
