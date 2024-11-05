"use client"

import { useContext, useEffect, useState } from 'react'
import { HistoryContext } from '@/providers/HistoryProvider'
import dynamic from 'next/dynamic'

import List from '@/components/List'
import Loader from '@/components/Loader'
// import TheMap from './Map'
const Map = dynamic(() => import('@/components/Map'), {
    ssr: false
})

const Artworks = ({ lng, artworks }) => {
    const [history, setHistory] = useContext(HistoryContext)
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)
    // console.log(artworks)

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
            const lessArt = []
            artworks.map(artwork => {
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
    }, [artworks, history.orginial])

    // console.log("fitlered: ", history.filtered)

    return (
        <section className="artworks-container">
            {!loaded 
            ? (
                <Loader />
            ) : (
                <>
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