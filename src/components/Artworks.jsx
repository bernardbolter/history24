"use client"

import { useContext, Suspense, useEffect } from 'react'
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
    console.log(artworks)
    console.log(history)

    useEffect(() => {
        if (history.original.length === 0) {
            setHistory(state => ({
                ...state,
                original: artworks,
                filtered: artworks
            }))
        }
    }, [artworks])

    return (
        <section className="artworks-container">
            {history.filtered.length === 0 ? (
                <Loader />
            ) : (
                <>
                    {!history.viewMap ? (
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