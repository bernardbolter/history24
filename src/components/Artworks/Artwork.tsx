import { useContext } from "react"
import { HistoryContext } from "@/providers/HistoryProvider"
import Image from "next/image"
import Link from "next/link"

const Artwork = ({ artwork, lng }) => {
    const [history] = useContext(HistoryContext)

    // Check if artwork belongs to "A Colorful History" series
    if (artwork.artworkFields.series !== "A Colorful History") {
        return null
    }

    return (
        <Link href={`/${lng}/artwork/${artwork.slug}`} className="artwork-link">
            <figure className="artwork-container">
                <h1>{artwork.title}</h1>
                <div className="artwork-image">
                    <Image
                        src={artwork.artworkFields.artworkImage?.mediaDetails.sizes[1].sourceUrl}
                        alt={artwork.title}
                        width={400}
                        height={400 / artwork.artworkFields.proportion}
                        style={{ objectFit: 'cover' }}
                    />
                    {artwork.artworkFields.forsale && (
                        <div className="for-sale-badge">Available</div>
                    )}
                </div>
                <div className="artwork-info">
                    <div className="metadata">
                        <span>{artwork.artworkFields.year}</span>
                        <span>{artwork.artworkFields.city}, {artwork.artworkFields.country}</span>
                    </div>
                </div>
            </figure>
        </Link>
    )
}

export default Artwork