'use client'

import { cn } from '@/utilities/ui'
import React, { useEffect, useRef, useState } from 'react'

import type { Props as MediaProps } from '../types'

import { getMediaURL } from '@/utilities/getMediaUrl'

export const VideoMedia: React.FC<MediaProps> = (props) => {
  const { onClick, resource, videoClassName } = props
  const [isLoaded, setIsLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoUrl, setVideoUrl] = useState<string>('')

  // Set video URL after mount to ensure client-side URL is available
  useEffect(() => {
    if (resource && typeof resource === 'object') {
      const { filename } = resource
      setVideoUrl(getMediaURL(filename))
    }
  }, [resource])

  // Handle video loading and playing
  useEffect(() => {
    const { current: video } = videoRef
    if (video && videoUrl) {
      const handleLoadedData = () => {
        setIsLoaded(true)
        // Ensure video plays after loading
        video.play().catch((error) => {
          console.warn('Video autoplay failed:', error)
        })
      }

      video.addEventListener('loadeddata', handleLoadedData)

      // Check if video is already loaded
      if (video.readyState >= 2) {
        setIsLoaded(true)
        video.play().catch((error) => {
          console.warn('Video autoplay failed:', error)
        })
      }

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData)
      }
    }
  }, [videoUrl])

  if (!resource || typeof resource !== 'object' || !videoUrl) {
    return null
  }

  return (
    <video
      autoPlay
      className={cn(
        'opacity-0 transition-opacity duration-1000',
        isLoaded && 'opacity-100',
        videoClassName,
      )}
      controls={false}
      preload="auto"
      loop
      muted
      onClick={onClick}
      playsInline
      ref={videoRef}
    >
      <source src={videoUrl} />
    </video>
  )
}
