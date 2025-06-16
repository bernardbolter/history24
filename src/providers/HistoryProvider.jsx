"use client"

import { useState, useEffect, createContext } from 'react'

export const HistoryContext = createContext()

import { interpolate } from '@/helpers'

const HistoryProvider = ({ children }) => {
    const [history, setHistory] = useState({
        imageUrl: 'https://digitalcityseries.com/art/a-colorful-history/',
        original: [],
        filtered: [],
        checked: ['San Francisco', 'Berlin', 'Hamburg'],
        sorting: 'latest',
        available: false,
        navOpen: false,
        currentCity: 'San Francisco',
        searchTerm: '',
        viewMap: true,
        viewContact: false,
        viewGates: false,
        viewWar: false,
        viewAR: false,
        // map
        coords: { lat: 52.518611, lng: 13.408333 },
        zoomLevel: 12,
        popupOpen: '',
        currentMapArtwork: {},
        mapNavKey: [],
        mapPointScale: interpolate(12, 0, 23, 0, 2),
        currentMapNavIndex: 0,
        mapNavHidden: false,
        // popup
        popupOpen: true
    })

    useEffect(() => {
        console.log('history provider: ', history.checked, history.sorting)
        console.log(history.original)
        if (history.original.length !== 0) {
            var newFiltered = []
            if (history.sorting === 'latest') {
                newFiltered = history.original.sort(function(a,b) {
                    return new Date(b.date) - new Date(a.date)
                })
            } else if (history.sorting === 'oldest') {
                console.log("filter oldest")
                newFiltered = history.original.sort(function(a,b) {
                    return new Date(a.date) - new Date(b.date)
                })
            }
            setHistory(state => ({ ...state, filtered: newFiltered }))
            console.log("new f: ", newFiltered)
        }
    }, [history.checked, history.sorting, history.available])

    return (
        <HistoryContext.Provider
        value={[history, setHistory]}
        >
            {children}
        </HistoryContext.Provider>
    )
}

export default HistoryProvider