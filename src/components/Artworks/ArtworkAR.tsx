"use client"

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Artwork as ArtworkType } from '@/lib/graphql'

interface ArtworkARProps {
  artwork: ArtworkType
  lng: string
}

const ArtworkAR = ({ artwork, lng }: ArtworkARProps) => {
  const router = useRouter()
  const [isARActive, setIsARActive] = useState(false)

  const handleBackToArtwork = () => {
    router.push(`/${lng}/${artwork.slug}`)
  }

  const handleStartAR = () => {
    setIsARActive(true)
    // Here you would integrate with your AR library/framework
    console.log('Starting AR experience for:', artwork.slug)
  }

  const handleStopAR = () => {
    setIsARActive(false)
    console.log('Stopping AR experience')
  }

  const theStory = useMemo(() => {
    if (lng === 'de') {
      if (artwork.colorfulFields?.storyDe) {
        return {
          __html: artwork.colorfulFields.storyDe
        }
      } else {
        return artwork.content || '';
      }
    } else {
      if (artwork.colorfulFields?.storyEn) {
        return {
          __html: artwork.colorfulFields.storyEn
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
    <div className="artwork-ar-container">
      {/* Navigation */}
      <div className="ar-navigation">
        <button 
          onClick={handleBackToArtwork}
          className="back-to-artwork-button"
        >
          ← Back to Artwork
        </button>
      </div>

      {/* AR Content */}
      <div className="ar-content">
        {!isARActive ? (
          // AR Preview/Setup
          <div className="ar-preview">
            <div className="ar-artwork-info">
              <h1>{artwork.title}</h1>
              <div className="artwork-details">
                <p>{artwork.artworkFields.width} x {artwork.artworkFields.height}</p>
                <p>{artwork.artworkFields.medium}</p>
                <p>{artwork.artworkFields.year}</p>
              </div>
            </div>

            {mainImage && (
              <div className="ar-artwork-image">
                <Image
                  src={mainImage.sourceUrl}
                  alt={artwork.title}
                  width={mainImage.width}
                  height={mainImage.height}
                />
              </div>
            )}

            <div className="ar-instructions">
              <h2>AR Experience</h2>
              <p>
                {lng === 'de' 
                  ? 'Erleben Sie dieses Kunstwerk in Augmented Reality. Positionieren Sie Ihr Gerät und tippen Sie auf "AR starten".'
                  : 'Experience this artwork in Augmented Reality. Position your device and tap "Start AR".'
                }
              </p>
              
              <button 
                onClick={handleStartAR}
                className="start-ar-button"
              >
                {lng === 'de' ? 'AR starten' : 'Start AR'}
              </button>
            </div>

            {/* Story Section */}
            <div className="ar-story">
              <h3>{lng === 'de' ? 'Geschichte' : 'Story'}</h3>
              {typeof theStory === 'string' ? (
                <p>{theStory}</p>
              ) : (
                <div dangerouslySetInnerHTML={theStory} />
              )}
            </div>
          </div>
        ) : (
          // Active AR Experience
          <div className="ar-experience">
            <div className="ar-controls">
              <button 
                onClick={handleStopAR}
                className="stop-ar-button"
              >
                {lng === 'de' ? 'AR beenden' : 'Stop AR'}
              </button>
            </div>
            
            {/* AR Viewer Container */}
            <div className="ar-viewer" id="ar-viewer">
              {/* This is where you would integrate your AR library */}
              <div className="ar-placeholder">
                <p>AR Experience will be loaded here</p>
                <p>Artwork: {artwork.title}</p>
                {artwork.colorfulFields?.ar && (
                  <p>AR Data: {artwork.colorfulFields.ar}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ArtworkAR