"use client"

import React, { useContext } from 'react'
import { HistoryContext } from '@/providers/HistoryProvider'
import { useTranslation } from "@/app/i18n/client"

import ColorLogo from '@/svg/colorLogo'
import FarbenLogo from '@/svg/farbenLogo'

import DEflag from '@/svg/DE'
import USflag from '@/svg/US'

const Logo = ({ lng }) => {
    // console.log(lng)
    const [history, setHistory] = useContext(HistoryContext)
    const { t, i18n } = useTranslation(lng, 'common')
    // console.log(i18n)
    
    return (
        <div className={history.navOpen ? 'logo logo-menu-open' : 'logo'}>
            <ColorLogo />
            {/* <p className={history.navOpen ? 'logo-tageline logo-tageline-on' : 'logo-tageline'}>{history.currentCity}</p> */}
            <div 
                className="artwork-switch-container"
                onClick={() => setHistory(state => ({ ...state, viewMap: !state.viewMap }))}    
            >
                <p
                    style={{
                        opacity: history.viewMap ? .9 : .2
                    }}
                >{t('map')}</p>
                <svg className={!history.viewMap ? 'switch-svg switch-svg-on' : 'switch-svg'} viewBox="0 0 36 20">
                    <circle id="switch-circle" cx="9.5" cy="9.5" r="5" />
                    <path id="switch-line" d="M9.07449777,0.501116071 L26.2918527,0.501116071 C26.3480324,0.501116071 26.463939,0.505293735 26.6308606,0.518186057 C26.9148788,0.540122424 27.23282,0.579790498 27.5759407,0.641626622 C28.5565666,0.81835188 29.5364966,1.13623162 30.4469139,1.62844911 C33.0333627,3.02681371 34.577567,5.53143769 34.577567,9.50111607 C34.577567,13.4687989 33.0085219,15.9729948 30.3784455,17.3721955 C29.4519985,17.8650653 28.4547544,18.1833856 27.4567803,18.3603597 C27.1075438,18.4222909 26.7839071,18.4620236 26.4947544,18.4839992 C26.3246933,18.4969238 26.2064902,18.5011161 26.1489955,18.5011161 L9.07741753,18.5011161 L9.07701793,18.5011162 C9.02016289,18.5012826 8.89427231,18.4969556 8.71995209,18.4840074 C8.42518056,18.4621123 8.09566273,18.4224654 7.74036719,18.3606369 C6.72670741,18.1842398 5.71410928,17.8666982 4.77343045,17.3749111 C2.09992945,15.9772043 0.506138393,13.4739719 0.506138393,9.50613839 C0.506138393,5.53813138 2.09957729,3.03288127 4.77241424,1.63211108 C5.71453343,1.13836885 6.72869185,0.819471085 7.74360961,0.642173011 C8.09881513,0.580121427 8.42800967,0.540308422 8.72217124,0.518285126 C8.8952913,0.505323969 9.01572888,0.501116071 9.07449777,0.501116071 Z" />
                </svg>
                <p
                    style={{
                        opacity: !history.viewMap ? .9 : .2
                    }}
                >{t('list')}</p>
            </div>
            <div className="logo-switch-divider" />
            <div 
                className="lng-switch-container"
                onClick={() => {
                    console.log(i18n.language)
                    if (i18n.language === 'en') {
                        i18n.changeLanguage("de")
                    } else {
                        i18n.changeLanguage('en')
                    }
                }}
            >
                <div 
                    className="us-flag-container"
                    style={{
                        opacity: i18n.language === "en" ? .8 : .2
                    }}    
                >
                    <USflag />
                </div>
                <svg className={i18n.language === "de" ? 'switch-svg switch-svg-on' : 'switch-svg'} viewBox="0 0 36 20">
                    <circle id="switch-circle" cx="9.5" cy="9.5" r="5" />
                    <path id="switch-line" d="M9.07449777,0.501116071 L26.2918527,0.501116071 C26.3480324,0.501116071 26.463939,0.505293735 26.6308606,0.518186057 C26.9148788,0.540122424 27.23282,0.579790498 27.5759407,0.641626622 C28.5565666,0.81835188 29.5364966,1.13623162 30.4469139,1.62844911 C33.0333627,3.02681371 34.577567,5.53143769 34.577567,9.50111607 C34.577567,13.4687989 33.0085219,15.9729948 30.3784455,17.3721955 C29.4519985,17.8650653 28.4547544,18.1833856 27.4567803,18.3603597 C27.1075438,18.4222909 26.7839071,18.4620236 26.4947544,18.4839992 C26.3246933,18.4969238 26.2064902,18.5011161 26.1489955,18.5011161 L9.07741753,18.5011161 L9.07701793,18.5011162 C9.02016289,18.5012826 8.89427231,18.4969556 8.71995209,18.4840074 C8.42518056,18.4621123 8.09566273,18.4224654 7.74036719,18.3606369 C6.72670741,18.1842398 5.71410928,17.8666982 4.77343045,17.3749111 C2.09992945,15.9772043 0.506138393,13.4739719 0.506138393,9.50613839 C0.506138393,5.53813138 2.09957729,3.03288127 4.77241424,1.63211108 C5.71453343,1.13836885 6.72869185,0.819471085 7.74360961,0.642173011 C8.09881513,0.580121427 8.42800967,0.540308422 8.72217124,0.518285126 C8.8952913,0.505323969 9.01572888,0.501116071 9.07449777,0.501116071 Z" />
                </svg>
                <div 
                    className="de-flag-container"
                    style={{
                        opacity: i18n.language === "de" ? .8 : .2
                    }}    
                >
                    <DEflag />
                </div>
            </div>
        </div>
    )
}

export default Logo