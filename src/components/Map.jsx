"use client"

import { useState, useEffect, useRef, useContext, useMemo, useCallback } from 'react'
import { HistoryContext } from '@/providers/HistoryProvider'
import "@maptiler/sdk/dist/maptiler-sdk.css"
import 'mapbox-gl/dist/mapbox-gl.css'
import MapBox, { Marker, Popup, useMap } from 'react-map-gl'

import MapPin from '@/svg/mapPin'

import MapNav from './MapNav'

import { interpolate } from '@/helpers'


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

  const [singleMarkers, setSingleMarkers] = useState([])
  const [multipleMarkers, setMultipleMarkers] = useState([])

  console.log(history.popupOpen)

  // split all paintings into markers where markers with the same lat get bundled
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
      placedArtwork.forEach((obj, i) => {
        const value = obj['artworkFields']['lat']
          if (value !== undefined) {
              if (sortedArtwork.length === 0) {
                sortedArtwork.push([obj])
              } else if (sortedArtwork.some(art => art[0].artworkFields.lat === value)) {
                const addIndex = sortedArtwork.findIndex(art => art[0].artworkFields.lat === value)
                sortedArtwork[0].push(obj)
              } else {
                sortedArtwork.push([obj])
              }
          }
      });

      const tempSingleMarkers = []
      const tempMultipleMarkers = []

      sortedArtwork.map(artwork => {
        console.log(artwork.length)
        if (artwork.length === 1) {
          tempSingleMarkers.push(artwork)
        } else {
          tempMultipleMarkers.push(artwork)
        }
      })

      setSingleMarkers(tempSingleMarkers)
      setMultipleMarkers(tempMultipleMarkers)
    }
  }, [history.filtered])

  const singleArtMarkers = useMemo(() => singleMarkers.map(marker => (
    <div 
      className="map-marker-container"
      key={marker[0].slug}
    >
      <Marker
        longitude={marker[0].artworkFields.lng}
        latitude={marker[0].artworkFields.lat}
        anchor='bottom'
        onClick={(e) => {
          e.originalEvent.stopPropagation()
          setHistory(state => ({ ...state, popupOpen: marker[0].slug }))
        }}
      >
        <MapPin />
      </Marker>
      {history.popupOpen === marker[0].slug && (
        <Popup
          longitude={marker[0].artworkFields.lng}
          latitude={marker[0].artworkFields.lat}
          onClose={() => setHistory(state => ({ ...state, popupOpen: '' }))}
          // closeButton={true}
          offsetLeft={10}
        >
          <p>popup</p>
        </Popup>
      )}
    </div>
  ), [singleMarkers, history.popupOpen]))

  const multipleArtMarkers = useMemo(() => multipleMarkers.map(markers => (
    <div 
      className="map-marker-container"
      key={markers[0].slug}
    >
      <Marker
        longitude={markers[0].artworkFields.lng}
        latitude={markers[0].artworkFields.lat}
        anchor='bottom'
        onClick={(e) => {
          e.originalEvent.stopPropagation()
          setHistory(state => ({ ...state, popupOpen: markers[0].slug }))
        }}
      >
        <MapPin />
      </Marker>
      {history.popupOpen === markers[0].slug && (
        <Popup
          longitude={markers[0].artworkFields.lng}
          latitude={markers[0].artworkFields.lat}
          onClose={() => setHistory(state => ({ ...state, popupOpen: '' }))}
          // closeButton={true}
          offsetLeft={10}
        >
          <p>popup multiple</p>
        </Popup>
      )}
    </div>
   ), [multipleMarkers, history.popupOpen ]))

  // fly to function
  useEffect(() => {
    if (history.currentMapArtwork.length !== 0) {
      if (mapRef.current) {
        // console.log(mapRef.current)
        mapRef?.current?.flyTo({ center: [history.currentMapArtwork.artworkFields.lng, history.currentMapArtwork.artworkFields.lat] })
      }
    }
  }, [history.currentMapArtwork])


  // make the marker icon scale with the zoom of the map
  const onZoom = useCallback(e => {
    // console.log(e.viewState.zoom)
    setHistory(state => ({ ...state, mapPointScale: interpolate(e.viewState.zoom, 0, 23, 0, 2) }))
  }, [])

  return (
      <div className="map-wrap">
          <MapBox
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            initialViewState={viewport}
            style={{ width: "100%", height: "100%" }}
            mapStyle="mapbox://styles/mapbox/light-v11"
            ref={mapRef}
            onZoom={onZoom}
          >
            {singleArtMarkers}
            {multipleArtMarkers}
          </MapBox>
          <MapNav />
      </div>
    )
}

export default Map