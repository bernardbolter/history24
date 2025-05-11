import { useContext, useMemo } from "react"
import { HistoryContext } from "@/providers/HistoryProvider"

import MapNavImage from '@/components/MapNavImage'

import RightArrow from "@/svg/rightArrow"

const MapNav = () => {
    const [history, setHistory] = useContext(HistoryContext)

    const mapNavLeft = useMemo(() => {
        var tempLeft = 0
        history.filtered.map((art, i) => {
            // console.log(i, history.currentMapNavIndex)
            // console.log(art.artworkFields.proportion)
            if (i < history.currentMapNavIndex) {
                tempLeft = tempLeft - (art.artworkFields.proportion * 100) - 5
            }
            // console.log(tempLeft)
        })
        return tempLeft
    }, [history.filtered, history.currentMapNavIndex])

    return (
        <section className="map-nav-container">
            {/* <div 
                className="map-nav-minimize-container"
                onClick={() => setHistory(state => ({ ...state, mapNavHidden: !state.mapNavHidden }))}    
            >
                <p>{t('minimize')}</p>
                <div 
                className="map-nav-minimize-toggle"
                style={{ transform: history.mapNavHidden ? 'rotate(90deg)' : 'rotate(0deg)' }}  
                >
                <ToggleArrow />
                </div>
            </div> */}
            <div 
                className={history.currentMapNavIndex === 0 ? "map-nav-arrow map-nav-arrow-disabled map-nav-left" : "map-nav-arrow map-nav-left"}
                onClick={() => {
                    setHistory(state => ({ ...state, currentMapNavIndex: state.currentMapNavIndex - 1 }))
                    console.log(history.currentMapNavIndex)
                }}
            >
                <RightArrow />
            </div>
            <div className="map-nav-artworks">
                <div 
                    className="map-nav-artworks-inner"
                    style={{ transform: `translateX(${mapNavLeft}px)` }} 
                >
                    {history.filtered && (
                        history.filtered.map((art, index) => <MapNavImage art={art} index={index} key={art.slug} />)
                    )}
                </div>
            </div>
            <div 
                className={history.currentMapNavIndex === history.filtered.length ? "map-nav-arrow map-nav-arrow-disabled map-nav-right" : "map-nav-arrow map-nav-right"}
                onClick={() => {
                    setHistory(state => ({ ...state, currentMapNavIndex: state.currentMapNavIndex + 1 }))
                    console.log(history.currentMapNavIndex)
                }}
            >
                <RightArrow />
            </div>
        </section>
    )
}

export default MapNav