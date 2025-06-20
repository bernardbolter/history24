import { useContext } from "react"
import { HistoryContext } from "@/providers/HistoryProvider"
import { Artwork } from "@/lib/graphql"

import ArtworkComponent from "@/components/Artworks/Artwork"

interface ArtworkListProps {
    lng: string;
}

interface ArtworkListItemProps {
    artwork: Artwork;
    index: any;
    lng: string;
}

const ArtworkListItem = ({ artwork, index, lng }: ArtworkListItemProps) => (
    <ArtworkComponent
        artwork={artwork}
        key={artwork.slug}
        lng={lng}
    />
);

const EmptyArtworkList = () => (
    <div className="list-artworks-container--empty">
        No artworks to display
    </div>
);

const ArtworkList = ({ lng }: ArtworkListProps) => {
    const [history] = useContext(HistoryContext);
    const filteredArtworks = history.filtered;
    const hasArtworks = filteredArtworks.length > 0;

    return (
        <section className="list-container">
            {hasArtworks ? (
                <div className="list-artworks-container">
                    {filteredArtworks.map((artwork, index) => (
                        <ArtworkListItem
                            key={artwork.slug}
                            artwork={artwork}
                            index={index}
                            lng={lng}
                        />
                    ))}
                </div>
            ) : (
                <EmptyArtworkList />
            )}
        </section>
    );
};

export default ArtworkList
