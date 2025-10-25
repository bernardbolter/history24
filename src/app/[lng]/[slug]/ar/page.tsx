import { notFound } from 'next/navigation'
import { getArtworkBySlug, Artwork, SingleArtworkResponse } from '@/lib/graphql'
import ARView from '@/components/AR/ARView'

interface ArtworkArPageProps {
  params: {
    slug: string
    lng: string
  }
}

async function getArtwork(slug: string): Promise<Artwork | null> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_GRAPHQL_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 
        query: getArtworkBySlug,
        variables: { slug }
      }),
      next: { revalidate: 100 }
    })

    const data = await res.json()
    
    // Check for GraphQL errors
    if (data.errors) {
      console.error('GraphQL Errors:', data.errors)
      return null
    }
    
    // Check if data exists
    if (!data.data || !data.data.artwork) {
      console.error('No artwork found for slug:', slug)
      return null
    }
    
    return data.data.artwork
  } catch (error) {
    console.error('Error fetching artwork:', error)
    return null
  }
}

const ArtworkArPage = async ({ params: { slug, lng } }: ArtworkArPageProps) => {
  const artwork = await getArtwork(slug)

  // Return 404 if artwork doesn't exist
  if (!artwork) {
    notFound()
  }

  // Return 404 if AR is not available for this artwork
  if (!artwork.colorfulFields?.ar) {
    notFound()
  }

  return (
    <div className="artwork-ar-page">
      <ARView artwork={artwork} />
    </div>
  )
}

export default ArtworkArPage;