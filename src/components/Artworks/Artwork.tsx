"use client"

import { useContext, useEffect, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { HistoryContext } from '@/providers/HistoryProvider'
import { returnToMap, resetAnimationState, triggerReturnAnimation } from '@/helpers/animation'
import Image from 'next/image'
import { Artwork as ArtworkType } from '@/lib/graphql'

interface ArtworkProps {
  artwork: ArtworkType
  lng: string
}

const Artwork = ({ artwork, lng }: ArtworkProps) => {
  const [history, setHistory] = useContext(HistoryContext)
  const router = useRouter()
  console.log('artwork: ', artwork)

  // Debug: Log the animation state
  console.log('Artwork component - animation state:', history.animation)

  useEffect(() => {
    // Only reset the animation if we're not doing a reverse animation
    if (!history.animation.isReversing) {
      setHistory((state: any) => ({
        ...state,
        animation: {
          ...state.animation,
          isAnimating: false,
          sourceRect: null,
          artwork: null
          // Keep cameFromMap and savedMapState for the return button
        }
      }))
    }
  }, [setHistory, history.animation.isReversing])

  const handleReturnToMap = () => {
    console.log('Return to map clicked - animation state:', history.animation)
    if (history.animation.cameFromMap && history.animation.savedMapState) {
      console.log('Triggering reverse animation with saved state:', history.animation.savedMapState)
      // Trigger reverse animation
      triggerReturnAnimation(setHistory, artwork, history.animation.savedMapState)
      
      // Also start a timer to navigate after animation completes
      setTimeout(() => {
        console.log('Animation should be done, navigating to map')
        returnToMap(setHistory, history.animation.savedMapState)
        router.push(`/${lng}`)
      }, 1000)
    } else {
      console.log('No saved map state, going to main page directly')
      router.push(`/${lng}`)
    }
  }

  const theStory = useMemo(() => {
    if (lng === 'de') {
      if (artwork.colorfulfields?.storyde) {
        return {
          __html: artwork.colorfulfields.storyde
        }
      } else {
        return artwork.content || '';
      }
    } else {
      if (artwork.colorfulfields?.storyen) {
        return {
          __html: artwork.colorfulfields.storyen
        }
      } else {
        return artwork.content || '';
      }
    }
  }, [artwork, lng])

  // Process the artwork image
  let mainImage = null
  if (artwork.artworkFields.artworkImage) {
    if (artwork.artworkFields.artworkImage.mediaDetails?.sizes) {
      const sizes = artwork.artworkFields.artworkImage.mediaDetails.sizes
      if (Array.isArray(sizes)) {
        mainImage = sizes.reduce((largest, current) => 
          (current.width > largest.width) ? current : largest
        , sizes[0])
      } else {
        // Handle sizes as an object with named properties
        const sizesObj = sizes as any
        mainImage = sizesObj.LARGE || sizesObj.MEDIUM || {
          sourceUrl: artwork.artworkFields.artworkImage.mediaItemUrl,
          width: artwork.artworkFields.artworkImage.mediaDetails.width,
          height: artwork.artworkFields.artworkImage.mediaDetails.height
        }
      }
    } else {
      mainImage = {
        sourceUrl: artwork.artworkFields.artworkImage.mediaItemUrl,
        width: artwork.artworkFields.artworkImage.mediaDetails?.width || 800,
        height: artwork.artworkFields.artworkImage.mediaDetails?.height || 600
      }
    }
  }

  return (
    <div className="artwork-single-container">
      {/* Return Button */}
      {/* <button 
        onClick={handleReturnToMap} 
        className="return-to-map-button"
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1000,
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '25px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.3s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#0056b3'
          e.currentTarget.style.transform = 'translateY(-2px)'
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#007bff'
          e.currentTarget.style.transform = 'translateY(0)'
        }}
      >
        {history.animation.cameFromMap && history.animation.savedMapState 
          ? '← Return to Map' 
          : '← Back to Map'
        }
      </button> */}
      
        <div className="artwork-image">
          {mainImage && (
            <Image
              src={mainImage.sourceUrl}
              alt={artwork.title}
              width={mainImage.width}
              height={mainImage.height}
            />
          )}
        </div>
        
        <div className="artwork-info">
          <div className="artowrk-title">
            <h1>{artwork.title}</h1>
            <h5>{artwork.artworkFields.width} x {artwork.artworkFields.height}</h5>
            <h5>{artwork.artworkFields.medium}</h5>
            <h5>{artwork.artworkFields.year}</h5>
          </div>
          <div className="artwork-story">
            {typeof theStory === 'string' ? theStory : (
              <div dangerouslySetInnerHTML={theStory} />
            )}
          </div>
          <div className="artwork-links">
            {artwork.colorfulfields?.ar && (
              <div 
                className="artowrk-ar"
                onClick={() => {
                  console.log('Opening AR for artwork:', artwork.slug);
                }}
              >
                <h1>AR</h1>
              </div>
            )}
          </div>     
        </div>
      </div>
  )
}

export default Artwork