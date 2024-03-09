"use client"

import { useState, useEffect, createContext } from 'react'

export const HistoryContext = createContext()

const HistoryProvider = ({ children }) => {
    const [history, setHistory] = useState({
        hsitoryOn: false
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