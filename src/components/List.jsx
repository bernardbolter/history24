import { useContext } from "react"
import { HistoryContext } from "@/providers/HistoryProvider"

import Artwork from "@/components/Artwork"

const List = () => {
    const [history] = useContext(HistoryContext)

    return (
        <section className="list-container">
            {history.filtered.length !== 0 && (
                <div className="list-artworks-container">
                    {history.filtered.map(artwork => <Artwork artwork={artwork} key={artwork.slug} />)}
                </div>
            )}
        </section>
    )
}

export default List