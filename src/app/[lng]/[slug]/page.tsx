import { getAllArtwork } from '@/lib/graphql'
import Artwork from '@/components/Artworks/Artwork'
import Nav from '@/components/Navigation/Nav'
import Logo from '@/components/Navigation/Logo'

interface ArtworkPageProps {
  params: {
    slug: string
    lng: string
  }
}

export async function generateStaticParams() {
  const res = await fetch("https://digitalcityseries.com/bolter/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: getAllArtwork }),
  })

  const data = await res.json()
  
  // Debug logging
  console.log('GraphQL Response (generateStaticParams):', data)
  
  // Check for GraphQL errors
  if (data.errors) {
    console.error('GraphQL Errors:', data.errors)
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`)
  }
  
  // Check if data exists
  if (!data.data) {
    console.error('No data field in response:', data)
    throw new Error('No data field in GraphQL response')
  }
  
  // Check if allArtwork exists
  if (!data.data.allArtwork) {
    console.error('No allArtwork field in response:', data.data)
    throw new Error('No allArtwork field in GraphQL response')
  }
  
  const artworks = data.data.allArtwork.nodes.filter(
    (artwork: any) => artwork.artworkFields.series === "a-colorful-history"
  )

  const params: { slug: string; lng: string }[] = []
  artworks.forEach((artwork: any) => {
    params.push({ slug: artwork.slug, lng: 'en' })
    params.push({ slug: artwork.slug, lng: 'de' })
  })

  return params
}

async function getArtworkBySlug(slug: string) {
  const res = await fetch("https://digitalcityseries.com/bolter/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ 
      query: `
        query GetArtworkBySlug($slug: ID!) {
          artwork(id: $slug, idType: URI) {
            slug
            artworkFields {
              city
              artworklink {
                url
                title
              }
              artworkImage {
                mediaDetails {
                  sizes(include: [MEDIUM, LARGE, THUMBNAIL]) {
                    sourceUrl
                    height
                    width
                  }
                  width
                  height
                }
                mediaItemUrl
              }
              country
              forsale
              height
              lat
              lng
              medium
              metadescription
              metakeywords
              orientation
              proportion
              series
              size
              style
              width
              year
            }
            colorfulFields {
              ar
              storyDe
              storyEn
              wikiLinkDe
              wikiLinkEn
            }
            title(format: RENDERED)
            content(format: RENDERED)
            databaseId
            id
            date
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      `,
      variables: { slug }
    }),
    next: { revalidate: 60 }
  })

  if (!res.ok) {
    console.error("Failed to fetch artwork:", res.statusText)
    return null
  }

  const data = await res.json()

  if (data.errors) {
    console.error("GraphQL errors:", data.errors)
    return null
  }

  return data.data.artwork
}

const ArtworkPage = async ({ params: { slug, lng } }: ArtworkPageProps) => {
  const artwork = await getArtworkBySlug(slug)

  if (!artwork) {
    return (
      <div className="artwork-detail-container">
        <h1>Artwork not found</h1>
        <p>The artwork with slug "{slug}" could not be found.</p>
      </div>
    )
  }

  return (
    <div className="artwork-container">
        <Logo lng={lng} />
        <Nav lng={lng} />
        <Artwork artwork={artwork} lng={lng} />
    </div>
  )
}

export default ArtworkPage