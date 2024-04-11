import { useContext } from "react"
import { HistoryContext } from "@/providers/HistoryProvider"
import Image from "next/image"

const Artwork = ({ artwork }) => {
    console.log(artwork)
    const [history] = useContext(HistoryContext)

    return (
        <figure className="artwork-container">
            <h1>{artwork.title}</h1>
            <Image
                src={`${history.imageUrl}${artwork.slug}/${artwork.slug}_lg.jpg`}
                width={400}
                height={400}
            />
        </figure>
    )
}

export default Artwork