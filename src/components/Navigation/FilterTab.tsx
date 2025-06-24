"use client"

import { useContext, useState } from "react"
import { HistoryContext } from "@/providers/HistoryProvider"
import { useTranslation } from "@/app/i18n/client"

import Filter from "@/svg/filter"
import Sort from "@/svg/sort"
import ToggleArrow from "@/svg/toggleArrow"

import FilterDot from "../Map/FilterDot"

import variables from '@/style/vars.module.scss'

import { decideColor } from '@/helpers/helpers'

interface FilterTabProps {
    lng: string;
}

const FilterTab: React.FC<FilterTabProps> = ({ lng }) => {
    const [history, setHistory] = useContext(HistoryContext)
    const { t } = useTranslation(lng, 'common')
    const [filterOpen, setFilterOpen] = useState(false)
    const [hover, setHover] = useState(false)

    const handleCityToggle = (cityName: string) => {
        setHistory(state => ({
            ...state,
            checked: state.checked.includes(cityName)
                ? state.checked.filter(c => c !== cityName)
                : [...state.checked, cityName]
        }))
    }

    const cities = ['San Francisco', 'Berlin', 'Hamburg']

    return (
        <div
            className="filter-sort-container"
            style={{
                bottom: history.viewMap ? 110 : 0,
            }}
        >
            {/* Filter tab header */}
            <div
                className="filter-sort-tab"
                onClick={() => {
                    setHover(false)
                    setFilterOpen(!filterOpen)
                }}
                onMouseEnter={() => !filterOpen && setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <p>{t('filter')}</p>
                <Filter />
                <p>&</p>
                <p>{t('sort')}</p>
                <Sort />
            </div>
            <div className="filter-line" />

            {/* Filter content */}
            <div
                className={`filter-content ${filterOpen ? 'filter-content-open' : ''}`}
                style={{
                    maxHeight: hover ? '6px' : filterOpen ? '800px' : '0'
                }}
            >
                <p className="filter-title">{t('filterArtworks')}:</p>

                {/* City filters */}
                {cities.map(city => (
                    <div
                        key={city}
                        className="filter-city"
                        onClick={() => handleCityToggle(city)}
                    >
                        <p>{city}</p>
                        <FilterDot checked={history.checked.includes(city)} />
                    </div>
                ))}

                {/* Available art filter */}
                <div
                    className="filter-city"
                    onClick={() => setHistory(state => ({ ...state, available: !state.available }))}
                >
                    <p>Available Art</p>
                    <FilterDot checked={history.available} />
                </div>

                {/* Sort options */}
                <p className="filter-title">{t('sortBy')}:</p>
                {[
                    { key: 'latest', label: t('latest') },
                    { key: 'oldest', label: t('oldest') },
                    { key: 'random', label: t('random') }
                ].map(({ key, label }, index, array) => (
                    <div
                        key={key}
                        className={`filter-city ${index === array.length - 1 ? 'filter-city-bottom-margin' : ''}`}
                        onClick={() => setHistory(state => ({ ...state, sorting: key as 'latest' | 'oldest' | 'random' }))}
                    >
                        <p>{label}</p>
                        <FilterDot checked={history.sorting === key} />
                    </div>
                ))}
                <div className="filter-line" />
            </div>
        </div>
    )
}

export default FilterTab