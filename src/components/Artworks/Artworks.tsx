"use client"

import { useContext, useEffect, useState } from 'react'
import { HistoryContext } from '@/providers/HistoryProvider'
import { useTranslation } from '@/app/i18n/client'
import { Artwork } from '@/lib/graphql'

import dynamic from 'next/dynamic'
import Loader from '@/components/Loader'
import ArtworkAnimation from '@/components/Animation/ArtworkAnimation'

// Dynamic import of Map component to avoid SSR issues
const Map = dynamic(() => import('@/components/Map/Map'), {
    ssr: false
})

interface ArtworksProps {
    lng: string;
    artworks: Artwork[];
}

const Artworks = ({ lng, artworks }: ArtworksProps) => {
    const [history, setHistory] = useContext(HistoryContext)
    const { t } = useTranslation(lng, 'common')
    const [loaded, setLoaded] = useState<boolean>(history.loaded || false)
    const [error, setError] = useState<boolean>(false)

    // Sync loaded state with history
    useEffect(() => {
        if (history.loaded && !loaded) {
            setLoaded(true)
        }
    }, [history.loaded, loaded])

    useEffect(() => {
        if (artworks.length === 0) {
            setError(true)
        } else {
            if (history.filtered.length !== 0) {
                setError(true)
            } else {
                setLoaded(true)
                // Also update history context
                setHistory(state => ({ ...state, loaded: true }))
            }
        }
 
        if (history.original.length === 0) {
            const lessArt: Artwork[] = []
            console.log("in artworks: ", artworks)
            artworks.forEach(artwork => {
                if (artwork.artworkFields.lat) {
                    lessArt.push(artwork)
                }
            })
            setHistory(state => ({
                ...state,
                original: artworks,
                filtered: lessArt
            }))
        }
    }, [artworks, history.original, setHistory])

    return (
        <section className="artworks-container">
            {!loaded 
            ? (
                <Loader />
            ) : (
                <Map lng={lng} />
            )}
        </section>
    )
}

export default Artworks