"use client"

import { useState, useEffect, createContext } from 'react'

export const HistoryContext = createContext()

const HistoryProvider = ({ children }) => {
    const [history, setHistory] = useState({
        imageUrl: 'https://digitalcityseries.com/art/a-colorful-history/',
        original: [],
        filtered: [],
        checked: [],
        sorting: '',
        navOpen: false,
        currentCity: 'San Francisco',
        searchTerm: '',
        viewMap: true,
        viewContact: false,
        viewGates: false,
        // map
        center: { lat: 52.518611, lng: 13.408333 },
        zoomLevel: 15,
        mapNavKey: []
    })

    useEffect(() => {
        console.log('history provider')
    }, [])

    return (
        <HistoryContext.Provider
        value={[history, setHistory]}
        >
            {children}
        </HistoryContext.Provider>
    )
}

export default HistoryProvider