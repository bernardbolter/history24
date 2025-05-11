"use client"

import { useContext, useState } from "react"
import { HistoryContext } from "@/providers/HistoryProvider"
import { useTranslation } from "@/app/i18n/client"

import Filter from "@/svg/filter"
import Sort from "@/svg/sort"
import ToggleArrow from "@/svg/toggleArrow"

import FilterDot from "./FilterDot"

import variables from '@/style/vars.module.scss'

import { decideColor } from '@/helpers'

const FilterTab = ({ lng }) => {
    const [history, setHistory] = useContext(HistoryContext)
    const { t } = useTranslation(lng, 'common')
    const [filterOpen, setFilterOpen] = useState(false)
    const [hover, setHover] = useState(false)

    return (
        <div 
            className="filter-sort-container"
            style={{
                bottom: history.viewMap ? 110 : 0,
            }}    
        >
            <div 
                className="filter-sort-tab"
                onClick={() => {
                    setHover(false)
                    setFilterOpen(!filterOpen)}
                }
                onMouseEnter={() => {
                    if (!filterOpen) {
                        setHover(true)
                    }
                }}
                onMouseLeave={() => {
                    setHover(false)
                }}
            >
                <p>{t('filter')}</p>
                <Filter />
                <p>&</p>
                <p>{t('sort')}</p>
                <Sort />
            </div>
            <div className="filter-line" />
            <div 
                className={filterOpen ? 'filter-content filter-content-open' : 'filter-content'}
                style={{
                    maxHeight: hover ? '6px' : filterOpen ? '800px' : '0'
                }}    
            >
                <p className="filter-title">{t('filterArtworks')}:</p>
                    <div 
                        className="filter-city"
                        onClick={() => {
                            if (history.checked.includes("San Francisco")) {
                                var removeChecked = history.checked.filter(c => c !== "San Francisco")
                                setHistory(state => ({ ...state, checked: removeChecked }))
                            } else {
                                setHistory(state => ({ ...state, checked: [...history.checked, "San Francisco"] }))
                            }
                        }}
                    >
                        <p>San Francisco</p>
                        <FilterDot checked={history.checked.includes("San Francisco")} />
                    </div>
                    <div 
                        className="filter-city"
                        onClick={() => {
                            if (history.checked.includes("Berlin")) {
                                var removeChecked = history.checked.filter(c => c !== "Berlin")
                                setHistory(state => ({ ...state, checked: removeChecked }))
                            } else {
                                setHistory(state => ({ ...state, checked: [...history.checked, "Berlin"] }))
                            }
                        }}
                    >
                        <p>Berlin</p>
                        <FilterDot checked={history.checked.includes("Berlin")} />
                    </div>
                    <div 
                        className="filter-city"
                        onClick={() => {
                            if (history.checked.includes("Hamburg")) {
                                var removeChecked = history.checked.filter(c => c !== "Hamburg")
                                setHistory(state => ({ ...state, checked: removeChecked }))
                            } else {
                                setHistory(state => ({ ...state, checked: [...history.checked, "Hamburg"] }))
                            }
                        }}
                    >
                        <p>Hamburg</p>
                        <FilterDot checked={history.checked.includes("Hamburg")} />
                    </div>
                    <div 
                        className="filter-city"
                        onClick={() => setHistory(state => ({ ...state, available: !state.available }))}
                    >
                        <p>Available Art</p>
                        <FilterDot checked={history.available} />
                    </div>
                <p className="filter-title">{t('sortBy')}:</p>
                    <div 
                        className="filter-city"
                        onClick={() => setHistory(state => ({ ...state, sorting: 'latest' }))}
                    >
                        <p>{t('latest')}</p>
                        <FilterDot checked={history.sorting === 'latest'} />
                    </div>
                    <div 
                        className="filter-city"
                        onClick={() => setHistory(state => ({ ...state, sorting: 'oldest' }))}
                    >
                        <p>{t('oldest')}</p>
                        <FilterDot checked={history.sorting === 'oldest'} />
                    </div>
                    <div 
                        className="filter-city filter-city-bottom-margin"
                        onClick={() => setHistory(state => ({ ...state, sorting: 'random' }))}
                    >
                        <p>{t('random')}</p>
                        <FilterDot checked={history.sorting === 'random'} />
                    </div>
                <div className="filter-line" />
            </div>
        </div>
    )
}

export default FilterTab