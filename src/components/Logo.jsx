"use client"

import React, { useContext } from 'react'
import { HistoryContext } from '@/providers/HistoryProvider'

import ColorLogo from '@/svg/colorLogo'
import FarbenLogo from '@/svg/farbenLogo'

const Logo = ({ lng }) => {
    console.log(lng)
    const [history] = useContext(HistoryContext)
    
    return (
        <div className={history.navOpen ? 'logo logo-menu-open' : 'logo'}>
            {lng === 'de' ? (
                <FarbenLogo />
            ) : (
                <ColorLogo />
            )}
            <p className={history.navOpen ? 'logo-tageline logo-tageline-on' : 'logo-tageline'}>{history.currentCity}</p>
        </div>
    )
}

export default Logo