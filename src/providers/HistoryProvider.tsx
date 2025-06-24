"use client"

import { useState, useEffect, createContext, Dispatch, SetStateAction, ReactNode } from 'react'
import { Artwork } from '@/lib/graphql'
import { interpolate } from '@/helpers/helpers'

interface Coordinates {
  lat: number;
  lng: number;
}

interface RectData {
  top: number;
  left: number;
  width: number;
  height: number;
  bottom: number;
  right: number;
  x: number;
  y: number;
}

interface AnimationState {
  isAnimating: boolean;
  isReversing: boolean;
  sourceRect: RectData | null;
  artwork: Artwork | null;
  cameFromMap: boolean;
  savedMapState: {
    coords: Coordinates;
    zoomLevel: number;
    popupOpen: boolean | string;
  } | null;
}

interface HistoryState {
  imageUrl: string;
  original: Artwork[];
  filtered: Artwork[];
  checked: string[];
  sorting: 'latest' | 'oldest' | 'random';
  available: boolean;
  navOpen: boolean;
  currentCity: string;
  searchTerm: string;
  viewMap: boolean;
  viewContact: boolean;
  viewGates: boolean;
  viewWar: boolean;
  viewAR: boolean;
  coords: Coordinates;
  zoomLevel: number;
  popupOpen: boolean | string;
  currentMapArtwork: Partial<Artwork>;
  mapNavKey: any[];
  mapPointScale: number;
  currentMapNavIndex: number;
  mapNavHidden: boolean;
  loaded: boolean;
  pinColors: Record<string, string>;
  animation: AnimationState;
}

type HistoryContextType = [HistoryState, Dispatch<SetStateAction<HistoryState>>];

export const HistoryContext = createContext<HistoryContextType>([
  {
    imageUrl: '',
    original: [],
    filtered: [],
    checked: [],
    sorting: 'latest',
    available: false,
    navOpen: false,
    currentCity: '',
    searchTerm: '',
    viewMap: true,
    viewContact: false,
    viewGates: false,
    viewWar: false,
    viewAR: false,
    coords: { lat: 0, lng: 0 },
    zoomLevel: 12,
    popupOpen: false,
    currentMapArtwork: {},
    mapNavKey: [],
    mapPointScale: 0,
    currentMapNavIndex: 0,
    mapNavHidden: false,
    loaded: false,
    pinColors: {},
    animation: {
      isAnimating: false,
      isReversing: false,
      sourceRect: null,
      artwork: null,
      cameFromMap: false,
      savedMapState: null
    }
  },
  () => {}
]);

interface HistoryProviderProps {
  children: ReactNode;
}

const HistoryProvider = ({ children }: HistoryProviderProps) => {
  const [history, setHistory] = useState<HistoryState>({
    imageUrl: 'https://digitalcityseries.com/art/a-colorful-history/',
    original: [],
    filtered: [],
    checked: ['San Francisco', 'Berlin', 'Hamburg'],
    sorting: 'latest',
    available: false,
    navOpen: false,
    currentCity: 'San Francisco',
    searchTerm: '',
    viewMap: true,
    viewContact: false,
    viewGates: false,
    viewWar: false,
    viewAR: false,
    // map
    coords: { lat: 52.518611, lng: 13.408333 },
    zoomLevel: 12,
    popupOpen: '',
    currentMapArtwork: {},
    mapNavKey: [],
    mapPointScale: interpolate(12, 0, 23, 0, 2),
    currentMapNavIndex: 0,
    mapNavHidden: false,
    loaded: false,
    pinColors: {},
    animation: {
      isAnimating: false,
      isReversing: false,
      sourceRect: null,
      artwork: null,
      cameFromMap: false,
      savedMapState: null
    }
  })

  useEffect(() => {
    console.log('history provider: ', history.checked, history.sorting)
    console.log(history.original)
    if (history.original.length !== 0) {
      let newFiltered: Artwork[] = []
      if (history.sorting === 'latest') {
        newFiltered = [...history.original].sort(function(a, b) {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
      } else if (history.sorting === 'oldest') {
        console.log("filter oldest")
        newFiltered = [...history.original].sort(function(a, b) {
          return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
      }
      setHistory(state => ({ ...state, filtered: newFiltered }))
      console.log("new f: ", newFiltered)
    }
  }, [history.checked, history.sorting, history.available])

  return (
    <HistoryContext.Provider
      value={[history, setHistory]}
    >
      {children}
    </HistoryContext.Provider>
  )
}

export default HistoryProvider