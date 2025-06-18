"use client"

import { useContext } from 'react'
import { HistoryContext } from '@/providers/HistoryProvider'
import { useTranslation } from "@/app/i18n/client"

const Contact = ({ lng }) => {
    const [history, setHistory] = useContext(HistoryContext)
    const { t } = useTranslation(lng, 'common')
    
    return (
        <div className="contact-container">
            <h3>Contact</h3>
        </div>
    )
}

export default Contact