"use client"

import { useContext, useEffect, useState } from 'react'
import { HistoryContext } from '@/providers/HistoryProvider'
import { useTranslation } from '@/app/i18n'

import dynamic from 'next/dynamic'

import List from '@/components/List'
import Loader from '@/components/Loader'
import FilterTab from '@/components/FilterTab'
// import TheMap from './Map'
const Map = dynamic(() => import('@/components/Map'), {
    ssr: false
})

const Artworks = ({ lng, artworks }) => {
    const [history, setHistory] = useContext(HistoryContext)
    const { t } = useTranslation(lng, 'common')
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
                    {/* <FilterTab lng={lng} /> */}
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