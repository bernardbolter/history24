"use client"

import { useContext, useState } from "react"
import { HistoryContext } from "@/providers/HistoryProvider"
import { useTranslation } from "@/app/i18n/client"
import MapPoint from "@/svg/mapPoint"

const Popup = ({ lng }) => {
    const [history, setHistory] = useContext(HistoryContext)
    const { t } = useTranslation(lng, 'common')

    return (
        <section className="popup-container">
            <p>popup</p>
            <div 
                className="popup-close-container"
                onClick={() => setHistory(state => ({ ...state, popupOpen: false}))}    
            >
                <MapPoint />
            </div>
        </section>
    )
}

export default Popup