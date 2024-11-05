import { useRef, useEffect, useContext } from 'react'
import { HistoryContext } from '@/providers/HistoryProvider'
import Image from 'next/image'

const MapNavImage = ({ art, index }) => {
    const [ history, setHistory] = useContext(HistoryContext)
    const mapNavImageRef = useRef(null)

    useEffect(() => {
        if (mapNavImageRef !== null) {
            console.log(mapNavImageRef.current.clientWidth)
            setHistory(state => ({ ...state, mapNavKey: [...state.mapNavKey, { index: index, width: mapNavImageRef.current.clientWidth }]}))
        }
    }, [mapNavImageRef])


    return (
        <div 
            className="map-nav-art"
            key={art.slug}
            onClick={() => {
                console.log("clicked " + art.slug)
                setHistory(state => ({ ...state, currentMapArtwork: art, popupOpen: art.slug }))
            }}
            ref={mapNavImageRef}  
        >
            <Image
                src={`${history.imageUrl}${art.slug}/${art.slug}_sm.jpg`}
                alt={`thumbnail image of ${art.title}`}
                width={100}
                height={100}
            />
        </div>
    )
}   

export default MapNavImage