"use client"

import React, { useContext } from 'react'
import { HistoryContext } from '@/providers/HistoryProvider'
import { useTranslation } from "@/app/i18n/client"

import ColorLogo from '@/svg/colorLogo'


const Logo = ({ lng }) => {
    const [history, setHistory] = useContext(HistoryContext)
    const { t } = useTranslation(lng, 'common')
    
    return (
        <div className={history.navOpen ? 'logo logo-menu-open' : 'logo'}>
            <ColorLogo />
            <p className='logo-tageline'>{t('paintingPhotographyAndHistory')}</p>
            <p className="logo-tageline-name">{t('by')} <b>Bernard Bolter</b></p>
            {/* <p className={history.navOpen ? 'logo-tageline logo-tageline-on' : 'logo-tageline'}>{history.currentCity}</p> */}
           
        </div>
    )
}

export default Logo