"use client"

import { useState, useEffect, useRef, useContext, useMemo, useCallback, useLayoutEffect } from 'react'
import { HistoryContext } from '@/providers/HistoryProvider'
// import { useTranslation } from "@/app/i18n/client"
import Image from 'next/image'

import 'mapbox-gl/dist/mapbox-gl.css'
import MapBox, { Marker, Popup, useMap } from 'react-map-gl'

import MapPin from '@/svg/mapPin'
import MapNav from './MapNav'
import RightArrow from '@/svg/rightArrow'
import ToggleArrow from '@/svg/toggleArrow'
import Enlarge from '@/svg/enlarge'

// import Zoom from 'react-medium-image-zoom'
import { Controlled as ControlledZoom } from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import CustomZoomContent from '../Artworks/CustomZoomContent'

import { interpolate } from '@/helpers'

const Map = ({ lng }) => {
  // console.log("lng: ", lng)
 
  const [history, setHistory] = useContext(HistoryContext)
  // const { t } = useTranslation(lng, 'common')
  // console.log(history.popupOpen)
  // console.log(t)

  const { current: map } = useMap()

  const mapRef = useRef(null)

  const [markersIndex, setMarkersIndex] = useState([])
  const [markersLeftArray, setMarkersLeftArray] = useState([])
  const [isZoomedIndex, setIsZoomedIndex] = useState([])

  const [viewport, setViewport] = useState({
    latitude: history.coords.lat,
    longitude: history.coords.lng,
    zoom: history.zoomLevel,
  })

  const [singleMarkers, setSingleMarkers] = useState([])
  const [multipleMarkers, setMultipleMarkers] = useState([])
  const [currentImageEnlarge, setCurrentImageEnlarge] = useState({})

  // console.log(history.popupOpen)

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
        console.log("lat: ", value)
          if (value !== undefined) {
              if (sortedArtwork.length === 0) {
                sortedArtwork.push([obj])
              } else if (sortedArtwork.some(art => art[0].artworkFields.lat === value)) {
                const addIndex = sortedArtwork.findIndex(art => art[0].artworkFields.lat === value)
                console.log("add index: ", addIndex)
                sortedArtwork[addIndex].push(obj)
              } else {
                sortedArtwork.push([obj])
              }
          }
      });

      console.log("sorted: ", sortedArtwork)

      const tempSingleMarkers = []
      const tempMultipleMarkers = []
      // setMarkersIndex([])

      sortedArtwork.map(artwork => {
        console.log(artwork.length)
        if (artwork.length === 1) {
          tempSingleMarkers.push(artwork)
        } else {
          tempMultipleMarkers.push(artwork)
          // setMarkersIndex(state => [...state, 0])
          console.log("pushing")
        }
      })

      // if (markersIndex.length === 0 ) {
      //   console.log(markersIndex.length, " inside")
        // tempMultipleMarkers.map(marker => {
        //   console.log(marker, "more inside")
        //   setMarkersIndex(state => [...state, 1])
        // })
      // }

      setSingleMarkers(tempSingleMarkers)
      setMultipleMarkers(tempMultipleMarkers)
      console.log('single: ', tempSingleMarkers)
      console.log("multiple: ", tempMultipleMarkers)
      console.log("markindex: ", markersIndex)
    }
  }, [history.filtered])

  const handleZoomChange = useCallback((shouldZoom, id) => {
    console.log("in zoom: " , shouldZoom, id)
  }, [])

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
          closeButton={false}
          offset={25}
          anchor='bottom'
        >
          <div className="map-pop-single-container">
            <ControlledZoom
              zoomMargin={20}
              isZoomed={isZoomedIndex[marker[0].slug]}
              onZoomChange={(shouldZoom) => handleZoomChange(shouldZoom, marker[0].slug)}
              
            >
              <img 
                src={marker[0].artworkFields.artworkImage?.mediaDetails.sizes[1].sourceUrl} 
                width={100 * marker[0].artworkFields.proportion}
                height={100}
              />
            </ControlledZoom>
          </div>
        </Popup>
      )}
    </div>
  )), [singleMarkers, history.popupOpen, isZoomedIndex])

  const getAllMarkerWidths = (markers: { artworkFields: { proportion: number } }[]) => {
    let allWidths = 0;
    markers.forEach(marker => {
      allWidths += 100 * marker.artworkFields.proportion;
    });
    return allWidths
  }

  // useCallback(() => {
  //   console.log("callback: ", multipleMarkers)
  //   console.log("index multi: ", markersIndex)
  // }, [multipleMarkers, markersIndex])

  const multipleArtMarkers = useMemo(() => multipleMarkers.map((markers, i) => (
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
      {((history.popupOpen === markers[0].slug) 
        || (history.popupOpen === markers[1].slug)
        || (history.popupOpen === markers[2]?.slug) 
        || (history.popupOpen === markers[3]?.slug) 
        || (history.popupOpen === markers[4]?.slug)
        || (history.popupOpen === markers[5]?.slug)
        || (history.popupOpen === markers[6]?.slug)
        || (history.popupOpen === markers[7]?.slug)
        || (history.popupOpen === markers[8]?.slug)
        || (history.popupOpen === markers[9]?.slug)
        || (history.popupOpen === markers[10]?.slug)) 
        && (
        <Popup
          longitude={markers[0].artworkFields.lng}
          latitude={markers[0].artworkFields.lat}
          onClose={() => setHistory(state => ({ ...state, popupOpen: '' }))}
          closeButton={false}
          offset={20}
          anchor='bottom'
          style={{
            padding: 5
          }}
        >
          <div 
            className="map-pop-multiple-container"
            style={{
              width: 100 * markers[markersIndex[i]].artworkFields.proportion
            }}   
          >
            <div 
              className={
                markersIndex[i] > 0
                ? "map-marker-left-container"
                : "map-marker-left-container marker-nav-disabled"
              }
              onClick={() => {
                if (markersIndex[i] > 0) {
                  const newMarkersIndex = [...markersIndex]
                  newMarkersIndex[i] = markersIndex[i] - 1
                  setMarkersIndex(newMarkersIndex)
                  const newMarkersLeftArray = [...markersLeftArray]
                  var newMarkerLeft = 0
                  const staticNewMarkerIndex = newMarkersIndex[i]
                  markers.map((mark, i) => {
                    if (i < staticNewMarkerIndex) {
                      newMarkerLeft = newMarkerLeft - (mark.artworkFields.proportion * 100)
                    }
                  })
                  newMarkersLeftArray[i] = newMarkerLeft
                  setMarkersLeftArray(newMarkersLeftArray)
                } else {
                  console.log("no click left: ", i, markersIndex[i], markers.length)
                }
              }}
            >
              <RightArrow />
            </div>
            <div 
              className={
                markersIndex[i] < (markers.length - 1)
                ? "map-marker-right-container"
                : "map-marker-right-container marker-nav-disabled"
              }
              onClick={() => {
                if (markersIndex[i] < (markers.length - 1)) {
                  const newMarkersIndex = [...markersIndex]
                  newMarkersIndex[i] = markersIndex[i] + 1
                  setMarkersIndex(newMarkersIndex)
                  const newMarkersLeftArray = [...markersLeftArray]
                  var newMarkerLeft = 0
                  const staticNewMarkerIndex = newMarkersIndex[i]
                  markers.map((mark, i) => {
                    if (i < staticNewMarkerIndex) {
                      newMarkerLeft = newMarkerLeft - (mark.artworkFields.proportion * 100)
                    }
                  })
                  newMarkersLeftArray[i] = newMarkerLeft
                  setMarkersLeftArray(newMarkersLeftArray)
                } else {
                  console.log("no click right: ", i, markersIndex[i], markers.length)
                }
              }}
            >
              <RightArrow />
            </div>
            <div 
              className="map-pop-multiple-inner"
              style={{
                width: getAllMarkerWidths(markers),
                transform: `translateX(${markersLeftArray[i]}px)`
              }}  
            >
              {markers.map(mark => {
                if (mark.slug === history.popupOpen) {
                  return (
                    <div 
                      className="map-pop-multiple-art"
                      style={{
                        width: 100 * mark.artworkFields.proportion,
                      }}
                      key={mark.slug}
                    >
                      <Image
                          src={mark.artworkFields.artworkImage?.mediaDetails.sizes[1].sourceUrl}
                          alt={`thumbnail image of ${mark.title}`}
                          width={100 * mark.artworkFields.proportion}
                          height={100}
                      />
                      <div 
                        className="map-pop-multiple-overlay"
                        style={{
                          width: 100 * mark.artworkFields.proportion,
                          height: 100
                        }}
                        onClick={() => {
                          console.log(mark, " clicked")
                        }}
                      >
                        <Enlarge />
                      </div>
                      <p>{mark.title}</p>
                    </div>
                  )
                }
              })}
              {markers.map(mark => {
                if (mark.slug !== history.popupOpen) {
                  return (
                    <div 
                      className="map-pop-multiple-art"
                      key={mark.slug}
                      style={{
                        width: 100 * mark.artworkFields.proportion,
                      }}
                      onClick={() => {
                        console.log(" clicked")
                      }}
                    >
                      <Image
                          src={mark.artworkFields.artworkImage?.mediaDetails.sizes[1].sourceUrl}
                          alt={`thumbnail image of ${mark.title}`}
                          width={100 * mark.artworkFields.proportion}
                          height={100}
                      />
                        <div 
                          className="map-pop-multiple-overlay"
                          style={{
                            width: 100 * mark.artworkFields.proportion,
                            height: 100
                          }}
                          onClick={() => {
                            console.log(mark, " clicked")
                          }}
                        >
                          <Enlarge />
                        </div>
                      <p>{mark.title}</p>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        </Popup>
      )}
    </div>
  )), [multipleMarkers, history.popupOpen, markersIndex]);

   useEffect(() => {
    // if (markersIndex.length === 0 || history.popupOpen.length > 0) {
      setMarkersIndex([])
      setMarkersLeftArray([])
      multipleMarkers.map(() => {
        setMarkersIndex(state => [...state, 0])
        setMarkersLeftArray(state => [...state, 0])
      })
    // }
   }, [multipleMarkers, history.popupOpen])

  // fly to function
  useEffect(() => {
    if (history.currentMapArtwork) {
      if (mapRef.current) {
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
          {/* <FilterTab lng={lng} /> */}
          <MapNav lng={lng} />
      </div>
    )
}

export default Map