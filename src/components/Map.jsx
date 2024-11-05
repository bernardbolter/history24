"use client"

import { useState, useEffect, useRef, useContext, useMemo } from 'react'
import { HistoryContext } from '@/providers/HistoryProvider'
import * as maptilersdk from '@maptiler/sdk'
import "@maptiler/sdk/dist/maptiler-sdk.css"
import 'mapbox-gl/dist/mapbox-gl.css'
import MapBox, { Marker, Popup, useMap } from 'react-map-gl'

import MapPoint from '@/svg/mapPoint'

import MapNav from './MapNav'

import variables from '@/style/vars.module.scss'
// console.log(L)
// console.log(MaptilerLayer)

// const svgIcon = L.divIcon({
//     html: `
//         <svg width="20" height="28" viewBox="0 0 20 28" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path 
//                 fillRule="evenodd" 
//                 clipRule="evenodd" 
//                 d="M16.01 20.262C17.176 20.865 18 21.596 18 22.5C18 23.203 17.472 23.804 16.7 24.331C15.19 25.36 12.746 26 10 26C7.254 26 4.81 25.36 3.3 24.331C2.528 23.804 2 23.203 2 22.5C2 21.598 2.82 20.867 3.984 20.265C4.474 20.011 4.664 19.407 4.41 18.917C4.158 18.427 3.552 18.235 3.062 18.489C1.1 19.506 0 20.976 0 22.5C0 23.785 0.762 25.02 2.174 25.983C3.942 27.188 6.786 28 10 28C13.214 28 16.058 27.188 17.826 25.983C19.238 25.02 20 23.785 20 22.5C20 20.974 18.898 19.503 16.93 18.485C16.44 18.232 15.836 18.424 15.582 18.914C15.328 19.404 15.52 20.008 16.01 20.262Z" 
//                 fill="black"
//             />
//             <path  
//                 fillRule="evenodd" 
//                 clipRule="evenodd" 
//                 d="M9.99999 0C5.95299 0 2.66699 3.286 2.66699 7.333C2.66699 8.458 3.24699 10.427 4.10299 12.622C5.98199 17.443 9.11299 23.462 9.11299 23.462C9.28499 23.792 9.62699 24 9.99999 24C10.373 24 10.715 23.792 10.887 23.462C10.887 23.462 14.018 17.443 15.897 12.622C16.753 10.427 17.333 8.458 17.333 7.333C17.333 3.286 14.047 0 9.99999 0ZM9.99999 4C8.34399 4 6.99999 5.344 6.99999 7C6.99999 8.656 8.34399 10 9.99999 10C11.656 10 13 8.656 13 7C13 5.344 11.656 4 9.99999 4Z" 
//                 fill="black"
//             />
//         </svg>
//     `,
//     className: "svg-icon",
//     iconSize: [24, 40],
//     iconAnchor: [12, 40]
//   });


const Map = ({ lng }) => {
  // console.log("lng: ", lng)
 
  const [history, setHistory] = useContext(HistoryContext)
  // const [popupOpen, setPopupOpen] = useState({})

  const { current: map } = useMap()

  const mapRef = useRef(null)

  const [viewport, setViewport] = useState({
    latitude: history.coords.lat,
    longitude: history.coords.lng,
    zoom: history.zoomLevel,
  })

  const [arts, setArts] = useState([])

  useEffect(() => {
    if (history.filtered.length !== 0) {
      // console.log("filtered ready")
      const placedArtwork = []
      const sortedArtwork = []
      history.filtered.map(artwork => {
        // console.log(artwork)
        if (artwork.artworkFields.lat) {
          placedArtwork.push(artwork)
        }

      })
      placedArtwork.forEach(obj => {
        // console.log("obj: ", obj['artworkFields']['lat'])
        const value = obj['artworkFields']['lat'];
          if (value !== undefined) {
              if (!sortedArtwork[value]) {
                sortedArtwork[value] = [];
              }
              sortedArtwork[value].push(obj);
          }
      });

      console.log(sortedArtwork)
      // placedArtwork.map(artwork => {
        
      // })
      // console.log("setState: ", placedArtwork)
      setArts(placedArtwork)

    }
  }, [history.filtered])

  const artMarkers = useMemo(() => arts.map(art => (
      <div key={art.slug}>
        <Marker
          longitude={art.artworkFields.lng}
          latitude={art.artworkFields.lat}
          onClick={(e) => {
            e.originalEvent.stopPropagation()
            setHistory(state => ({ ...state, popupOpen: art.slug }))
          }}
        >
          <div
              style={{
                width: 20,
                height: 20,
                backgroundColor: 'green'
              }}
          />
        </Marker>
            {(history.popupOpen === art.slug) && (
              <Popup
                key={art.slug}
                longitude={art.artworkFields.lng}
                latitude={art.artworkFields.lat}
                onClose={() => setHistory(state => ({  ...state, popupOpen: '' }))}
                closeButton={true}
              >
                <span>
                  {art.title}
                </span>
              </Popup>
            )}
      </div>
    )
  ), [arts, history.popupOpen])

  useEffect(() => {
    if (history.currentMapArtwork.length !== 0) {
      if (mapRef.current) {
        // console.log(mapRef.current)
        mapRef?.current?.flyTo({ center: [history.currentMapArtwork.artworkFields.lng, history.currentMapArtwork.artworkFields.lat] })
      }
    }
  }, [history.currentMapArtwork])

  // console.log(history.popupOpen)

  return (
      <div className="map-wrap">
          <MapBox
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={viewport}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/light-v11"
            ref={mapRef}
          >
            {artMarkers}
            {/* <Marker
                  longitude={history.coords.lng}
                  latitude={history.coords.lat}
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    console.log("clicked marker: ", popupOpen)
                    setPopupOpen(state => !state)
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      background: "black"
                    }}
                  />
              </Marker>
              {popupOpen && (
                <Popup
                  longitude={history.coords.lng}
                  latitude={history.coords.lat}
                  onClose={() => setPopupOpen(false)}
                  // closeButton={true}
                  offsetLeft={10}
                >
                  <p>popup</p>
                </Popup>
                ) }
                <Marker
                  longitude={history.coords.lng}
                  latitude={history.coords.lat}
                  onClick={(e) => {
                    e.originalEvent.stopPropagation();
                    console.log("clicked marker: ", popupOpen)
                    setPopupOpen(state => !state)
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      background: "blue"
                    }}
                  />
              </Marker> */}
          </MapBox>
          <MapNav />
      </div>
    )
}

export default Map