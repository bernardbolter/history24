"use client"

import { useContext, useEffect, useState } from 'react'
import { HistoryContext } from '@/providers/HistoryProvider'
import { useTranslation } from '@/app/i18n/client'
import { Artwork } from '@/lib/graphql'

import dynamic from 'next/dynamic'

import List from '@/components/List'
import Loader from '@/components/Loader'
import FilterTab from '@/components/FilterTab'
import Popup from '@/components/Popup'

// Dynamic import of Map component to avoid SSR issues
const Map = dynamic(() => import('@/components/Map'), {
    ssr: false
})

interface ArtworksProps {
    lng: string;
    artworks: Artwork[];
}

const Artworks = ({ lng, artworks }: ArtworksProps) => {
    const [history, setHistory] = useContext(HistoryContext)
    const { t } = useTranslation(lng, 'common')
    const [loaded, setLoaded] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)

    useEffect(() => {
        if (artworks.length === 0) {
            setError(true)
        } else {
            if (history.filtered.length !== 0) {
                setError(true)
            } else {
                setLoaded(true)
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
                <>
                    {history.popupOpen && <Popup lng={lng} />}
                    {history.viewMap ? (
                        <Map lng={lng} />
                    ) : (
                        <List lng={lng} />
                    )}
                </>
            )}
        </section>
    )
}

export default Artworks