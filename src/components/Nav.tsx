"use client"

import { useContext } from 'react'
import { HistoryContext } from '@/providers/HistoryProvider'
import { useTranslation } from "@/app/i18n/client"
import Link from 'next/link'

const Nav = ({ lng }) => {
    const [history, setHistory] = useContext(HistoryContext)
    const { t } = useTranslation(lng, 'common')
    // console.log(history)

    return (
        <section className="nav-container">
            <button
                className={history.navOpen ? 'nav-button nav-button-open' : 'nav-button'}
                onClick={() => setHistory(state => ({ ...state, navOpen: !state.navOpen }))}
                aria-label="Menu"
                aria-controls="navigation"
            >
                <span />
                <span />
                <span />
                <span />
            </button>
            <nav
                id="navigation"
                className={history.navOpen ? 'nav-menu nav-menu-open' : 'nav-menu'}
            >
                <div className="nav-links-cities-container">
                    <div className="nav-links-container">
                        <div className="nav-links-about-prints">
                            <Link
                                href="/about"
                            >&rarr; {t('about')}</Link>
                            <Link
                                href="/prints"
                            >&rarr; {t('artPrints')}</Link>
                        </div>
                        <p
                            onClick={() => setHistory(state => ({ ...state, viewGates: true  }))}
                        >{t('theGatesOfPerception')} &larr;</p>
                        <p
                            onClick={() => setHistory(state => ({ ...state, viewWar: true  }))}
                        >{t('mediumsOfWar')} &larr;</p>
                        <p
                            onClick={() => setHistory(state => ({ ...state, viewAR: true  }))}
                        >{t('augmentedReality')} &larr;</p>
                    </div>
                </div>
            </nav>
        </section>
    )
}

export default Nav
