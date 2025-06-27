"use client"

import { useContext, useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { HistoryContext } from '@/providers/HistoryProvider'
import Image from 'next/image'

const ArtworkAnimation = ({ lng }: { lng: string }) => {
  const [history, setHistory] = useContext(HistoryContext)
  const router = useRouter()
  const [animationPhase, setAnimationPhase] = useState<'scaling' | 'fading' | 'complete' | 'reversing' | 'return-complete'>('scaling')
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!history.animation.isAnimating || !history.animation.artwork || !history.animation.sourceRect) {
      return
    }

    console.log('Animation started for:', history.animation.artwork.title)
    console.log('Animation state:', history.animation)

    if (history.animation.isReversing) {
      // Reverse animation: start from center and go back to popup
      console.log('Starting reverse animation')
      setAnimationPhase('fading') // Start from faded state (center position)
      
      // First fade out the background
      const fadeOutTimer = setTimeout(() => {
        setAnimationPhase('reversing') // Then animate back to popup position
      }, 200)
      
      const reverseTimer = setTimeout(() => {
        console.log('Reverse animation completed')
        setAnimationPhase('return-complete')
        // Navigation is now handled by the Artwork component
      }, 800) // Reverse animation duration

      return () => {
        clearTimeout(fadeOutTimer)
        clearTimeout(reverseTimer)
      }
    } else {
      // Forward animation: scale up and navigate to artwork
      setAnimationPhase('scaling')
      
      const scaleTimer = setTimeout(() => {
        console.log('Setting animation phase to fading')
        setAnimationPhase('fading')
      }, 600) // Scale animation duration

      const fadeTimer = setTimeout(() => {
        console.log('Setting animation phase to complete and navigating')
        setAnimationPhase('complete')
        router.push(`/${lng}/${history.animation.artwork.slug}`)
      }, 1000) // Total animation duration

      return () => {
        clearTimeout(scaleTimer)
        clearTimeout(fadeTimer)
      }
    }
  }, [history.animation.isAnimating, history.animation.artwork, history.animation.sourceRect, history.animation.isReversing, router, lng, setHistory])

  console.log('ArtworkAnimation render check:', {
    isAnimating: history.animation.isAnimating,
    hasArtwork: !!history.animation.artwork,
    hasSourceRect: !!history.animation.sourceRect,
    isReversing: history.animation.isReversing
  })

  if (!history.animation.isAnimating || !history.animation.artwork || !history.animation.sourceRect) {
    console.log('Animation component not rendering - missing required data')
    return null
  }

  const { artwork, sourceRect } = history.animation
  const imageUrl = artwork.artworkFields.artworkImage?.mediaDetails.sizes[1].sourceUrl

  // Calculate the center position for the scaled image - 75% viewport height
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800
  
  // Calculate size based on 75% viewport height, but also limit width to 90% viewport width
  let targetHeight = viewportHeight * 0.75
  let targetWidth = targetHeight * artwork.artworkFields.proportion
  
  // If the calculated width is too wide, scale down based on width instead
  if (targetWidth > viewportWidth * 0.9) {
    targetWidth = viewportWidth * 0.9
    targetHeight = targetWidth / artwork.artworkFields.proportion
  }
  
  const centerX = (viewportWidth - targetWidth) / 2
  const centerY = (viewportHeight - targetHeight) / 2

  return (
    <div 
      className="artwork-animation-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 10000,
        pointerEvents: 'none',
        background: (animationPhase === 'fading' && !history.animation.isReversing) ? 'rgba(255, 255, 255, 0.85)' : 'transparent',
        transition: 'background 0.4s ease-out'
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: (animationPhase === 'scaling' || animationPhase === 'reversing' || animationPhase === 'return-complete') ? sourceRect.top : centerY,
          left: (animationPhase === 'scaling' || animationPhase === 'reversing' || animationPhase === 'return-complete') ? sourceRect.left : centerX, 
          width: (animationPhase === 'scaling' || animationPhase === 'reversing' || animationPhase === 'return-complete') ? sourceRect.width : targetWidth,
          height: (animationPhase === 'scaling' || animationPhase === 'reversing' || animationPhase === 'return-complete') ? sourceRect.height : targetHeight,
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          borderRadius: (animationPhase === 'scaling' || animationPhase === 'reversing' || animationPhase === 'return-complete') ? '0px' : '8px',
          boxShadow: (animationPhase === 'fading' && !history.animation.isReversing) ? '0 20px 40px rgba(0, 0, 0, 0.2)' : 'none',
          overflow: 'hidden'
        }}
      >
        <Image
          ref={imageRef}
          src={imageUrl || ''}
          alt={artwork.title}
          fill
          style={{
            objectFit: 'cover'
          }}
        />
      </div>
      
      {/* Loading indicator */}
      {(animationPhase === 'fading' && !history.animation.isReversing) && (
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#666',
            fontSize: '14px',
            fontWeight: '500',
            opacity: 0.8
          }}
        >
          Loading artwork...
        </div>
      )}
      {animationPhase === 'reversing' && (
        <div
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: '#666',
            fontSize: '14px',
            fontWeight: '500',
            opacity: 0.8
          }}
        >
          Returning to map...
        </div>
      )}
    </div>
  )
}

export default ArtworkAnimation