import { useContext } from "react"
import { HistoryContext } from "@/providers/HistoryProvider"
import MapNavImage from '@/components/MapNavImage'

const MapNav = () => {
    const [history, setHistory] = useContext(HistoryContext)
    // console.log(history.mapNavKey)

    return (
        <section className="map-nav-container">
            <div className="map-nav-artworks">
                {history.filtered && (
                    history.filtered.map((art, index) => <MapNavImage art={art} index={index} key={art.slug} />)
                )}
            </div>
        </section>
    )
}

export default MapNav