import { getAllArtwork } from '@/lib/graphql'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Logo from '@/components/Logo'

export async function generateStaticParams() {
  const res = await fetch("https://digitalcityseries.com/bolter/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: getAllArtwork }),
  })

  const data = await res.json()
  const artworks = data.data.allArtwork.nodes.filter(
    artwork => artwork.artworkFields.series === "a-colorful-history"
  )

  return artworks.map((artwork) => ({
    slug: artwork.slug,
  }))
}

async function getArtworkBySlug(slug) {
  console.log("getArtworkBySlug: ", slug)
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
  console.log("artwork data response:", data)

  if (data.errors) {
    console.error("GraphQL errors:", data.errors)
    return null
  }

  const artwork = data.data.artwork
  console.log("in artwork page: ", artwork)

  if (!artwork) {
    console.error("No artwork found with slug:", slug)
    return null
  }

  return artwork
}

const ArtworkPage = async ({ params: { slug, lng } }) => {
  console.log("artwork page: ", slug)
  const artwork = await getArtworkBySlug(slug)
  console.log("in artwork page: ", artwork)

  if (!artwork) {
    return (
      <div className="artwork-detail-container">
        <Nav lng={lng} />
        <Logo lng={lng} />
        <h1>Artwork not found</h1>
      </div>
    )
  }

  console.log("artwork fields: ", artwork.artworkFields)
  console.log("artwork image: ", artwork.artworkFields.artworkImage)

  let mainImage = null
  if (artwork.artworkFields.artworkImage) {
    // Try to get the largest size from mediaDetails
    if (artwork.artworkFields.artworkImage.mediaDetails?.sizes) {
      const sizes = artwork.artworkFields.artworkImage.mediaDetails.sizes
      // If sizes is an array, find the largest
      if (Array.isArray(sizes)) {
        mainImage = sizes.reduce((largest, current) => 
          (current.width > largest.width) ? current : largest
        , sizes[0])
      } else {
        // If sizes is an object with named sizes, prefer LARGE or fall back to mediaItemUrl
        mainImage = sizes.LARGE || sizes.MEDIUM || {
          sourceUrl: artwork.artworkFields.artworkImage.mediaItemUrl,
          width: artwork.artworkFields.artworkImage.mediaDetails.width,
          height: artwork.artworkFields.artworkImage.mediaDetails.height
        }
      }
    } else {
      // Fallback to mediaItemUrl if no sizes are available
      mainImage = {
        sourceUrl: artwork.artworkFields.artworkImage.mediaItemUrl,
        width: artwork.artworkFields.artworkImage.mediaDetails?.width || 800,
        height: artwork.artworkFields.artworkImage.mediaDetails?.height || 600
      }
    }
  }

  return (
    <div className="artwork-detail-container">
      <Nav lng={lng} />
      <Logo lng={lng} />
      <div className="artwork-detail">
        <div className="artwork-image">
          {mainImage && (
            <Image
              src={mainImage.sourceUrl}
              alt={artwork.title}
              width={mainImage.width}
              height={mainImage.height}
              style={{ objectFit: 'contain' }}
            />
          )}
        </div>
        <div className="artwork-info">
          <h1>{artwork.title}</h1>
          <div className="artwork-metadata">
            <div className="metadata-item">
              <span className="label">Year:</span>
              <span className="value">{artwork.artworkFields.year}</span>
            </div>
            <div className="metadata-item">
              <span className="label">Medium:</span>
              <span className="value">{artwork.artworkFields.medium}</span>
            </div>
            <div className="metadata-item">
              <span className="label">Size:</span>
              <span className="value">{artwork.artworkFields.size}</span>
            </div>
            <div className="metadata-item">
              <span className="label">Location:</span>
              <span className="value">{artwork.artworkFields.city}, {artwork.artworkFields.country}</span>
            </div>
            {artwork.artworkFields.series && (
              <div className="metadata-item">
                <span className="label">Series:</span>
                <span className="value">{artwork.artworkFields.series}</span>
              </div>
            )}
            {artwork.artworkFields.style && (
              <div className="metadata-item">
                <span className="label">Style:</span>
                <span className="value">{artwork.artworkFields.style}</span>
              </div>
            )}
          </div>
          <div 
            className="artwork-description"
            dangerouslySetInnerHTML={{ __html: artwork.content }}
          />
          {artwork.artworkFields.forsale && (
            <div className="artwork-sale">
              <p className="for-sale-badge">Available for Purchase</p>
              {artwork.artworkFields.artworklink && (
                <a 
                  href={artwork.artworkFields.artworklink.url}
                  target={artwork.artworkFields.artworklink.target || '_blank'}
                  rel="noopener noreferrer"
                  className="purchase-link"
                >
                  {artwork.artworkFields.artworklink.title || 'Purchase Artwork'}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArtworkPage 